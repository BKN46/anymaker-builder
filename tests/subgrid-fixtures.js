export function disconnectedSubgridsFixture() {
  const objects = []; const nodes = []; const edges = []; const plates = [];
  for (const [index, name] of ['left', 'right'].entries()) {
    const x = index * 1.6;
    objects.push({ id: name, type: 'mechanical_handle', gridId: 'grid-1', position: { x, y: .08, z: 0 }, rotation: { x: 0, y: 0, z: 0 }, scale: { x: 1, y: 1, z: 1 }, colors: [12] });
    const corners = [[x - .32, 0, -.32], [x + .32, 0, -.32], [x + .32, 0, .32], [x - .32, 0, .32]];
    const ids = corners.map((p, i) => {
      const id = name + '-node-' + i;
      nodes.push({ id, position: { x: p[0], y: p[1], z: p[2] }, gridId: 'grid-1' });
      return id;
    });
    edges.push(...ids.map((a, i) => ({ id: name + '-edge-' + i, a, b: ids[(i + 1) % ids.length], gridId: 'grid-1' })));
    plates.push({ id: name + '-panel', nodeIds: ids, gridId: 'grid-1', normalOffset: .04 });
  }
  return {
    format: 'anymaker-web-project', version: 1, projectName: 'Separate panels',
    objects, grids: [{ id: 'grid-1' }], topology: { nodes, edges, plates, links: [] },
    visibilityGroups: [{ id: 'both', name: 'Both handles', components: ['left', 'right'], edges: [], plates: [] }],
  };
}
