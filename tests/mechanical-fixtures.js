// Reduced construction layout from creation 981.1: two independent subgrids,
// a quarter-turned pin and an oppositely mounted knuckle, with no saved mate.
// Contains no game binary, generated meshes or machine-local paths.
export function hingeAssemblyFixture() {
  return {
    definitions: { components: ['hinge_pin', 'hinge_knuckle'] },
    vehicles: { vehicles: [{
      id: 1,
      nodes: [
        { id: 42, pos: [-12, 5, 11] }, { id: 43, pos: [-12, 7, 11] },
        { id: 85, pos: [-12, 5, 10] }, { id: 86, pos: [-12, 7, 10] },
      ],
      edges: [{ n0: 42, n1: 43 }, { n0: 85, n1: 86 }],
      grids: [{ components: [
        { id: 4, def: 0, pos: [-13, 5, 11], rot: [0, 1, 0, -1, 0, 0, 0, 0, 1], colors: [8] },
        { id: 5, def: 1, pos: [-13, 5, 10], rot: [0, -1, 0, -1, 0, 0, 0, 0, -1], colors: [12] },
      ] }],
    }] },
  };
}

export function mateObject(id, type, position = { x: 0, y: 0, z: 0 }, rotation = { x: 0, y: 0, z: 0 }) {
  return { id, type, position: { ...position }, rotation: { ...rotation }, scale: { x: 1, y: 1, z: 1 } };
}
