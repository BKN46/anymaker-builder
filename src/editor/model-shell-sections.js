// A shared octagonal cross-section basis keeps corresponding perimeter edges
// parallel. Lofted faces are planar quads, including after integer-grid fitting.
export function sampleShellSections(volume, bounds, target) {
  const axis = bounds.size.indexOf(Math.max(...bounds.size)), u = (axis + 1) % 3, v = (axis + 2) % 3;
  const { size, field, address, origin, step } = volume;
  const slices = [];
  for (let a = 0; a < size[axis]; a++) {
    const range = { minU: Infinity, maxU: -Infinity, minV: Infinity, maxV: -Infinity, minSum: Infinity, maxSum: -Infinity, minDiff: Infinity, maxDiff: -Infinity };
    for (let y = 0; y < size[v]; y++) for (let x = 0; x < size[u]; x++) {
      const point = []; point[axis] = a; point[u] = x; point[v] = y;
      if (field[address(...point)] < .5) continue;
      const pu = origin[u] + (x + .5) * step, pv = origin[v] + (y + .5) * step;
      range.minU = Math.min(range.minU, pu); range.maxU = Math.max(range.maxU, pu);
      range.minV = Math.min(range.minV, pv); range.maxV = Math.max(range.maxV, pv);
      range.minSum = Math.min(range.minSum, pu + pv); range.maxSum = Math.max(range.maxSum, pu + pv);
      range.minDiff = Math.min(range.minDiff, pu - pv); range.maxDiff = Math.max(range.maxDiff, pu - pv);
    }
    if (Number.isFinite(range.minU)) slices.push({ at: origin[axis] + (a + .5) * step, ...range });
  }
  if (slices.length < 2) throw new Error('无法提取模型外壳，请使用封闭或具有厚度的模型');
  const count = Math.max(target < 70 ? 4 : 10, Math.round(target / 8)), sections = [];
  for (let i = 0; i < count; i++) {
    const at = slices[0].at + (slices.at(-1).at - slices[0].at) * i / (count - 1);
    const found = slices.findIndex(slice => slice.at >= at);
    const upper = found < 0 ? slices.length - 1 : Math.max(1, found);
    const left = slices[upper - 1], right = slices[upper];
    const fraction = Math.max(0, Math.min(1, (at - left.at) / (right.at - left.at)));
    sections.push(Object.fromEntries(Object.keys(left).map(key => [key, key === 'at' ? at : left[key] + fraction * (right[key] - left[key])])));
  }
  return { axis, u, v, sections };
}

export function loftShellSections(profile, { factor = 1, origin = [0, 0, 0], snap = false, symmetryAxis = -1, symmetryCenter = 0 } = {}) {
  const { axis, u, v, sections } = profile, positions = [], indices = [];
  const quantize = value => snap ? Math.round(value) : value;
  const center = symmetryAxis < 0 ? 0 : quantize((symmetryCenter - origin[symmetryAxis]) * factor);
  // A collapsed tip and one-cell corners can invert the game's cube-offset panels.
  const fittedSpan = dimension => Math.max(...sections.map(section => (section[dimension === u ? 'maxU' : 'maxV'] - section[dimension === u ? 'minU' : 'minV']) * factor));
  const minSpan = dimension => snap && fittedSpan(dimension) >= 6 ? 6 : 0;
  const range = (min, max, dimension) => {
    if (dimension !== symmetryAxis) {
      let low = quantize((min - origin[dimension]) * factor), high = quantize((max - origin[dimension]) * factor);
      const missing = minSpan(dimension) - (high - low);
      if (missing > 0) { low -= Math.floor(missing / 2); high += Math.ceil(missing / 2); }
      return [low, high];
    }
    const radius = Math.max(quantize((max - min) * factor / 2), minSpan(dimension) / 2);
    return [center - radius, center + radius];
  };
  for (const section of sections) {
    const [minU, maxU] = range(section.minU, section.maxU, u);
    const [minV, maxV] = range(section.minV, section.maxV, v);
    const maxCut = Math.max(0, snap ? Math.floor((Math.min(maxU - minU, maxV - minV) - 1) / 2) : Math.min(maxU - minU, maxV - minV) * .45);
    const trim = value => Math.min(maxCut, Math.max(snap ? 2 : maxCut * .1, quantize(value * factor)));
    let topRight = section.maxU + section.maxV - section.maxSum;
    let topLeft = section.maxV - section.minU + section.minDiff;
    let bottomLeft = section.minSum - section.minU - section.minV;
    let bottomRight = section.maxU - section.minV - section.maxDiff;
    // Quantize a shared value for paired corners, including half-cell ties.
    if (symmetryAxis === u) {
      topRight = topLeft = (topRight + topLeft) / 2;
      bottomRight = bottomLeft = (bottomRight + bottomLeft) / 2;
    } else if (symmetryAxis === v) {
      topRight = bottomRight = (topRight + bottomRight) / 2;
      topLeft = bottomLeft = (topLeft + bottomLeft) / 2;
    }
    [topRight, topLeft, bottomLeft, bottomRight] = [topRight, topLeft, bottomLeft, bottomRight].map(trim);
    const ring = [[maxU, minV + bottomRight], [maxU, maxV - topRight], [maxU - topRight, maxV], [minU + topLeft, maxV], [minU, maxV - topLeft], [minU, minV + bottomLeft], [minU + bottomLeft, minV], [maxU - bottomRight, minV]];
    for (const point of ring) {
      const vertex = []; vertex[axis] = quantize((section.at - origin[axis]) * factor); vertex[u] = point[0]; vertex[v] = point[1]; positions.push(...vertex);
    }
  }
  if (symmetryAxis === axis) {
    for (let i = 0; i < Math.ceil(sections.length / 2); i++) {
      const j = sections.length - 1 - i;
      const distance = quantize(Math.abs(sections[i].at - symmetryCenter) * factor);
      for (let k = 0; k < 8; k++) {
        const a = (i * 8 + k) * 3, b = (j * 8 + k) * 3;
        positions[a + axis] = i === j ? center : center - distance;
        positions[b + axis] = i === j ? center : center + distance;
        positions[b + u] = positions[a + u]; positions[b + v] = positions[a + v];
      }
    }
  }
  const quad = ([a, b, c, d]) => indices.push(a, b, c, a, c, d);
  for (let ring = 0; ring < sections.length - 1; ring++) for (let i = 0; i < 8; i++) {
    quad([ring * 8 + i, ring * 8 + (i + 1) % 8, (ring + 1) * 8 + (i + 1) % 8, (ring + 1) * 8 + i]);
  }
  for (const [start, reverse] of [[0, true], [(sections.length - 1) * 8, false]]) for (let i = 1; i < 7; i += 2) {
    const face = [start, start + i, start + i + 1, start + i + 2]; quad(reverse ? face.reverse() : face);
  }
  return { positions: new Float64Array(positions), indices: new Uint32Array(indices) };
}
