// game.gcl get_belt_data radii and vehicle_belt.rebuild cross-section.
// These are world units, not construction cells or visual Mesh bounds.
export const BELT_RADII = Object.freeze({ pulley_wheel: .04, engine_wheel: .1, engine_wheel_b: .155, engine_wheel_c: .267 });
export const BELT_HALF_WIDTH = .028;
export const BELT_HALF_THICKNESS = .006;
export const BELT_TANGENTS = 32;
export const BELT_UV_DENSITY = 16;

export function beltEndpoint(endpoint, components, definitions = new Map()) {
  const component = components.get(endpoint?.componentId);
  const definition = component?.definitionOverride || definitions.get(component?.type);
  const type = definition?.class || component?.type;
  const radius = Object.hasOwn(BELT_RADII, type || '') ? BELT_RADII[type] : null;
  const node = definition?.logic_nodes?.[endpoint?.port ?? 0];
  const isBelt = node?.type === 'belt' || (!definition && radius !== null && (endpoint?.port ?? 0) === 0);
  return { component, definition, node, radius, isBelt };
}

export function isOrdinaryBeltLink(link, components, definitions) {
  return link.kind === 'belt' && [link.from, link.to].some(endpoint => beltEndpoint(endpoint, components, definitions).isBelt);
}
