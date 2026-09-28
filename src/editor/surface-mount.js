// A surface mount retains native dir/local cells while its world transform
// remains editable. Recovering origin from the current position means whole-
// cell translations, centering and copies cannot leave a stale grid origin.
import { nativeGridFrame } from '../native/grid-frame.js';
import { CELL_SIZE_WORLD } from './grid.js';
import { frameVector, vectorArray, transformVector, transposeRotation, multiplyRotations } from './component-frame.js';

export function validateSurfaceMount(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('斜面安装信息无效');
  for (const key of ['dir', 'position']) {
    if (!Array.isArray(value[key]) || value[key].length !== 3 || value[key].some(n => !Number.isInteger(n) || Math.abs(n) > 1000000)) throw new Error('斜面安装坐标和方向必须是有效整数');
  }
  if (value.dir.filter(n => n !== 0).length < 2) throw new Error('斜面安装方向必须指向斜面');
  return { dir: [...value.dir], position: [...value.position] };
}

export function inclinedMountFrame(dir, origin = [0, 0, 0]) {
  return nativeGridFrame({ origin: frameVector(origin), dir: frameVector(dir) });
}

export function nativeSurfaceMount(object, worldRotation) {
  if (object.mirror || object.localMirrorAxes?.length) throw new Error('暂不支持导出反射几何的斜面安装组件');
  const mount = validateSurfaceMount(object.surfaceMount);
  const frame = inclinedMountFrame(mount.dir);
  const offset = transformVector(frame.rotation, mount.position).map((value, i) => value + vectorArray(frame.origin)[i]);
  const world = [-object.position.x, object.position.y, object.position.z].map(value => value / CELL_SIZE_WORLD);
  const origin = world.map((value, i) => value - offset[i]);
  if (origin.some(value => !Number.isFinite(value) || Math.abs(value - Math.round(value)) > 1e-5)) throw new Error('斜面安装组件须按整格位移');
  // Native rot is column-major. Only signed orthogonal local axes are proven
  // by the game's mat33_s32 placement path; do not emit fractional rotations.
  const local = multiplyRotations(transposeRotation(frame.rotation), transposeRotation(worldRotation));
  const rounded = local.map(value => Math.round(value));
  if (local.some((value, i) => Math.abs(value - rounded[i]) > 1e-6) || rounded.some(value => Math.abs(value) > 1)) throw new Error('斜面安装组件须按安装面局部轴以 90° 旋转');
  return { origin: origin.map(Math.round), dir: mount.dir, pos: mount.position, rot: transposeRotation(rounded) };
}
