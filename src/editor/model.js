// Renderer-independent Anymaker editing model. Native file adapters can map
// this model to .data without importing Three.js or relying on scene objects.
import { nativePropertiesFromState } from './component-properties.js';
import { nativeAccessoryContainerFromState, nativeAccessoryFromState } from './native-accessories.js';

export const MODEL_FORMAT = 'anymaker-builder-domain';
export const MODEL_VERSION = 1;
const AXES = ['x', 'y', 'z'];
const NATIVE_CELL_WORLD = .08;

const clone = value => structuredClone(value);
const vector = (value, fallback = 0) => Object.fromEntries(AXES.map(axis => [axis, Number(value?.[axis] ?? fallback)]));
const nativeVector = value => Array.isArray(value)
  ? { x: Number(value[0] ?? 0), y: Number(value[1] ?? 0), z: Number(value[2] ?? 0) }
  : vector(value);
const identity = () => ({ position: vector(), rotation: vector(), scale: vector({ x: 1, y: 1, z: 1 }, 1) });
const id = (value, fallback) => typeof value === 'string' && value ? value : fallback;
const identityMatrix = () => [1, 0, 0, 0, 1, 0, 0, 0, 1];
const cross = (a, b) => ({ x: a.y * b.z - a.z * b.y, y: a.z * b.x - a.x * b.z, z: a.x * b.y - a.y * b.x });
const length = value => Math.hypot(...AXES.map(axis => value[axis]));
const scale = (value, factor) => Object.fromEntries(AXES.map(axis => [axis, value[axis] * factor]));
const subtract = (left, right) => Object.fromEntries(AXES.map(axis => [axis, left[axis] - right[axis]]));
const normalize = value => scale(value, 1 / length(value));
const multiplyMatrixVector = (matrix, value) => ({
  x: matrix[0] * value.x + matrix[1] * value.y + matrix[2] * value.z,
  y: matrix[3] * value.x + matrix[4] * value.y + matrix[5] * value.z,
  z: matrix[6] * value.x + matrix[7] * value.y + matrix[8] * value.z,
});
const multiplyMatrices = (left, right) => Array.from({ length: 9 }, (_, index) => {
  const row = Math.floor(index / 3); const column = index % 3;
  return left[row * 3] * right[column] + left[row * 3 + 1] * right[column + 3] + left[row * 3 + 2] * right[column + 6];
});
const transposeMatrix = matrix => [matrix[0], matrix[3], matrix[6], matrix[1], matrix[4], matrix[7], matrix[2], matrix[5], matrix[8]];
const add = (left, right) => Object.fromEntries(AXES.map(axis => [axis, left[axis] + right[axis]]));

function matrixToEulerXYZ(matrix) {
  const clamp = value => Math.max(-1, Math.min(1, value));
  const y = Math.asin(clamp(matrix[2]));
  if (Math.abs(matrix[2]) < .9999999) return { x: Math.atan2(-matrix[5], matrix[8]), y, z: Math.atan2(-matrix[1], matrix[0]) };
  return { x: Math.atan2(matrix[7], matrix[4]), y, z: 0 };
}

function nativeComponentRotation(component) {
  const raw = component.extras?.native?.rotationMatrix;
  if (!Array.isArray(raw) || raw.length !== 9 || raw.some(value => !Number.isFinite(value))) return identityMatrix();
  // Native component rotations are column-major; all matrix helpers here use
  // row-major matrices which map local vectors into their parent frame.
  return transposeMatrix(raw);
}

export class Component {
  constructor(data = {}) {
    this.id = id(data.id, 'component');
    this.type = id(data.type, 'unknown');
    this.gridId = id(data.gridId, 'grid-1');
    this.transform = {
      position: vector(data.position ?? data.transform?.position),
      rotation: vector(data.rotation ?? data.transform?.rotation),
      scale: vector(data.scale ?? data.transform?.scale, 1),
    };
    this.mirror = data.mirror ? { axis: data.mirror.axis, offset: data.mirror.offset } : undefined;
    this.localMirrorAxes = Array.isArray(data.localMirrorAxes) ? [...data.localMirrorAxes] : undefined;
    this.colors = Array.isArray(data.colors) ? [...data.colors] : undefined;
    this.paintColor = typeof data.paintColor === 'string' ? data.paintColor : undefined;
    this.hidden = data.hidden === true ? true : undefined;
    this.extras = clone(data.extras || {});
  }
}

