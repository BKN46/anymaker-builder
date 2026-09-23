// Renderer-independent Anymaker editing model. Native file adapters can map
// this model to .data without importing Three.js or relying on scene objects.
export const MODEL_FORMAT = 'anymaker-builder-domain';
export const MODEL_VERSION = 1;
const AXES = ['x', 'y', 'z'];

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
  }
  const model = new Project({ vehicles: [{ id: 'vehicle-1', grids }] });
  return validateProject(model);
}

export function toEditorDocument(model) {
  validateProject(model);
  const objects = [];
  for (const vehicle of model.vehicles) for (const grid of vehicle.grids) for (const component of grid.components) {
    objects.push({
      id: component.id,
      type: component.type,
      gridId: grid.id,
      ...(component.mirror ? { mirror: clone(component.mirror) } : {}),
      position: clone(component.transform.position),
      rotation: clone(component.transform.rotation),
      scale: clone(component.transform.scale),
    });
  }
  const topology = { nodes: [], edges: [], plates: [] };
  for (const vehicle of model.vehicles) for (const grid of vehicle.grids) {
    topology.nodes.push(...grid.nodes.map(clone));
    topology.edges.push(...grid.edges.map(clone));
    topology.plates.push(...grid.plates.map(clone));
  }
  const result = { format: 'anymaker-web-project', version: 1, objects };
  if (topology.nodes.length || topology.edges.length || topology.plates.length) result.topology = topology;
  return result;
}

export function toEditorTopology(model) {
  validateProject(model);
  const nodes = [];
  const edges = [];
  const plates = [];
  for (const vehicle of model.vehicles) for (const grid of vehicle.grids) {
    nodes.push(...grid.nodes.map(node => ({ id: `${grid.id}:${node.id}`, position: clone(node.position), gridId: grid.id })));
    const prefix = id => `${grid.id}:${id}`;
    edges.push(...grid.edges.map(edge => ({ id: prefix(edge.id), a: prefix(edge.a), b: prefix(edge.b), gridId: grid.id })));
    plates.push(...grid.plates.map(plate => ({ id: prefix(plate.id), nodeIds: plate.nodeIds.map(prefix), gridId: grid.id })));
  }
  return { nodes, edges, plates };
}
