// _split_islands uses every node's first incident beam to find its island.
// A corner referenced only by plates therefore crashes the native loader.
// Complete just those corners' boundary beams. This repairs island safety
// only; add_plate also requires EVERY boundary beam during game loading.
// assertPlateBoundariesForNative separately rejects remaining missing sides.
export function completeNativePlateEdges({ nodes = [], edges = [], plates = [] }) {
  const nodeIds = new Set();
  for (const node of nodes) {
    if (!Number.isInteger(node.id) || nodeIds.has(node.id)) throw new Error('Native export has an invalid or duplicate structural node ID');
    nodeIds.add(node.id);
  }
  const edgeNodes = new Set();
  const keys = new Set();
  const key = (a, b) => a < b ? a + ':' + b : b + ':' + a;
  for (const edge of edges) {
    if (!nodeIds.has(edge.n0) || !nodeIds.has(edge.n1) || edge.n0 === edge.n1) throw new Error('Native export beam references a missing or identical node');
    edgeNodes.add(edge.n0); edgeNodes.add(edge.n1);
    keys.add(key(edge.n0, edge.n1));
  }
  const result = structuredClone(edges);
  const supported = new Set(edgeNodes);
  for (const plate of plates) {
    if (!Array.isArray(plate.nodes) || plate.nodes.length < 3 || new Set(plate.nodes).size !== plate.nodes.length || plate.nodes.some(id => !nodeIds.has(id))) {
      throw new Error('Native export plate references invalid boundary nodes');
    }
    for (let index = 0; index < plate.nodes.length; index++) {
      const a = plate.nodes[index]; const b = plate.nodes[(index + 1) % plate.nodes.length];
      if (edgeNodes.has(a) && edgeNodes.has(b)) continue;
      const pair = key(a, b);
      if (keys.has(pair)) continue;
      const color = plate.col_front ?? plate.col_back;
      result.push({ n0: a, n1: b, ...(color !== undefined ? { col: color } : {}) });
      keys.add(pair); supported.add(a); supported.add(b);
    }
  }
  for (const id of nodeIds) if (!supported.has(id)) throw new Error('Native export node ' + id + ' has no incident beam or plate boundary');
  return result;
}
