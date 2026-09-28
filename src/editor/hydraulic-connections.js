// Hydraulic cylinders are physical connections, not native *_links networks.
// Game evidence and limits: doc/11_HYDRAULIC_CONNECTIONS.md.
import { HYDRAULIC_PROFILES } from './hydraulic-profiles.js';
import { componentFrame } from './component-frame.js';
import { CELL_SIZE_WORLD } from './grid.js';
import { logicNodeCellPosition } from './connection-ports.js';
import { validateLinks } from './connections.js';

export function hydraulicError(code) {
  const error = new Error('Invalid hydraulic connection: ' + code);
  error.hydraulicCode = code;
  return error;
}

export function hydraulicEndpoint(endpoint, components, definitions = new Map()) {
  const component = components.get(endpoint?.componentId);
  const definition = component && (definitions.get(component.type) || HYDRAULIC_PROFILES[component.type]);
  const node = definition?.logic_nodes?.[endpoint?.port ?? 0];
  if (!component || !['hydraulic', 'hydraulic_base'].includes(node?.type)) throw hydraulicError('ports');
  return { component, definition, node, role: node.type === 'hydraulic_base' ? 'base' : 'rod', size: node.size ?? 0 };
}

export function orientHydraulicLink(link, components, definitions = new Map()) {
  const from = hydraulicEndpoint(link.from, components, definitions);
  const to = hydraulicEndpoint(link.to, components, definitions);
  if (from.role === to.role) throw hydraulicError('roles');
  if (from.size !== to.size) throw hydraulicError('size');
  if (from.component.id === to.component.id) throw hydraulicError('ports');
  for (const endpoint of [from, to]) {
    if (['x', 'y', 'z'].some(axis => Math.abs((endpoint.component.scale?.[axis] ?? 1) - 1) > 1e-9)) throw hydraulicError('scale');
  }
  return from.role === 'base' ? structuredClone(link) : { ...structuredClone(link), from: structuredClone(link.to), to: structuredClone(link.from) };
}

export function prepareHydraulicLink(link, components, definitions = new Map()) {
  const oriented = orientHydraulicLink(link, components, definitions);
  const endpoints = [oriented.from, oriented.to].map(value => {
    const { component, node, definition } = hydraulicEndpoint(value, components, definitions);
    return componentFrame(component).point(logicNodeCellPosition(node, component.nativeExtension, definition.center_stretch));
  });
  const distance = Math.hypot(...endpoints[0].map((value, axis) => value - endpoints[1][axis]));
  // The game's drag tool sends rounded anchor distance in cells and factor 1.
  const lengthMax = Math.round(distance / CELL_SIZE_WORLD);
  if (lengthMax < 1 || lengthMax > 10000) throw hydraulicError('length');
  return { ...oriented, points: [], lengthMax, extensionFactor: 1 };
}

export function nativeHydraulicLinks(vehicles, componentIds) {
  const byKey = new Map(vehicles.flatMap(vehicle => vehicle.grids.flatMap(grid => grid.components.map(component => [vehicle.id + ':' + component.id, component]))));
  const links = [];
  for (const vehicle of vehicles) for (const grid of vehicle.grids) for (const base of grid.components) {
    const profile = HYDRAULIC_PROFILES[base.type];
    const port = profile?.logic_nodes.findIndex(node => node.type === 'hydraulic_base') ?? -1;
    if (port < 0) continue;
    const state = base.extras?.native?.state;
    if (!state?.connected_vehicle && !state?.connected_component) continue;
    if (!state.connected_vehicle || !state.connected_component) throw hydraulicError('reference');
    const rod = byKey.get(state.connected_vehicle + ':' + state.connected_component);
    if (!rod) throw hydraulicError('reference');
    const rodPort = state.connected_node_index ?? 0;
    const rodNode = HYDRAULIC_PROFILES[rod.type]?.logic_nodes?.[rodPort];
    if (rodNode?.type !== 'hydraulic' || (rodNode.size ?? 0) !== (profile.logic_nodes[port].size ?? 0)) throw hydraulicError('reference');
    const reverse = rod.extras?.native?.state;
    if (reverse?.connected_vehicle !== Number(vehicle.id) || reverse?.connected_component !== Number(base.id) || (reverse?.connected_node_index ?? 0) !== port) throw hydraulicError('reference');
    links.push({
      id: 'hydraulic-' + componentIds.get(base), kind: 'hydraulic',
      from: { componentId: componentIds.get(base), port },
      to: { componentId: componentIds.get(rod), port: rodPort },
      points: [], lengthMax: state.length_max ?? 8, extensionFactor: state.extension_factor ?? 0,
    });
  }
  // Do not silently drop a one-sided rod reference.
  for (const component of byKey.values()) {
    if (!HYDRAULIC_PROFILES[component.type]?.logic_nodes.some(node => node.type === 'hydraulic')) continue;
    const state = component.extras?.native?.state;
    if ((state?.connected_vehicle || state?.connected_component) && !links.some(link => link.to.componentId === componentIds.get(component))) throw hydraulicError('reference');
  }
  return validateLinks(links, new Set(componentIds.values()));
}
