import { Project, Vehicle, Grid, Component, Node, Edge, Plate, Link, validateProject } from '../editor/model.js';
import { CELL_SIZE_WORLD } from '../editor/grid.js';
import { validateNativeProperties } from '../editor/component-properties.js';
import { reflectNativePoint, reflectNativeRotation } from './coordinates.js';
import { nearestNativePaintIndex } from '../editor/native-paint.js';
import { logicNodePort, orientMechanicalLink } from '../editor/connection-ports.js';
import { nativeMechanicalPortRole } from '../editor/connection-port-colors.js';
import { detectMechanicalConnections, mechanicalMateRule, mechanicalMateError, NATIVE_MECHANICAL_MATE_RULES } from '../editor/mechanical-connections.js';
import { partitionMechanicalBodies } from '../editor/mechanical-bodies.js';
import { orientHydraulicLink, hydraulicError } from '../editor/hydraulic-connections.js';
import { HYDRAULIC_PROFILES } from '../editor/hydraulic-profiles.js';
import { validateLinks } from '../editor/connections.js';
import { nativeSurfaceMount } from '../editor/surface-mount.js';
import { isTrackLink } from '../editor/track-profiles.js';

const vector = value => ({ x: Number(value?.[0] ?? 0), y: Number(value?.[1] ?? 0), z: Number(value?.[2] ?? 0) });
const matrix = value => Array.isArray(value) && value.length === 9 && value.every(number => Number.isFinite(number)) ? [...value] : null;
const finiteArray = (value, length) => Array.isArray(value) && value.length === length && value.every(number => Number.isFinite(number));

function matrixToEulerXYZ(value) {
  if (!value) return { x: 0, y: 0, z: 0 };
  // Native rotation arrays are stored column-major. Three.js' Euler
  // extraction below reads row-major entries, so transpose before extracting.
  // In particular this puts the wheel hub's local tyre offset on the outside
  // of the vehicle instead of folding it into the chassis.
  value = [value[0], value[3], value[6], value[1], value[4], value[7], value[2], value[5], value[8]];
  const clamp = number => Math.max(-1, Math.min(1, number));
  const y = Math.asin(clamp(value[2]));
  if (Math.abs(value[2]) < 0.9999999) return { x: Math.atan2(-value[5], value[8]), y, z: Math.atan2(-value[1], value[0]) };
  return { x: Math.atan2(value[7], value[4]), y, z: 0 };
}

function nativeTransform(value) {
  const m = matrix(value?.m);
  const t = finiteArray(value?.t, 3) ? vector(value.t) : vector();
  if (value?.m !== undefined && !m) throw new Error('Native vehicle transform matrix must contain nine finite numbers');
  return { position: t, rotationMatrix: m || undefined };
}

function nativeComponent(value, definitions, gridId) {
  if (!value || !Number.isInteger(value.id)) throw new Error('Native component ID must be an integer');
  const type = definitions[value.def] || `native-definition-${value.def}`;
  const rotationMatrix = matrix(value.rot);
  const component = new Component({ id: String(value.id), type, gridId, position: vector(value.pos), rotation: matrixToEulerXYZ(rotationMatrix), scale: { x: 1, y: 1, z: 1 } });
  component.extras.native = {
    definitionIndex: value.def,
    rotationMatrix,
    colors: Array.isArray(value.colors) ? [...value.colors] : undefined,
    state: Object.fromEntries(Object.entries(value).filter(([key]) => !['id', 'def', 'pos', 'rot', 'colors'].includes(key))),
  };
  if (value.rot !== undefined && !component.extras.native.rotationMatrix) throw new Error(`Invalid native rotation matrix for component ${value.id}`);
  return component;
}

