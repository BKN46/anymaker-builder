export function inclinedPanelFixture() {
  const nodes = [[-.48, 0, 0], [.48, 0, 0], [.48, .64, .32], [-.48, .64, .32]].map((p, i) => ({ id: 'slope-node-' + i, position: { x: p[0], y: p[1], z: p[2] }, gridId: 'main' }));
  return {
    format: 'anymaker-web-project', version: 1, objects: [],
    topology: {
      nodes,
      edges: nodes.map((node, i) => ({ id: 'slope-edge-' + i, a: node.id, b: nodes[(i + 1) % nodes.length].id })),
      plates: [{ id: 'slope', nodeIds: nodes.map(node => node.id), gridId: 'main', normalOffset: .04, surfaceDirection: { x: 0, y: 1 / Math.sqrt(5), z: -2 / Math.sqrt(5) } }],
      links: [],
    },
  };
}