export class Node {
  constructor(data = {}) { Object.assign(this, clone(data), { id: id(data.id, 'node'), position: vector(data.position) }); }
}

export class Edge {
  constructor(data = {}) { Object.assign(this, clone(data), { id: id(data.id, 'edge'), a: id(data.a, ''), b: id(data.b, '') }); }
}

export class Plate {
  constructor(data = {}) { Object.assign(this, clone(data), { id: id(data.id, 'plate'), nodeIds: Array.isArray(data.nodeIds) ? [...data.nodeIds] : [] }); }
}

export class Link {
  constructor(data = {}) {
    Object.assign(this, clone(data), { id: id(data.id, 'link'), kind: id(data.kind, 'unknown'), from: clone(data.from || {}), to: clone(data.to || {}) });
  }
}

export class Grid {
  constructor(data = {}) {
    this.id = id(data.id, 'grid-1');
    this.origin = vector(data.origin);
    this.dir = vector(data.dir, 0);
    this.transform = { ...identity(), ...(data.transform || {}) };
    this.components = (data.components || []).map(value => new Component({ ...value, gridId: this.id }));
    this.nodes = (data.nodes || []).map(value => new Node(value));
    this.edges = (data.edges || []).map(value => new Edge(value));
    this.plates = (data.plates || []).map(value => new Plate(value));
    this.links = (data.links || []).map(value => new Link(value));
    this.extras = clone(data.extras || {});
  }
}

export class Vehicle {
  constructor(data = {}) {
    this.id = id(data.id, 'vehicle-1');
    this.transform = { ...identity(), ...(data.transform || {}) };
    this.grids = (data.grids || []).map(value => new Grid(value));
    this.extras = clone(data.extras || {});
  }
}

export class Project {
  constructor(data = {}) {
    this.format = MODEL_FORMAT;
    this.version = MODEL_VERSION;
    this.units = { position: 'game-world', rotation: 'radians-xyz', scale: 'ratio', ...(data.units || {}) };
    this.vehicles = (data.vehicles || []).map(value => new Vehicle(value));
    this.extras = clone(data.extras || {});
  }
}

function collectIds(values, label) {
  const seen = new Set();
  for (const value of values) {
    if (!value.id || seen.has(value.id)) throw new Error(`Duplicate ${label} ID: ${value.id}`);
    seen.add(value.id);
  }
  return seen;
}

export function validateProject(project) {
  if (!project || project.format !== MODEL_FORMAT || project.version !== MODEL_VERSION || !Array.isArray(project.vehicles)) throw new Error('Unsupported domain model version');
  collectIds(project.vehicles, 'vehicle');
  for (const vehicle of project.vehicles) {
    collectIds(vehicle.grids, 'grid');
    const vehicleComponentIds = new Set();
    for (const grid of vehicle.grids) {
      for (const component of grid.components) {
        if (!component.id || vehicleComponentIds.has(component.id)) throw new Error(`Duplicate component ID: ${component.id}`);
        vehicleComponentIds.add(component.id);
      }
      const nodeIds = collectIds(grid.nodes, 'node');
      const edgeIds = collectIds(grid.edges, 'edge');
      collectIds(grid.plates, 'plate');
      collectIds(grid.links, 'link');
      for (const edge of grid.edges) {
        if (!nodeIds.has(edge.a) || !nodeIds.has(edge.b)) throw new Error(`Edge ${edge.id} references an unknown node`);
      }
      for (const plate of grid.plates) {
        if (plate.nodeIds.some(nodeId => !nodeIds.has(nodeId))) throw new Error(`Plate ${plate.id} references an unknown node`);
      }
      for (const link of grid.links) {
        if (!link.from || !link.to) throw new Error(`Link ${link.id} has no endpoints`);
      }
      // Keep the set read so malformed values cannot be silently accepted by
      // callers that expect every collection to be ID-addressable.
      if (!edgeIds) throw new Error('Invalid edge collection');
    }
  }
  return project;
}

