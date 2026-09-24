import { Project, Vehicle, Grid, Component, Node, Edge, Plate, Link, validateProject } from '../editor/model.js';

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
      const grid = new Grid({ id: gridId, origin: vector(nativeGrid.origin), dir: vector(nativeGrid.dir) });
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