export function parseNativeData(input) {
  const value = typeof input === 'string' ? JSON.parse(input) : input;
  if (!value || !value.vehicles || !Array.isArray(value.vehicles.vehicles)) throw new Error('Native data has no vehicles.vehicles array');
  const definitions = Array.isArray(value.definitions?.components) ? value.definitions.components : [];
  const vehicles = value.vehicles.vehicles.map(vehicleValue => {
    const vehicle = new Vehicle({ id: String(vehicleValue.id), transform: nativeTransform(vehicleValue.transform) });
    vehicle.extras.native = { rawVehicle: structuredClone(vehicleValue) };
    const nativeGrids = Array.isArray(vehicleValue.grids) ? vehicleValue.grids : [];
    vehicle.grids = nativeGrids.map((nativeGrid, gridIndex) => {
      const gridId = `grid-${vehicle.id}-${gridIndex + 1}`;
      const direction = nativeGrid.dir === undefined ? [0, 1, 0] : nativeGrid.dir;
      if (!finiteArray(direction, 3) || !direction.every(Number.isInteger) || direction.every(value => value === 0)) throw new Error(`Invalid native grid direction for ${gridId}`);
      const grid = new Grid({ id: gridId, origin: vector(nativeGrid.origin), dir: vector(direction) });
      grid.components = (nativeGrid.components || []).map(component => nativeComponent(component, definitions, gridId));
      // The native sample stores nodes, edges, plates and links at vehicle
      // level while components are grouped under grids. Keep those global
      // structures on the first grid to avoid duplicating topology merely
      // because a vehicle has multiple component grids.
      grid.nodes = gridIndex === 0 ? (vehicleValue.nodes || []).map(node => new Node({ id: String(node.id), position: vector(node.pos), extras: { native: structuredClone(node) } })) : [];
      grid.edges = gridIndex === 0 ? (vehicleValue.edges || []).map((edge, index) => new Edge({ id: `${gridId}-edge-${index + 1}`, a: String(edge.n0), b: String(edge.n1), extras: { native: structuredClone(edge) } })) : [];
      grid.plates = gridIndex === 0 ? (vehicleValue.plates || []).map(plate => new Plate({ id: String(plate.id), nodeIds: (plate.nodes || []).map(String), extras: { native: structuredClone(plate) } })) : [];
      const categories = ['electric', 'mechanical', 'liquid', 'gas', 'belt', 'data'];
      grid.links = gridIndex === 0 ? categories.flatMap(kind => (vehicleValue[`${kind}_links`] || []).map((link, index) => new Link({
        id: `${gridId}-${kind}-link-${index + 1}`,
        kind,
        from: structuredClone(link.p0 || {}),
        to: structuredClone(link.p1 || {}),
        points: structuredClone(link.points || []),
        extras: { native: structuredClone(link) },
      }))) : [];
      grid.extras.native = { index: gridIndex, raw: structuredClone(nativeGrid) };
      return grid;
    });
    return vehicle;
  });
  const model = new Project({ vehicles, extras: { native: { definitions: [...definitions], raw: structuredClone(value) } } });
  validateProject(model);
  return model;
}

export function parseNativePair(dataInput, metaInput) {
  const meta = typeof metaInput === 'string' ? JSON.parse(metaInput) : metaInput;
  if (!meta || typeof meta !== 'object' || Array.isArray(meta)) throw new Error('Native .meta must be a JSON object');
  const model = parseNativeData(dataInput);
  model.extras.native.meta = structuredClone(meta);
  return model;
}

export function nativeStats(model) {
  validateProject(model);
  return model.vehicles.map(vehicle => ({
    id: vehicle.id,
    grids: vehicle.grids.length,
    nodes: vehicle.grids.reduce((count, grid) => count + grid.nodes.length, 0),
    edges: vehicle.grids.reduce((count, grid) => count + grid.edges.length, 0),
    plates: vehicle.grids.reduce((count, grid) => count + grid.plates.length, 0),
    components: vehicle.grids.reduce((count, grid) => count + grid.components.length, 0),
    links: vehicle.grids.reduce((count, grid) => count + grid.links.length, 0),
  }));
}

