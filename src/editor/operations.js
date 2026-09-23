// Pure project operations. This module intentionally has no Three.js import:
// IDs, grids and transforms remain portable between the editor, file format
// and a future native Anymaker adapter.
import { AXES, assertGridScalar, assertGridVector } from './grid.js';

const clone = value => structuredClone(value);
const vector = (value, fallback = 0) => Object.fromEntries(AXES.map(axis => [axis, Number(value?.[axis] ?? fallback)]));
const add = (a, b) => Object.fromEntries(AXES.map(axis => [axis, a[axis] + b[axis]]));

export function allocateIds(objects, suffix = 'copy') {
  const used = new Set(objects.map(object => object.id));
  return base => {
    const stem = `${base}-${suffix}`;
    let id = stem;
    let index = 2;
    while (used.has(id)) id = `${stem}-${index++}`;
    used.add(id);
    return id;
  };
}

export function copyObjects(objects, ids, delta = { x: 0, y: 0, z: 0 }) {
  const selected = new Set(ids);
  const shift = assertGridVector(vector(delta), '复制位移');
  const next = clone(objects);
  const allocate = allocateIds(next);
  const idMap = {};
  for (const object of objects) {
    if (!selected.has(object.id)) continue;
    const copy = clone(object);
    copy.id = allocate(object.id);
    copy.position = assertGridVector(add(assertGridVector(vector(copy.position), '组件位置'), shift), '复制后的组件位置');
    idMap[object.id] = copy.id;
    next.push(copy);
  }
  return { objects: next, idMap, created: Object.values(idMap) };
}

export function moveObjects(objects, ids, delta) {
  const selected = new Set(ids);
  const shift = assertGridVector(vector(delta), '移动位移');
  return {
    objects: clone(objects).map(object => selected.has(object.id)
      ? { ...object, position: assertGridVector(add(assertGridVector(vector(object.position), '组件位置'), shift), '移动后的组件位置') }
      : object),
  };
}

export function removeObjects(objects, ids) {
  const selected = new Set(ids);
  const removed = objects.filter(object => selected.has(object.id)).map(object => object.id);
  return { objects: clone(objects).filter(object => !selected.has(object.id)), removed };
}

export function mirrorObjects(objects, ids, { axis = 'x', offset = 0 } = {}) {
  if (!AXES.includes(axis)) throw new Error('镜像平面无效');
  const gridOffset = assertGridScalar(offset, '镜像偏移');
  const selected = new Set(ids);
  const next = clone(objects);
  const allocate = allocateIds(next, 'mirror');
  const idMap = {};
  for (const object of objects) {
    if (!selected.has(object.id)) continue;
    const copy = clone(object);
    copy.id = allocate(object.id);
    copy.position = assertGridVector(vector(copy.position), '组件位置');
    copy.position[axis] = 2 * gridOffset - copy.position[axis];
    copy.position = assertGridVector(copy.position, '镜像后的组件位置');
    // Reflection is not silently encoded as a negative scale. The renderer
    // consumes this explicit operation metadata and the native adapter can
    // later apply a handedness/component mapping where one exists.
    copy.mirror = { axis, offset: gridOffset };
    idMap[object.id] = copy.id;
    next.push(copy);
  }
  return { objects: next, idMap, created: Object.values(idMap) };
}

export function splitGrid(objects, ids, gridId) {
  if (typeof gridId !== 'string' || !/^[A-Za-z0-9_-]{1,80}$/.test(gridId)) throw new Error('子网格 ID 无效');
  const selected = new Set(ids);
  if (!selected.size) throw new Error('至少选择一个组件才能拆分子网格');
  let changed = 0;
  const next = clone(objects).map(object => {
    if (!selected.has(object.id)) return object;
    changed++;
    return { ...object, gridId };
  });
  return { objects: next, gridId, changed };
}

export function mergeGrids(objects, gridIds, targetGridId) {
  if (typeof targetGridId !== 'string' || !/^[A-Za-z0-9_-]{1,80}$/.test(targetGridId)) throw new Error('目标子网格 ID 无效');
  const source = new Set(gridIds);
  if (!source.size) throw new Error('至少选择一个源子网格');
  let changed = 0;
  const next = clone(objects).map(object => {
    if (!source.has(object.gridId)) return object;
    changed++;
    return { ...object, gridId: targetGridId };
  });
  return { objects: next, gridId: targetGridId, changed };
}

export function gridIds(objects) {
  return [...new Set(objects.map(object => object.gridId).filter(Boolean))].sort();
}
