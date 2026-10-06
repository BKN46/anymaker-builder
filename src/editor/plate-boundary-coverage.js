// Loading calls add_plate, which erases a face when any find_edge fails.
// Island traversal's nullable edge references do not relax this load rule.
export function missingPlateBoundaries({ edges = [], plates = [] }) {
  const key = (a, b) => JSON.stringify([a, b].sort());
  const existing = new Set(edges.map(edge => key(edge.a, edge.b)));
  return plates.flatMap(plate => {
    const missing = plate.nodeIds.flatMap((a, i) => {
      const b = plate.nodeIds[(i + 1) % plate.nodeIds.length];
      return existing.has(key(a, b)) ? [] : [[a, b]];
    });
    return missing.length ? [{ code: 'native-plate-missing-boundary', severity: 'error', entityIds: [plate.id],
      nodeIds: [...new Set(missing.flat())], missing, message: '面片缺少边界梁，游戏加载时会丢弃；请保留完整边界或修改曲面连接' }] : [];
  });
}

export function assertPlateBoundariesForNative(topology) {
  const diagnostics = missingPlateBoundaries(topology);
  if (diagnostics.length) throw Object.assign(new Error(diagnostics[0].message + ' (' + diagnostics.map(d => d.entityIds[0]).join(', ') + ')'), { structuralDiagnostics: diagnostics });
}
