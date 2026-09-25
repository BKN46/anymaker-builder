// Placement orientation is kept separate from the transform gizmo because it
// is applied before a component is committed. The state is plain data so a
// placement preview and the resulting project object use the same choices.

export const PLACEMENT_ORIENTATION_KEYS = Object.freeze({
  j: { kind: 'rotate', axis: 'x' },
  k: { kind: 'rotate', axis: 'y' },
  l: { kind: 'rotate', axis: 'z' },
  u: { kind: 'mirror', axis: 'x' },
  i: { kind: 'mirror', axis: 'y' },
  o: { kind: 'mirror', axis: 'z' },
});

const axes = ['x', 'y', 'z'];
const quarterTurn = Math.PI / 2;

export function placementOrientation() {
  return { rotation: { x: 0, y: 0, z: 0 }, localMirrorAxes: [] };
}

export function updatePlacementOrientation(current, key) {
  const binding = PLACEMENT_ORIENTATION_KEYS[String(key || '').toLowerCase()];
  if (!binding) return null;
  const rotation = Object.fromEntries(axes.map(axis => [axis, Number(current?.rotation?.[axis]) || 0]));
  const mirrors = new Set((current?.localMirrorAxes || []).filter(axis => axes.includes(axis)));
  if (binding.kind === 'rotate') rotation[binding.axis] = (rotation[binding.axis] + quarterTurn) % (Math.PI * 2);
  else if (mirrors.has(binding.axis)) mirrors.delete(binding.axis); else mirrors.add(binding.axis);
  return { rotation, localMirrorAxes: axes.filter(axis => mirrors.has(axis)) };
}
