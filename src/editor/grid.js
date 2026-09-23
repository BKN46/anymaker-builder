export const CELL_SIZE_WORLD = 0.08;
export const CELL_SIZE_CM = 8;
export const GRID_EPSILON = 1e-7;
export const AXES = ['x', 'y', 'z'];

const finite = value => typeof value === 'number' && Number.isFinite(value) && Math.abs(value) <= 10000;
const canonical = value => Number((value).toFixed(12));

export function worldToCell(value) {
  if (!finite(value)) return null;
  const cell = Math.round(value / CELL_SIZE_WORLD);
  return Math.abs(value - cell * CELL_SIZE_WORLD) <= GRID_EPSILON ? cell : null;
}

export function cellToWorld(cell) {
  if (!Number.isSafeInteger(cell) || Math.abs(cell * CELL_SIZE_WORLD) > 10000) throw new Error('格坐标超出合法范围');
  return canonical(cell * CELL_SIZE_WORLD);
}

export function isGridScalar(value) { return worldToCell(value) !== null; }

export function assertGridScalar(value, label = '坐标') {
  const cell = worldToCell(value);
  if (cell === null) throw new Error(`${label}必须对齐 8 cm 整数格`);
  return cellToWorld(cell);
}

export function isGridVector(value) {
  return !!value && AXES.every(axis => worldToCell(value[axis]) !== null);
}

export function assertGridVector(value, label = '坐标') {
  if (!value || typeof value !== 'object') throw new Error(`${label}必须是三维坐标`);
  return Object.fromEntries(AXES.map(axis => [axis, assertGridScalar(value[axis], `${label}.${axis}`)]));
}

export function quantizeWorldScalar(value) {
  if (!finite(value)) return null;
  return cellToWorld(Math.round(value / CELL_SIZE_WORLD));
}

export function quantizeWorldVector(value) {
  if (!value || typeof value !== 'object') return null;
  const result = Object.fromEntries(AXES.map(axis => [axis, quantizeWorldScalar(value[axis])]));
  return AXES.every(axis => result[axis] !== null) ? result : null;
}

export function cellsBetween(a, b) {
  const start = assertGridVector(a, '梁起点');
  const end = assertGridVector(b, '梁终点');
  return Object.fromEntries(AXES.map(axis => [axis, worldToCell(end[axis]) - worldToCell(start[axis]) ]));
}

export function greatestCommonDivisor(values) {
  const gcd = (a, b) => b ? gcd(b, a % b) : a;
  return values.map(value => Math.abs(value)).reduce(gcd, 0);
}

export function formatCells(value) {
  if (!Number.isSafeInteger(value)) throw new Error('格数必须是整数');
  return String(value);
}