export function toNativeData(model, { strict = true } = {}) {
  validateProject(model);
  const raw = model.extras?.native?.raw;
  if (!raw) throw new Error('Domain model has no native source document');
  const value = structuredClone(raw);
  const diagnostics = [];
  for (const vehicle of model.vehicles) {
    const nativeVehicle = value.vehicles.vehicles.find(candidate => String(candidate.id) === vehicle.id);
    if (!nativeVehicle) { diagnostics.push(`Missing native vehicle ${vehicle.id}`); continue; }
    for (const grid of vehicle.grids) {
      const gridIndex = grid.extras?.native?.index;
      const nativeGrid = Number.isInteger(gridIndex) ? nativeVehicle.grids?.[gridIndex] : null;
      if (!nativeGrid) { diagnostics.push(`Missing native grid ${grid.id}`); continue; }
      for (const component of grid.components) {
        const nativeComponent = (nativeGrid.components || []).find(candidate => String(candidate.id) === component.id);
        if (!nativeComponent) { diagnostics.push(`New or unmapped native component ${component.id}`); continue; }
        nativeComponent.pos = [component.transform.position.x, component.transform.position.y, component.transform.position.z];
        const nativeRotation = component.extras?.native?.rotationMatrix;
        if (nativeRotation) nativeComponent.rot = [...nativeRotation];
      }
      for (const node of grid.nodes) {
        const nativeNode = (nativeVehicle.nodes || []).find(candidate => String(candidate.id) === node.id);
        if (nativeNode) nativeNode.pos = [node.position.x, node.position.y, node.position.z];
      }
    }
  }
  if (strict && diagnostics.length) throw new Error('Native export blocked:\n' + diagnostics.join('\n'));
  return { value, diagnostics };
}

// Compare JSON-like native values without serialising them. This keeps a
// round-trip audit independent of key formatting and points to the precise
// value that changed.
export function diffNativeValues(expected, actual, path = '$', differences = [], limit = 100) {
  if (differences.length >= limit) return differences;
  if (Object.is(expected, actual)) return differences;
  const expectedArray = Array.isArray(expected);
  const actualArray = Array.isArray(actual);
  if (expectedArray || actualArray) {
    if (!expectedArray || !actualArray || expected.length !== actual.length) {
      differences.push({ path, expected, actual });
      return differences;
    }
    for (let index = 0; index < expected.length && differences.length < limit; index++) diffNativeValues(expected[index], actual[index], `${path}[${index}]`, differences, limit);
    return differences;
  }
  const expectedObject = expected && typeof expected === 'object';
  const actualObject = actual && typeof actual === 'object';
  if (!expectedObject || !actualObject) {
    differences.push({ path, expected, actual });
    return differences;
  }
  const keys = [...new Set([...Object.keys(expected), ...Object.keys(actual)])].sort();
  for (const key of keys) {
    if (!Object.hasOwn(expected, key) || !Object.hasOwn(actual, key)) differences.push({ path: `${path}.${key}`, expected: expected[key], actual: actual[key] });
    else diffNativeValues(expected[key], actual[key], `${path}.${key}`, differences, limit);
    if (differences.length >= limit) break;
  }
  return differences;
}

// A paired, untouched native import can be emitted byte-for-value-equivalent
// at the JSON-value level. This is deliberately separate from editable game
// export: the current editor projection cannot yet prove every native edit.
export function toNativePair(model) {
  validateProject(model);
  const data = model.extras?.native?.raw;
  const meta = model.extras?.native?.meta;
  if (!data || !meta) throw new Error('Domain model has no paired native source files');
  return { data: structuredClone(data), meta: structuredClone(meta) };
}

export function verifyNativePairRoundTrip(dataInput, metaInput) {
  const data = typeof dataInput === 'string' ? JSON.parse(dataInput) : dataInput;
  const meta = typeof metaInput === 'string' ? JSON.parse(metaInput) : metaInput;
  const output = toNativePair(parseNativePair(data, meta));
  return {
    data: diffNativeValues(data, output.data),
    meta: diffNativeValues(meta, output.meta),
  };
}

