// Average an exterior profile with its reflection, keeping the section budget.
// Work on copies so worker caches can also serve symmetry-off previews.
export function symmetrizeShellProfile(profile, axis, center) {
  const sections = profile.sections.map(section => ({ ...section }));
  const average = (a, b) => Object.fromEntries(Object.keys(a).map(key => [key, (a[key] + b[key]) / 2]));
  if (axis === profile.axis) {
    for (let i = 0; i < Math.ceil(sections.length / 2); i++) {
      const j = sections.length - 1 - i;
      const section = average(sections[i], { ...sections[j], at: 2 * center - sections[j].at });
      sections[i] = section;
      sections[j] = { ...section, at: 2 * center - section.at };
    }
  } else {
    for (let i = 0; i < sections.length; i++) {
      const s = sections[i];
      const reflected = axis === profile.u ? {
        ...s, minU: 2 * center - s.maxU, maxU: 2 * center - s.minU,
        minSum: 2 * center - s.maxDiff, maxSum: 2 * center - s.minDiff,
        minDiff: 2 * center - s.maxSum, maxDiff: 2 * center - s.minSum,
      } : {
        ...s, minV: 2 * center - s.maxV, maxV: 2 * center - s.minV,
        minSum: 2 * center + s.minDiff, maxSum: 2 * center + s.maxDiff,
        minDiff: s.minSum - 2 * center, maxDiff: s.maxSum - 2 * center,
      };
      sections[i] = average(s, reflected);
    }
  }
  return { ...profile, sections };
}

// Open surfaces have no section profile. Clip to the positive half of the
// center plane, then reflect with reversed winding. Coordinates are grid cells;
// round shared intersections once and let the caller weld seam vertices.
export function mirrorModelHalf(mesh, axis, center) {
  const positions = [], indices = [];
  const emit = points => {
    for (let j = 1; j + 1 < points.length; j++) {
      const start = positions.length / 3;
      positions.push(...points[0], ...points[j], ...points[j + 1]);
      indices.push(start, start + 1, start + 2);
    }
  };
  for (let i = 0; i < mesh.indices.length; i += 3) {
    const face = Array.from(mesh.indices.slice(i, i + 3), id => Array.from(mesh.positions.slice(id * 3, id * 3 + 3)));
    const clipped = [];
    for (let j = 0; j < 3; j++) {
      const a = face[j], b = face[(j + 1) % 3];
      if (a[axis] >= center) clipped.push(a);
      if ((a[axis] < center && b[axis] > center) || (a[axis] > center && b[axis] < center)) {
        // Evaluate every shared edge in the same direction to avoid half-cell
        // rounding discrepancies when neighboring faces use opposite winding.
        const [low, high] = a[axis] < b[axis] ? [a, b] : [b, a];
        const fraction = (center - low[axis]) / (high[axis] - low[axis]);
        clipped.push(low.map((value, k) => k === axis ? center : Math.round(value + fraction * (high[k] - value))));
      }
    }
    if (clipped.length < 3) continue;
    emit(clipped);
    if (clipped.some(point => point[axis] !== center)) emit(clipped.map(point => point.map((value, k) => k === axis ? 2 * center - value : value)).reverse());
  }
  return { positions: new Float64Array(positions), indices: new Uint32Array(indices) };
}