export function fromEditorDocument(document) {
  const objects = Array.isArray(document?.objects) ? document.objects : [];
  const components = objects.map(value => new Component(value));
  const gridMap = new Map();
  for (const component of components) {
    if (!gridMap.has(component.gridId)) gridMap.set(component.gridId, []);
    gridMap.get(component.gridId).push(component);
  }
  const grids = [...gridMap.entries()].map(([gridId, values]) => ({ id: gridId, components: values }));
  if (!grids.length) grids.push({ id: 'grid-1', components: [] });
  if (document.topology) {
    const target = grids.find(grid => grid.id === 'grid-1') || grids[0];
    target.nodes = clone(document.topology.nodes || []);
    target.edges = clone(document.topology.edges || []);
    target.plates = clone(document.topology.plates || []);
    target.links = clone(document.topology.links || []);
  }
  const model = new Project({ vehicles: [{ id: 'vehicle-1', grids }] });
  return validateProject(model);
}

function selectedVehicles(model, vehicleIds) {
  if (!vehicleIds) return model.vehicles;
  const byId = new Map(model.vehicles.map(vehicle => [vehicle.id, vehicle]));
  const ids = new Set(vehicleIds.filter(id => byId.has(id)));
  // Native connected_vehicle/component pairs form a vehicle assembly. Include
  // every reachable child vehicle when the user imports a root vehicle.
  const pending = [...ids];
  while (pending.length) {
    const id = pending.shift();
    const vehicle = byId.get(id);
    for (const component of vehicle.grids.flatMap(grid => grid.components)) {
      const childId = component.extras?.native?.state?.connected_vehicle;
      if (byId.has(String(childId)) && !ids.has(String(childId))) {
        ids.add(String(childId));
        pending.push(String(childId));
      }
    }
  }
  return model.vehicles.filter(vehicle => ids.has(vehicle.id));
}

// Game GCL: vehicle_grid_util.get_grid_axis_normals and
// vehicle_util.grid_origin_dir.get_transform (see doc/06_REVERSE_ENGINEERING.md).
// Keep the frame in cells so attachment offsets precede the 8 cm conversion.
export function nativeGridFrame(grid) {
  const origin = vector(grid?.origin);
  const direction = vector(grid?.dir ?? { x: 0, y: 1, z: 0 });
  if ([...AXES.map(axis => origin[axis]), ...AXES.map(axis => direction[axis])].some(value => !Number.isFinite(value))) throw new Error('Native grid origin/dir must contain finite numbers');
  if (length(direction) === 0) throw new Error('Native grid direction must be nonzero');
  // Only the zero-origin, +Y base grid bypasses surface mounting. A translated
  // +Y grid is still a surface grid and needs the mounting offset.
  if (AXES.every(axis => origin[axis] === 0) && direction.x === 0 && direction.y === 1 && direction.z === 0) return { origin, rotation: identityMatrix() };
  const y = normalize(direction);
  const up = direction.x === 0 && direction.z === 0 ? { x: 0, y: 0, z: 1 } : { x: 0, y: 1, z: 0 };
  const x = normalize(cross(direction, up));
  const z = normalize(cross(x, y));
  // get_plate_node_surface_offset(dir, normal, 0): the supporting face center,
  // edge midpoint or corner of the half-cell node cube. get_transform then
  // adds another half-cell along the normal to place the component base.
  const surfaceOffset = Object.fromEntries(AXES.map(axis => [axis, Math.sign(direction[axis]) * .5]));
  return {
    origin: add(origin, add(surfaceOffset, scale(y, .5))),
    // Columns are the local axes expressed in the vehicle frame.
    rotation: [x.x, y.x, z.x, x.y, y.y, z.y, x.z, y.z, z.z],
  };
}