const nativeAxes = ['x', 'y', 'z'];
const nativeIdentity = [1, 0, 0, 0, 1, 0, 0, 0, 1];

function nativeCells(position) {
  if (!position || nativeAxes.some(axis => !Number.isFinite(position[axis]))) throw new Error('Native export requires finite positions');
  position = reflectNativePoint(position);
  return nativeAxes.map(axis => {
    const value = position[axis] / CELL_SIZE_WORLD;
    return Math.abs(value - Math.round(value)) <= 1e-8 ? Math.round(value) : value;
  });
}

function nativeRotation(rotation) {
  if (!rotation || nativeAxes.some(axis => !Number.isFinite(rotation[axis]))) return [...nativeIdentity];
  const cx = Math.cos(rotation.x); const sx = Math.sin(rotation.x);
  const cy = Math.cos(rotation.y); const sy = Math.sin(rotation.y);
  const cz = Math.cos(rotation.z); const sz = Math.sin(rotation.z);
  // `matrixToEulerXYZ` reads a row-major XYZ matrix after transposing the
  // native value. Build that same matrix here, then transpose it back to the
  // native column-major layout. The previous formula mixed the row/column
  // terms (it was effectively a different Euler order), which made any
  // combined rotation come back with a different heading and could make a
  // vehicle appear mirrored after it was saved and loaded by the game.
  const rowMajor = reflectNativeRotation([
    cy * cz, -cy * sz, sy,
    sx * sy * cz + cx * sz, cx * cz - sx * sy * sz, -sx * cy,
    sx * sz - cx * sy * cz, sx * cz + cx * sy * sz, cx * cy,
  ]);
  return [rowMajor[0], rowMajor[3], rowMajor[6], rowMajor[1], rowMajor[4], rowMajor[7], rowMajor[2], rowMajor[5], rowMajor[8]];
}

function nativeColor(value) {
  return Number.isInteger(value) && value >= 0 && value <= 255 ? value : undefined;
}

function nativePaintIndex(color, existing, label) {
  if (color === undefined) return nativeColor(existing);
  const index = nearestNativePaintIndex(color);
  if (index === null) throw new Error(`Native export ${label} must be a Hex RGB color`);
  return index;
}

function nativeBounds(points) {
  const values = points.length ? points : [[0, 0, 0]];
  return {
    min: nativeAxes.map((_, index) => Math.min(...values.map(value => value[index]))),
    max: nativeAxes.map((_, index) => Math.max(...values.map(value => value[index]))),
  };
}

function nativePlateNodeOrderForExport(plate, nativePoints, edgeNodeIds) {
  const order = [...plate.nodeIds].reverse();
  const direction = plate.surfaceDirection;
  if (direction && nativeAxes.every(axis => Number.isFinite(direction[axis]))) {
    const desired = [-direction.x, direction.y, direction.z];
    const normal = nativePlateNormal(order.map(id => nativePoints.get(id)));
    if (normal && normal[0] * desired[0] + normal[1] * desired[1] + normal[2] * desired[2] < 0) order.reverse();
  }
  // A panel boundary in the game is a loop of structural edges. Older editor
  // snapshots can retain a standalone node in that loop; remove it only when
  // it is exactly collinear and lies between its two neighbouring boundary
  // points. Other isolated nodes are left intact because their semantics is
  // ambiguous in older native samples.
  let changed = true;
  while (changed) {
    changed = false;
    for (let index = 0; index < order.length; index++) {
      const id = order[index];
      if (edgeNodeIds.has(id)) continue;
      if (order.length <= 3) continue;
      const previous = nativePoints.get(order[(index - 1 + order.length) % order.length]);
      const current = nativePoints.get(id);
      const next = nativePoints.get(order[(index + 1) % order.length]);
      if (!previous || !current || !next) continue;
      const first = nativeAxes.map((_, axis) => current[axis] - previous[axis]);
      const second = nativeAxes.map((_, axis) => next[axis] - current[axis]);
      const cross = [
        first[1] * second[2] - first[2] * second[1],
        first[2] * second[0] - first[0] * second[2],
        first[0] * second[1] - first[1] * second[0],
      ];
      const collinear = cross.every(value => Math.abs(value) <= 1e-9);
      const between = nativeAxes.every((_, axis) => {
        const min = Math.min(previous[axis], next[axis]);
        const max = Math.max(previous[axis], next[axis]);
        return current[axis] >= min - 1e-9 && current[axis] <= max + 1e-9;
      });
      if (!collinear || !between) continue;
      order.splice(index, 1);
      changed = true;
      break;
    }
  }
  if (order.length < 3) throw new Error(`Native export plate ${plate.id} has fewer than three boundary nodes`);
  return order;
}

