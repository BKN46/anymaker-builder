// Renderer-independent Anymaker editing model. Native file adapters can map
// this model to .data without importing Three.js or relying on scene objects.
export const MODEL_FORMAT = 'anymaker-builder-domain';
export const MODEL_VERSION = 1;
const AXES = ['x', 'y', 'z'];
const NATIVE_CELL_WORLD = .08;

const clone = value => structuredClone(value);
const vector = (value, fallback = 0) => Object.fromEntries(AXES.map(axis => [axis, Number(value?.[axis] ?? fallback)]));
const identity = () => ({ position: vector(), rotation: vector(), scale: vector({ x: 1, y: 1, z: 1 }, 1) });
const id = (value, fallback) => typeof value === 'string' && value ? value : fallback;

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
    this.colors = Array.isArray(data.colors) ? [...data.colors] : undefined;
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

function nativeVehicleOffsets(vehicles, roots) {
  const byId = new Map(vehicles.map(vehicle => [vehicle.id, vehicle]));
  const offsets = new Map(roots.filter(id => byId.has(id)).map(id => [id, { x: 0, y: 0, z: 0 }]));
  const component = (vehicle, id) => vehicle.grids.flatMap(grid => grid.components).find(value => value.id === String(id));
  const pending = [...offsets.keys()];
  while (pending.length) {
    const vehicle = byId.get(pending.shift());
    const parentOffset = offsets.get(vehicle.id);
    for (const parent of vehicle.grids.flatMap(grid => grid.components)) {
      const childId = String(parent.extras?.native?.state?.connected_vehicle ?? '');
      const child = byId.get(childId);
      const target = child && component(child, parent.extras?.native?.state?.connected_component);
      if (!target || offsets.has(childId)) continue;
      offsets.set(childId, AXES.reduce((value, axis) => ({ ...value, [axis]: parentOffset[axis] + parent.transform.position[axis] - target.transform.position[axis] }), {}));
      pending.push(childId);
    }
  }
  return offsets;
}

function median(values) {
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}

// Native component grids with origin/dir are local construction planes. Their
// component coordinates are therefore not necessarily in the vehicle's main
// grid coordinate space. The save's cross-grid links give us stable placement
// anchors: project a framed grid as one rigid translation whose median offset
// brings its linked components back to their counterparts in the main grid.
// Keep this a display projection only; Grid.origin/dir and every raw native
// value remain preserved by the native adapter for round-trip export.
function nativeGridOffsets(vehicles) {
  const offsets = new Map();
  for (const vehicle of vehicles) {
    const components = new Map();
    for (const grid of vehicle.grids) {
      for (const component of grid.components) components.set(String(component.id), { component, grid });
    }
    const links = vehicle.grids.flatMap(grid => grid.links);
    for (const grid of vehicle.grids) {
      const rawGrid = grid.extras?.native?.raw;
      if (!rawGrid || (!Array.isArray(rawGrid.origin) && !Array.isArray(rawGrid.dir))) continue;
      const members = new Set(grid.components.map(component => String(component.id)));
      const anchors = [];
      for (const link of links) {
        const fromId = String(link.from?.comp ?? '');
        const toId = String(link.to?.comp ?? '');
        const fromIsMember = members.has(fromId);
        const toIsMember = members.has(toId);
        if (fromIsMember === toIsMember) continue;
        const local = components.get(fromIsMember ? fromId : toId);
        const counterpart = components.get(fromIsMember ? toId : fromId);
        if (!local || !counterpart || counterpart.grid === grid) continue;
        anchors.push(Object.fromEntries(AXES.map(axis => [axis, counterpart.component.transform.position[axis] - local.component.transform.position[axis]])));
      }
      if (!anchors.length) continue;
      offsets.set(`${vehicle.id}:${grid.id}`, Object.fromEntries(AXES.map(axis => [axis, median(anchors.map(anchor => anchor[axis]))])));
    }
  }
  return offsets;
}

function nativePosition(position, vehicleOffset, gridOffset = vector()) {
  return Object.fromEntries(AXES.map(axis => [axis, (position[axis] + vehicleOffset[axis] + gridOffset[axis]) * NATIVE_CELL_WORLD]));
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
  const offsets = nativeImport ? nativeVehicleOffsets(vehicles, vehicleIds || []) : new Map();
  const gridOffsets = nativeImport ? nativeGridOffsets(vehicles) : new Map();
  for (const vehicle of source.vehicles) for (const grid of vehicle.grids) for (const component of grid.components) {
    const offset = offsets.get(vehicle.id) || vector();
    const gridOffset = gridOffsets.get(`${vehicle.id}:${grid.id}`) || vector();
    const position = nativeImport ? nativePosition(component.transform.position, offset, gridOffset) : clone(component.transform.position);
    const sourceColors = component.colors || component.extras?.native?.colors;
    objects.push({
      id: nativeImport ? `${vehicle.id}:${grid.id}:${component.id}` : component.id,
      type: component.type,
      gridId: grid.id,
      ...(component.mirror ? { mirror: clone(component.mirror) } : {}),
      ...(Array.isArray(sourceColors) && sourceColors.length <= 10 && sourceColors.every(color => Number.isInteger(color) && color >= 0 && color <= 255) ? { colors: [...sourceColors] } : {}),
      ...(component.hidden ? { hidden: true } : {}),
      ...(nativeExtension(component) ? { nativeExtension: nativeExtension(component) } : {}),
      position,
      rotation: clone(component.transform.rotation),
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
  const offsets = nativeImport ? nativeVehicleOffsets(vehicles, vehicleIds || []) : new Map();
  for (const vehicle of source.vehicles) {
    const componentIds = new Map(vehicle.grids.flatMap(grid => grid.components.map(component => [String(component.id), nativeImport ? `${vehicle.id}:${grid.id}:${component.id}` : component.id])));
    const offset = offsets.get(vehicle.id) || vector();
    for (const grid of vehicle.grids) {
    nodes.push(...grid.nodes.map(node => ({ id: `${grid.id}:${node.id}`, position: nativeImport ? Object.fromEntries(AXES.map(axis => [axis, (node.position[axis] + offset[axis]) * NATIVE_CELL_WORLD])) : clone(node.position), gridId: grid.id })));
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
        points: (link.points || []).map(point => nativeImport ? Object.fromEntries(AXES.map((axis, index) => [axis, (Number(point[index]) + offset[axis]) * NATIVE_CELL_WORLD])) : clone(point)),
        ...(Number.isInteger(link.extras?.native?.color) && link.extras.native.color >= 0 && link.extras.native.color <= 255 ? { color: link.extras.native.color } : {}),
      };
    }));
  }
  }
  return { nodes, edges, plates, links };
}
