// Synthetic construction poses using real catalog components and native fields.
// This is not a game-saved or game-accepted vehicle.
export function trackFixture(suffix = 'c', centers = [[-.8, 0], [.8, 0]]) {
  const objects = centers.map(([x, y], index) => ({
    id: 'track-wheel-' + index, type: (index ? 'roller_wheel_fixed_' : 'sprocket_') + suffix, gridId: 'main',
    position: { x, y, z: 0 }, rotation: { x: 0, y: 0, z: 0 }, scale: { x: 1, y: 1, z: 1 },
  }));
  const links = Array.from({ length: centers.length === 2 ? 1 : centers.length }, (_, index) => ({
    id: 'track-link-' + index, kind: 'belt', from: { componentId: objects[index].id, port: 0 },
    to: { componentId: objects[(index + 1) % objects.length].id, port: 0 }, points: [],
  }));
  return { format: 'anymaker-web-project', version: 1, objects, topology: { nodes: [], edges: [], plates: [], links } };
}
