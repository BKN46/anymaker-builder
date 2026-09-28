export function structureTransformFixture() {
  const points = [[.16, .08, 0], [.48, .08, 0], [.48, .4, 0], [.16, .4, 0], [.8, .08, 0]];
  const nodes = points.map(([x, y, z], i) => ({ id: 'n' + i, gridId: 'grid-1', position: { x, y, z } }));
  const edges = [[0, 1], [1, 2], [2, 3], [3, 0], [1, 4]].map(([a, b], i) => ({ id: 'e' + i, gridId: 'grid-1', a: 'n' + a, b: 'n' + b, size: 1, color: '#336699' }));
  const plates = [{ id: 'p0', gridId: 'grid-1', nodeIds: ['n0', 'n1', 'n2', 'n3'], surfaceDirection: { x: 0, y: 0, z: 1 }, normalOffset: .04, col_front: 3, col_back: 5, color_front: '#aa2244', color_back: '#22aa44' }];
  return { format: 'anymaker-web-project', version: 1, grids: [{ id: 'grid-1' }], objects: [], topology: { nodes, edges, plates, links: [] } };
}
