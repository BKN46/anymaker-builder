// Native vehicle components use `ext` for grid-cell extensions. This is
// distinct from the editor's visual transform scale: the game applies each
// extension after the component definition's `center_stretch` threshold.

const AXES = ['x', 'y', 'z'];
const DEFAULT_EXTENSION_LIMIT = 10000;

function axisIndex(axis) {
  return AXES.indexOf(axis);
}

function integerAt(values, index, fallback = 0) {
  return Array.isArray(values) && Number.isInteger(values[index]) ? values[index] : fallback;
}

export function extensionAxes(definition) {
  if (!definition || typeof definition !== 'object') return [];
  return AXES.flatMap((axis, index) => {
    const mode = definition[`mode_${axis}`];
    const interval = Number(definition.interval?.[index]);
    if (!['stretch', 'tile'].includes(mode) || !Number.isInteger(interval) || interval <= 0) return [];
    const configuredMaximum = Number(definition.ext_max?.[index]);
    const maximum = Number.isInteger(configuredMaximum) && configuredMaximum >= 0
      ? configuredMaximum
      : DEFAULT_EXTENSION_LIMIT;
    return [{ axis, index, mode, interval, max: Math.floor(maximum / interval) * interval }];
  });
}

export function extensionVector(definition, extension) {
  const result = AXES.map((_, index) => Math.max(0, integerAt(extension, index)));
  for (const descriptor of extensionAxes(definition)) {
    const value = Math.min(result[descriptor.index], descriptor.max);
    result[descriptor.index] = Math.floor(value / descriptor.interval) * descriptor.interval;
  }
  return result;
}

export function updateExtension(definition, extension, axis, value) {
  const descriptor = extensionAxes(definition).find(item => item.axis === axis);
  if (!descriptor || !Number.isFinite(value)) throw new Error('Component axis is not linearly extendable');
  const result = extensionVector(definition, extension);
  const snapped = Math.round(value / descriptor.interval) * descriptor.interval;
  result[descriptor.index] = Math.min(descriptor.max, Math.max(0, snapped));
  return result;
}

// GCL `vehicle_component_util.stretch_vertex` applies an extension only to
// coordinates strictly beyond the matching center_stretch coordinate. The
// source mesh is expressed in world units while definitions/ext use cells.
export function stretchMeshPositions(definition, extension, positions, cellSize) {
  const stretchAxes = extensionAxes(definition).filter(item => item.mode === 'stretch');
  if (!stretchAxes.length || !positions?.length || !Number.isFinite(cellSize) || cellSize <= 0) return positions;
  const ext = extensionVector(definition, extension);
  const center = Array.isArray(definition.center_stretch) ? definition.center_stretch : [0, 0, 0];
  const result = new Float32Array(positions);
  for (let offset = 0; offset < result.length; offset += 3) {
    for (const descriptor of stretchAxes) {
      const threshold = Number(center[descriptor.index]) * cellSize;
      if (Number.isFinite(threshold) && result[offset + descriptor.index] > threshold) {
        result[offset + descriptor.index] += ext[descriptor.index] * cellSize;
      }
    }
  }
  return result;
}

export function extensionHandlePosition(definition, extension, cellSize) {
  const ext = extensionVector(definition, extension);
  const center = Array.isArray(definition?.center_stretch) ? definition.center_stretch : [0, 0, 0];
  return AXES.map((_, index) => (Number(center[index]) || 0) * cellSize + ext[index] * cellSize);
}

export function extensionAxisIndex(axis) {
  return axisIndex(axis);
}