function nativeCellPosition(position, frame) {
  return add(frame.origin, multiplyMatrixVector(frame.rotation, position));
}

function nativeFrames(vehicles) {
  const frames = new Map();
  for (const vehicle of vehicles) for (const grid of vehicle.grids) frames.set(`${vehicle.id}:${grid.id}`, nativeGridFrame(grid));
  return frames;
}

// These are construction-constraint pivots, not interaction or logic ports.
// The published hinge-knuckle definition explicitly declares
// `constraint_position: [0, 0, -1]`; other currently observed connected
// components have their multibody pivot at their component origin. In
// particular, tow_hitch's surface/logic position is an exposed port and does
// not agree with the stored connected_vehicle construction anchor.
const NATIVE_CONSTRAINT_POSITIONS = new Map([
  ['hinge_knuckle', { x: 0, y: 0, z: -1 }],
]);

function nativeConstraintPosition(component, frame) {
  const local = NATIVE_CONSTRAINT_POSITIONS.get(component.type) || vector();
  const componentRotation = nativeComponentRotation(component);
  return add(
    nativeCellPosition(component.transform.position, frame),
    multiplyMatrixVector(frame.rotation, multiplyMatrixVector(componentRotation, local)),
  );
}

function nativeVehicleOffsets(vehicles, roots, frames) {
  const byId = new Map(vehicles.map(vehicle => [vehicle.id, vehicle]));
  const attached = new Set();
  for (const vehicle of vehicles) for (const component of vehicle.grids.flatMap(grid => grid.components)) {
    const childId = String(component.extras?.native?.state?.connected_vehicle ?? '');
    if (byId.has(childId)) attached.add(childId);
  }
  const rootIds = roots.length ? roots.filter(id => byId.has(id)) : vehicles.map(vehicle => vehicle.id).filter(id => !attached.has(id));
  const offsets = new Map(rootIds.map(id => [id, vector()]));
  const component = (vehicle, componentId) => {
    for (const grid of vehicle.grids) {
      const value = grid.components.find(candidate => candidate.id === String(componentId));
      if (value) return { component: value, grid };
    }
    return null;
  };
  const pending = [...offsets.keys()];
  while (pending.length) {
    const vehicle = byId.get(pending.shift());
    const parentOffset = offsets.get(vehicle.id);
    const candidates = new Map();
    for (const grid of vehicle.grids) for (const parent of grid.components) {
      const childId = String(parent.extras?.native?.state?.connected_vehicle ?? '');
      const child = byId.get(childId);
      const target = child && component(child, parent.extras?.native?.state?.connected_component);
      if (!target || offsets.has(childId)) continue;
      const parentPosition = nativeConstraintPosition(parent, frames.get(`${vehicle.id}:${grid.id}`));
      const targetPosition = nativeConstraintPosition(target.component, frames.get(`${child.id}:${target.grid.id}`));
      const positions = candidates.get(childId) || [];
      positions.push(add(parentOffset, subtract(parentPosition, targetPosition)));
      candidates.set(childId, positions);
    }
    // Construction anchors of a rigid child must resolve to the same offset.
    // Averaging component origins hides an incorrect pivot and shifts every
    // child object; fail the import instead of inventing a position.
    for (const [childId, positions] of candidates) {
      const offset = positions[0];
      if (positions.some(position => AXES.some(axis => Math.abs(position[axis] - offset[axis]) > 1e-6))) {
        throw new Error(`Native vehicle ${childId} has incompatible construction attachment anchors`);
      }
      offsets.set(childId, offset);
      pending.push(childId);
    }
  }
  return offsets;
}

function nativePosition(position, vehicleOffset, frame) {
  const cells = add(nativeCellPosition(position, frame), vehicleOffset);
  return Object.fromEntries(AXES.map(axis => [axis, cells[axis] * NATIVE_CELL_WORLD]));
}

export function nativeGridLocalDelta(grid, worldDelta) {
  const frame = nativeGridFrame(grid);
  const cells = scale(vector(worldDelta), 1 / NATIVE_CELL_WORLD);
  return multiplyMatrixVector(transposeMatrix(frame.rotation), cells);
}

