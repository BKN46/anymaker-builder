import { hingeAssemblyFixture } from './mechanical-fixtures.js';

// Reduced noncoplanar plate 13 from creation 981.1, plus a valid triangle
// sharing its nodes. Coordinates are native cells; no local file is needed.
export function nonplanarNativeFixture() {
  const data = hingeAssemblyFixture(); const vehicle = data.vehicles.vehicles[0];
  vehicle.nodes.push(...[
    [81, [7, 13, 11]], [44, [10, 13, 11]], [52, [10, 13, 17]], [80, [6, 12, 17]],
  ].map(([id, pos]) => ({ id, pos })));
  vehicle.edges.push(...[[80, 52], [52, 44], [44, 81], [81, 80]].map(([n0, n1]) => ({ n0, n1 })));
  vehicle.edges.push({ n0: 42, n1: 81 });
  vehicle.plates = [
    { id: 13, nodes: [80, 52, 44, 81], col_front: 3, col_back: 5 },
    { id: 14, nodes: [52, 44, 81], col_front: 7, col_back: 9, type: 'window' },
  ];
  return data;
}
