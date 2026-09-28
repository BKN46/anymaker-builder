// game.gcl: sprocket_*.G_RADIUS and vehicle_belt_track.get_track_piece_length.
// Wheel centers use dynamic Mesh offsets in world units, NOT logic-node cells.
export const TRACK_TYPES = Object.freeze({
  belt_track_narrow: { mesh: 'meshes/components/tank_track_a.mesh', pitch: .08 * Math.PI / 4 },
  belt_track: { mesh: 'meshes/components/tank_track_b.mesh', pitch: .16 * Math.PI / 4 },
  belt_track_wide: { mesh: 'meshes/components/tank_track_c.mesh', pitch: .24 * Math.PI / 4 },
});
const sizes = { small_narrow: .08, large_narrow: .16, small: .18, large: .34, small_wide: .23, large_wide: .43 };
const suffixes = ['small_narrow', 'large_narrow', 'small', 'large', 'small_wide', 'large_wide'];

export function trackProfile(definition, type = definition?.id) {
  const match = /^(sprocket|roller_wheel_fixed|roller_wheel_suspension)_([a-f])$/.exec(type || '');
  const classMatch = /^(sprocket|roller_wheel_fixed|roller_wheel_suspension)_(small_narrow|large_narrow|small_wide|large_wide|small|large)$/.exec(definition?.class || '');
  if (!match && !classMatch) return null;
  const family = classMatch?.[1] || match[1];
  const size = classMatch?.[2] || suffixes[match[2].charCodeAt(0) - 97];
  const nodeType = size.endsWith('_narrow') ? 'belt_track_narrow' : size.endsWith('_wide') ? 'belt_track_wide' : 'belt_track';
  const mesh = definition?.meshes_dynamic?.[family === 'roller_wheel_suspension' ? 1 : 0];
  return { ...TRACK_TYPES[nodeType], nodeType, radius: sizes[size], center: family === 'sprocket' ? [0, 0, 0] : mesh?.pos || [0, 0, 0] };
}

export function trackEndpoint(endpoint, components, definitions = new Map()) {
  const component = components.get(endpoint?.componentId);
  const definition = component?.definitionOverride || definitions.get(component?.type);
  const node = definition?.logic_nodes?.[endpoint?.port ?? 0];
  const profile = trackProfile(definition, component?.type);
  const nodeType = node?.type || (!definition && (endpoint?.port ?? 0) === 0 ? profile?.nodeType : null);
  return { component, definition, profile, nodeType, isTrack: Object.hasOwn(TRACK_TYPES, nodeType || '') };
}

export function isTrackLink(link, components, definitions) {
  return link.kind === 'belt' && [link.from, link.to].some(endpoint => trackEndpoint(endpoint, components, definitions).isTrack);
}