function nativeExtension(component) {
  const extension = component.extras?.native?.state?.ext;
  return Array.isArray(extension) && extension.length === 3 && extension.every(value => Number.isInteger(value)) ? [...extension] : undefined;
}

export function toEditorDocument(model, { vehicleIds = null } = {}) {
  validateProject(model);
  const vehicles = selectedVehicles(model, vehicleIds);
  const source = { ...model, vehicles };
  if (!source.vehicles.length) throw new Error('No selected vehicle exists in the domain model');
  const objects = [];
  const nativeImport = !!source.extras?.native;
  const frames = nativeImport ? nativeFrames(vehicles) : new Map();
  const offsets = nativeImport ? nativeVehicleOffsets(vehicles, vehicleIds || [], frames) : new Map();
  for (const vehicle of source.vehicles) for (const grid of vehicle.grids) for (const component of grid.components) {
    const offset = offsets.get(vehicle.id) || vector();
    const frame = frames.get(`${vehicle.id}:${grid.id}`);
    const position = nativeImport ? nativePosition(component.transform.position, offset, frame) : clone(component.transform.position);
    const sourceColors = component.colors || component.extras?.native?.colors;
    const id = nativeImport ? `${vehicle.id}:${grid.id}:${component.id}` : component.id;
    const state = component.extras?.native?.state;
    const accessoryItem = nativeAccessoryFromState(state);
    const accessoryContainer = nativeAccessoryContainerFromState(state);
    // `acc.item` (or legacy `element.acc.item`) is an installed item, not a
    // component record. Keep it on its host as an explicit accessory field;
    // the renderer adds its visual below the host's component transform.
    const propertyState = clone(state || {});
    if (propertyState.acc && typeof propertyState.acc === 'object') {
      delete propertyState.acc.item;
      if (!Object.keys(propertyState.acc).length) delete propertyState.acc;
    }
    if (propertyState.element?.acc && typeof propertyState.element.acc === 'object') {
      delete propertyState.element.acc.item;
      if (!Object.keys(propertyState.element.acc).length) delete propertyState.element.acc;
      if (!Object.keys(propertyState.element).length) delete propertyState.element;
    }
    objects.push({
      id,
      type: component.type,
      gridId: grid.id,
      ...(component.mirror ? { mirror: clone(component.mirror) } : {}),
      ...(component.localMirrorAxes?.length ? { localMirrorAxes: [...component.localMirrorAxes] } : {}),
      ...(Array.isArray(sourceColors) && sourceColors.length <= 10 && sourceColors.every(color => Number.isInteger(color) && color >= 0 && color <= 255) ? { colors: [...sourceColors] } : {}),
      ...(typeof component.paintColor === 'string' ? { paintColor: component.paintColor } : {}),
      ...(component.hidden ? { hidden: true } : {}),
      ...(nativeExtension(component) ? { nativeExtension: nativeExtension(component) } : {}),
      ...(nativePropertiesFromState(propertyState) ? { nativeProperties: nativePropertiesFromState(propertyState) } : {}),
      ...(accessoryItem ? { nativeAccessory: accessoryItem } : {}),
      ...(accessoryContainer ? { nativeAccessoryContainer: accessoryContainer } : {}),
      ...(nativeImport ? { nativeProjected: true } : {}),
      position,
      rotation: nativeImport ? matrixToEulerXYZ(multiplyMatrices(frame.rotation, nativeComponentRotation(component))) : clone(component.transform.rotation),
      scale: clone(component.transform.scale),
    });
  }
  const topology = { nodes: [], edges: [], plates: [] };
  const links = [];
  for (const vehicle of source.vehicles) for (const grid of vehicle.grids) {
    topology.nodes.push(...grid.nodes.map(clone));
    topology.edges.push(...grid.edges.map(clone));
    topology.plates.push(...grid.plates.map(clone));
    links.push(...grid.links.map(clone));
  }
  const result = { format: 'anymaker-web-project', version: 1, objects };
  if (nativeImport) {
    // Keep the root selection when topology is flattened too. Passing the
    // already filtered source without vehicleIds loses the assembly root and
    // consequently resets every connected child vehicle's topology offset.
    const importedTopology = toEditorTopology(model, { vehicleIds });
    if (importedTopology.nodes.length || importedTopology.edges.length || importedTopology.plates.length || importedTopology.links.length) result.topology = importedTopology;
    return result;
  }
  if (links.length) topology.links = links;
  if (topology.nodes.length || topology.edges.length || topology.plates.length || links.length) result.topology = topology;
  return result;
}

