// Curved windshield profile reduced from the user-provided native vehicle.
// Two matching five-node rails, joined only at the top and bottom.
export function curvedWindowFixture(type = 'window') {
  const profile = [[1, 0], [2, 8], [6, 16], [16, 25], [23, 29]];
  const nodes = [-6, 6].flatMap((z, side) => profile.map(([x, y], i) => ({ id: `${side}-${i}`, gridId: 'grid-1', position: { x: x * .08, y: y * .08, z: z * .08 } })));
  const nodeIds = ['0-0', '0-1', '0-2', '0-3', '0-4', '1-4', '1-3', '1-2', '1-1', '1-0'];
  const edges = nodeIds.map((a, i) => ({ id: 'e' + i, a, b: nodeIds[(i + 1) % nodeIds.length], gridId: 'grid-1' }));
  const plate = { id: 'curve', nodeIds, gridId: 'grid-1', surfaceLimitBypass: true, col_front: 81, col_back: 7, ...(type === 'window' ? { type } : {}) };
  return { format: 'anymaker-web-project', version: 1, objects: [], topology: { nodes, edges, plates: [plate], links: [] } };
}