function mechanicalPortRole(component, port, componentDefinitions) {
  const definition = componentDefinitions.get(component?.type);
  if (!definition || !Number.isInteger(port) || port < 0) return null;
  return nativeMechanicalPortRole(logicNodePort(definition, port), definition);
}

// Native mechanical data is directional: p0 is the control/output side and
// p1 is the mechanical input side. Older editor snapshots could connect two
// inputs or point at a component's default input port. Repair a unique output
// port when the definition makes it unambiguous; otherwise omit the link so
// the game never dereferences a null mechanical endpoint during load.
function normalizeMechanicalExportLink(link, objectsById, componentDefinitions) {
  let from = { ...link.from };
  let to = { ...link.to };
  const port = endpoint => Number.isInteger(endpoint?.port) ? endpoint.port : 0;
  const component = endpoint => objectsById.get(endpoint?.componentId);
  let fromRole = mechanicalPortRole(component(from), port(from), componentDefinitions);
  let toRole = mechanicalPortRole(component(to), port(to), componentDefinitions);
  const findPort = (endpoint, expected) => {
    const definition = componentDefinitions.get(component(endpoint)?.type);
    const candidates = (definition?.logic_nodes || []).map((node, index) => ({ node, index }))
      .filter(candidate => nativeMechanicalPortRole(candidate.node, definition) === expected)
      .map(candidate => candidate.index);
    return candidates.length === 1 ? candidates[0] : null;
  };
  if (fromRole === 'input' && toRole === 'output') {
    [from, to] = [to, from];
    [fromRole, toRole] = [toRole, fromRole];
  }
  if (fromRole === 'input') {
    const replacement = findPort(from, 'output');
    if (replacement === null) return null;
    from = { ...from, port: replacement };
    fromRole = 'output';
  }
  if (toRole === 'output') {
    const replacement = findPort(to, 'input');
    if (replacement === null) return null;
    to = { ...to, port: replacement };
  }
  return { ...link, from, to };
}

// The game derives a plate normal from the first non-collinear edge cross
// product in the saved node order (vehicle_plate_util.calculate_plate_dir /
// calculate_plate_normal). Keep the same sign when choosing an export order.
function nativePlateNormal(points) {
  if (!Array.isArray(points) || points.length < 3) return null;
  // Match the game's calculate_plate_dir scan: try every pair anchored at
  // the first node until a non-collinear pair produces a usable direction.
  for (let firstIndex = 1; firstIndex < points.length - 1; firstIndex++) {
    const first = points[firstIndex].map((value, axis) => value - points[0][axis]);
    for (let secondIndex = firstIndex + 1; secondIndex < points.length; secondIndex++) {
      const next = points[secondIndex].map((value, axis) => value - points[0][axis]);
      const normal = [
        first[1] * next[2] - first[2] * next[1],
        first[2] * next[0] - first[0] * next[2],
        first[0] * next[1] - first[1] * next[0],
      ];
      const magnitude = Math.hypot(...normal);
      if (magnitude > 1e-9) return normal.map(value => value / magnitude);
    }
  }
  return null;
}