export function toEditorTopology(model, { vehicleIds = null } = {}) {
  validateProject(model);
  const vehicles = selectedVehicles(model, vehicleIds);
  const source = { ...model, vehicles };
  if (!source.vehicles.length) throw new Error('No selected vehicle exists in the domain model');
  const nodes = [];
  const edges = [];
  const plates = [];
  const links = [];
  const nativeImport = !!source.extras?.native;
  const frames = nativeImport ? nativeFrames(vehicles) : new Map();
  const offsets = nativeImport ? nativeVehicleOffsets(vehicles, vehicleIds || [], frames) : new Map();
  for (const vehicle of source.vehicles) {
    const componentIds = new Map(vehicle.grids.flatMap(grid => grid.components.map(component => [String(component.id), nativeImport ? `${vehicle.id}:${grid.id}:${component.id}` : component.id])));
    const offset = offsets.get(vehicle.id) || vector();
    for (const grid of vehicle.grids) {
    // Native topology is stored in vehicle coordinates. The adapter keeps it
    // on the first grid only as a container; it is not mounted on that grid.
    const frame = nativeImport ? { origin: vector(), rotation: identityMatrix() } : null;
    nodes.push(...grid.nodes.map(node => ({ id: `${grid.id}:${node.id}`, position: nativeImport ? nativePosition(node.position, offset, frame) : clone(node.position), gridId: grid.id,
      ...(nativeImport ? { nativeProjected: true } : {}),
    })));
    const prefix = id => `${grid.id}:${id}`;
    edges.push(...grid.edges.map(edge => ({ id: prefix(edge.id), a: prefix(edge.a), b: prefix(edge.b), gridId: grid.id,
      ...(Number.isInteger(edge.extras?.native?.col) && edge.extras.native.col >= 0 && edge.extras.native.col <= 255 ? { col: edge.extras.native.col } : {}),
    })));
    plates.push(...grid.plates.map(plate => ({ id: prefix(plate.id), nodeIds: plate.nodeIds.map(prefix), gridId: grid.id,
      ...(Number.isInteger(plate.extras?.native?.col_front) && plate.extras.native.col_front >= 0 && plate.extras.native.col_front <= 255 ? { col_front: plate.extras.native.col_front } : {}),
      ...(Number.isInteger(plate.extras?.native?.col_back) && plate.extras.native.col_back >= 0 && plate.extras.native.col_back <= 255 ? { col_back: plate.extras.native.col_back } : {}),
      ...(plate.extras?.native?.type === 'window' ? { type: 'window' } : {}),
    })));
    links.push(...grid.links.map(link => {
      const endpoint = (value, label) => {
        const componentId = componentIds.get(String(value?.comp));
        if (!componentId) throw new Error(`Native ${link.kind} link ${link.id} ${label} references an unknown component`);
        return { componentId, ...(Number.isInteger(value?.pos) ? { port: value.pos } : {}) };
      };
      return {
        id: prefix(link.id), kind: link.kind, from: endpoint(link.from, 'source'), to: endpoint(link.to, 'target'),
        points: (link.points || []).map(point => nativeImport ? nativePosition(nativeVector(point), offset, frame) : clone(point)),
        ...(nativeImport ? { nativeProjected: true } : {}),
        ...(Number.isInteger(link.extras?.native?.color) && link.extras.native.color >= 0 && link.extras.native.color <= 255 ? { color: link.extras.native.color } : {}),
      };
    }));
  }
  }
  return { nodes, edges, plates, links };
}
