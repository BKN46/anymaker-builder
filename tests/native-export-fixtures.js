// Minimal portable form of the unsupported plate corners in the 981.1 crash.
export function unsupportedPlateCorners() {
  return { definitions: { components: [] }, vehicles: { vehicles: [{
    id: 1,
    nodes: [
      { id: 27, pos: [0, 0, 0] }, { id: 98, pos: [4, 0, 0] },
      { id: 10, pos: [4, 0, 4] }, { id: 99, pos: [2, 0, 2] },
      { id: 100, pos: [6, 0, 2] },
    ],
    edges: [{ n0: 27, n1: 98, col: 26 }, { n0: 98, n1: 10, col: 49 }],
    plates: [
      { id: 85, nodes: [27, 98, 99], col_front: 81 },
      { id: 87, nodes: [98, 10, 99], col_front: 81 },
      { id: 89, nodes: [98, 100, 10], col_front: 81 },
    ],
    grids: [{ components: [] }],
  }] } };
}

export function crossIslandPlate() {
  return {
    format: 'anymaker-web-project', version: 1, objects: [],
    topology: {
      nodes: [[0, 0], [4, 0], [4, 4], [8, 4]].map(([x, z], i) => ({ id: 'n' + i, position: { x: x * .08, y: 0, z: z * .08 } })),
      edges: [{ id: 'ab', a: 'n0', b: 'n1' }, { id: 'cd', a: 'n2', b: 'n3' }],
      plates: [{ id: 'cross-island', nodeIds: ['n0', 'n1', 'n2'] }], links: [],
    },
  };
}