// Build a complete observed-native-schema pair from an editor snapshot. This
// deliberately has no dependency on a previously imported .data/.meta pair:
// saving a new vehicle must not require users to supply a template first.
export function toNativePairFromEditor(document, { vehicleId = 1, componentDefinitions = new Map() } = {}) {
  if (!document || !Array.isArray(document.objects) || !Number.isInteger(vehicleId)) throw new Error('Native export requires a valid editor project');
  const topology = document.topology || { nodes: [], edges: [], plates: [], links: [] };
  const hostObjects = document.objects;
  const objectsById = new Map(hostObjects.map(object => [object.id, object]));
  const hydraulicLinks = validateLinks((topology.links || []).filter(link => link.kind === 'hydraulic'), new Set(objectsById.keys())).map(link => orientHydraulicLink(link, objectsById, componentDefinitions));
  const { connections, diagnostics } = detectMechanicalConnections(hostObjects, componentDefinitions);
  if (diagnostics.length) throw mechanicalMateError(diagnostics[0].code, 'Cannot export physical mates (' + diagnostics[0].code + ')', diagnostics[0].components.join(' / '));
  const physicalConnections = [...connections, ...hydraulicLinks.map(link => ({ from: link.from.componentId, to: link.to.componentId }))];
  const partition = physicalConnections.length ? partitionMechanicalBodies(document, physicalConnections, componentDefinitions) : null;
  const bodyId = id => vehicleId + (partition?.componentBody.get(id) ?? 0);
  const definitions = [...new Set(hostObjects.map(object => object.type))];
  const definitionIndex = new Map(definitions.map((id, index) => [id, index]));
  const componentIds = new Map(hostObjects.map((object, index) => [object.id, index + 1]));
  const nativeTopologyPoints = new Map((topology.nodes || []).map(node => [node.id, nativeCells(node.position)]));
  const edgeNodeIds = new Set((topology.edges || []).flatMap(edge => [edge.a, edge.b]));
  const exportPlateOrders = (topology.plates || []).map(plate => nativePlateNodeOrderForExport(plate, nativeTopologyPoints, edgeNodeIds));
  const referencedNodeIds = new Set();
  for (const edge of topology.edges || []) { referencedNodeIds.add(edge.a); referencedNodeIds.add(edge.b); }
  for (const order of exportPlateOrders) for (const id of order) referencedNodeIds.add(id);
  const exportNodes = (topology.nodes || []).filter(node => referencedNodeIds.has(node.id));
  if (exportNodes.length !== referencedNodeIds.size) throw new Error('Native export has a structural reference to a missing node');
  const nodeIds = new Map(exportNodes.map((node, index) => [node.id, index + 1]));
  const nativePoints = new Map(exportNodes.map(node => [node.id, nativeCells(node.position)]));
  const mounted = new Map();
  const components = hostObjects.map(object => {
    const result = {
      def: definitionIndex.get(object.type),
      id: componentIds.get(object.id),
      pos: nativeCells(object.position),
      rot: nativeRotation(object.rotation),
    };
    if (object.surfaceMount) {
      const mount = nativeSurfaceMount(object, result.rot);
      mounted.set(result.id, mount);
      result.pos = mount.pos; result.rot = mount.rot;
    }
    const paintedIndex = nativePaintIndex(object.paintColor, undefined, 'component paint');
    if (paintedIndex !== undefined) result.colors = Array.from({ length: object.colors?.length || 1 }, () => paintedIndex);
    else if (Array.isArray(object.colors) && object.colors.every(color => nativeColor(color) !== undefined)) result.colors = [...object.colors];
    if (Array.isArray(object.nativeExtension) && object.nativeExtension.length === 3 && object.nativeExtension.every(Number.isInteger)) result.ext = [...object.nativeExtension];
    const nativeProperties = validateNativeProperties(object.nativeProperties);
    if (nativeProperties) Object.assign(result, nativeProperties);
    if (HYDRAULIC_PROFILES[object.type]) {
      delete result.connected_node_index; delete result.length_max; delete result.extension_factor;
    }
    if (NATIVE_MECHANICAL_MATE_RULES.some(rule => rule.a === object.type || rule.b === object.type)) {
      // Relationship IDs are derived from the current snapshot, never copied
      // from imported simulation state or a previous rail slider list.
      delete result.connected_components; delete result.con_orient_index;
    }
    const accessory = object.nativeAccessory;
    if (accessory) {
      // Batteries and filter media use top-level `acc.item`; wheel tyres use
      // the game's nested `element.acc.item` record. Attachments never become
      // grid components.
      if (object.nativeAccessoryContainer === 'element.acc') {
        const element = result.element && typeof result.element === 'object' && !Array.isArray(result.element) ? result.element : {};
        const acc = element.acc && typeof element.acc === 'object' && !Array.isArray(element.acc) ? element.acc : {};
        result.element = { ...element, acc: { ...acc, item: accessory } };
      } else {
        const acc = result.acc && typeof result.acc === 'object' && !Array.isArray(result.acc) ? result.acc : {};
        result.acc = { ...acc, item: accessory };
      }
    }
    if (object.scale && nativeAxes.every(axis => Number.isFinite(object.scale[axis])) && Math.abs(object.scale.x - object.scale.y) < 1e-9 && Math.abs(object.scale.x - object.scale.z) < 1e-9 && Math.abs(object.scale.x - 1) > 1e-9) result.scale = object.scale.x;
    return result;
  });
  for (const connection of connections) {
    const from = objectsById.get(connection.from); const to = objectsById.get(connection.to);
    if ([from, to].some(object => object.mirror || object.localMirrorAxes?.length)) throw mechanicalMateError('reflected-mate', 'Native physical mate export cannot represent reflected component geometry', connection.from + ' / ' + connection.to);
    const a = components[componentIds.get(from.id) - 1]; const b = components[componentIds.get(to.id) - 1];
    const toRef = { connected_vehicle: bodyId(to.id), connected_component: b.id };
    const fromRef = { connected_vehicle: bodyId(from.id), connected_component: a.id };
    if (['rail', 'rail_ballscrew'].includes(mechanicalMateRule(from.type, to.type).type)) {
      (a.connected_components ||= []).push(toRef); Object.assign(b, fromRef);
    } else {
      Object.assign(a, toRef); Object.assign(b, fromRef);
      if (connection.type === 'mounting') { a.con_orient_index = connection.orientationIndices[0]; b.con_orient_index = connection.orientationIndices[1]; }
    }
  }
  for (const link of hydraulicLinks) {
    const base = objectsById.get(link.from.componentId); const rod = objectsById.get(link.to.componentId);
    if ([base, rod].some(object => object.mirror || object.localMirrorAxes?.length)) throw hydraulicError('reflection');
    const a = components[componentIds.get(base.id) - 1]; const b = components[componentIds.get(rod.id) - 1];
    Object.assign(a, { connected_vehicle: bodyId(rod.id), connected_component: b.id, connected_node_index: link.to.port ?? 0, length_max: link.lengthMax, extension_factor: link.extensionFactor });
    Object.assign(b, { connected_vehicle: bodyId(base.id), connected_component: a.id, connected_node_index: link.from.port ?? 0 });
  }
  const nodes = exportNodes.map(node => ({ id: nodeIds.get(node.id), pos: nativeCells(node.position) }));
  const edges = (topology.edges || []).map(edge => {
    const result = { n0: nodeIds.get(edge.a), n1: nodeIds.get(edge.b) };
    const color = nativePaintIndex(edge.color, edge.col, 'edge paint'); if (color !== undefined) result.col = color;
    return result;
  });
  const plates = (topology.plates || []).map((plate, index) => {
    const result = { id: index + 1, nodes: exportPlateOrders[index].map(id => nodeIds.get(id)), glass_impacts: [] };
    const front = nativePaintIndex(plate.color_front, plate.col_front, 'plate front paint');
    const back = nativePaintIndex(plate.color_back, plate.col_back, 'plate back paint');
    if (front !== undefined) result.col_front = front;
    if (back !== undefined) result.col_back = back;
    if (plate.type === 'window') result.type = 'window';
    return result;
  });
  const links = Object.fromEntries(['electric', 'mechanical', 'liquid', 'gas', 'belt', 'data'].map(kind => [`${kind}_links`, (topology.links || []).filter(link => link.kind === kind).flatMap(original => {
    let link = orientMechanicalLink(original, objectsById, componentDefinitions);
    if (kind === 'mechanical') link = normalizeMechanicalExportLink(link, objectsById, componentDefinitions);
    if (!link) return [];
    const first = componentIds.get(link.from?.componentId); const second = componentIds.get(link.to?.componentId);
    if (!first || !second) return [];
    const endpoint = (value, id) => ({ comp: id, ...(Number.isInteger(value?.port) && value.port !== 0 ? { pos: value.port } : {}) });
    // Tracks are generated from wheel endpoint links in the game; no sampled
    // track pieces, route points or diagnostic colors belong in their save.
    if (isTrackLink(link, objectsById, componentDefinitions)) return [{ p0: endpoint(link.from, first), p1: endpoint(link.to, second) }];
    const color = nativePaintIndex(link.paintColor, link.color, 'connection paint');
    return [{ p0: endpoint(link.from, first), p1: endpoint(link.to, second), ...(Array.isArray(link.points) ? { points: link.points.map(nativeCells) } : {}), ...(color !== undefined ? { color } : {}) }];
  })]));
  const componentGrids = values => {
    const grids = [{ components: [] }]; const byFrame = new Map();
    for (const component of values) {
      const mount = mounted.get(component.id);
      if (!mount) { grids[0].components.push(component); continue; }
      const key = JSON.stringify([mount.origin, mount.dir]);
      if (!byFrame.has(key)) { const grid = { origin: mount.origin, dir: mount.dir, components: [] }; byFrame.set(key, grid); grids.push(grid); }
      byFrame.get(key).components.push(component);
    }
    return grids;
  };
  const vehicle = {
    id: vehicleId,
    transform: { m: [...nativeIdentity], t: [0, 0, 0] },
    nodes,
    edges,
    plates,
    plate_paint: [],
    grids: componentGrids(components),
    ...links,
    loot_locations: [],
    creature_locations: [],
    buoyancy_fill: [0],
  };
  const vehicles = partition ? partition.bodies.map((body, index) => ({
    ...vehicle, id: vehicleId + index,
    transform: structuredClone(vehicle.transform),
    plate_paint: [], loot_locations: [], creature_locations: [], buoyancy_fill: [0],
    nodes: nodes.filter((node, i) => partition.nodeBody.get(exportNodes[i].id) === index),
    edges: edges.filter((edge, i) => partition.nodeBody.get(topology.edges[i].a) === index),
    plates: plates.filter((plate, i) => partition.nodeBody.get(topology.plates[i].nodeIds[0]) === index),
    grids: componentGrids(components.filter((component, i) => partition.componentBody.get(hostObjects[i].id) === index)),
    ...Object.fromEntries(Object.entries(links).map(([kind, values]) => [kind, values.filter(link => partition.componentBody.get(hostObjects[link.p0.comp - 1].id) === index)])),
  })) : [vehicle];
  return {
    data: { definitions: { components: definitions }, vehicles: { vehicles } },
    meta: { vehicles: { vehicles: vehicles.map(body => {
      const points = [...body.grids.flatMap(grid => grid.components).map(component => nativeCells(hostObjects[component.id - 1].position).map(value => value * CELL_SIZE_WORLD)), ...body.nodes.map(node => node.pos.map(value => value * CELL_SIZE_WORLD))];
      return { id: body.id, transform: structuredClone(body.transform), bounds: nativeBounds(points) };
    }) } },
  };
}
