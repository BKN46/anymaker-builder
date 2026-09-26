// The editor's X axis is opposite the native vehicle axis. Reflection is its
// own inverse; rotations need S * R * S to remain proper rotations.
export const reflectNativePoint = point => ({ ...point, x: point.x === 0 ? 0 : -point.x });

export function reflectNativeRotation(matrix) {
  const signs = [-1, 1, 1];
  return matrix.map((value, index) => value * signs[Math.floor(index / 3)] * signs[index % 3]);
}
