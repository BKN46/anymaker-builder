// Local geometry only: no textures, material libraries, URLs or game assets.
import { Matrix4, Quaternion, Vector3 } from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { STLLoader } from 'three/addons/loaders/STLLoader.js';

export const MODEL_FILE_LIMIT = 32 * 1024 * 1024;
export const MODEL_VERTEX_LIMIT = 500000;
export const MODEL_FACE_LIMIT = 500000;
const invalid = () => new Error('模型几何无效或格式暂不支持');
const budget = () => new Error('模型过大：最多 32 MB、50 万顶点和 50 万三角面');

function collector() {
  const positions = [], indices = [];
  let rawVertices = 0;
  return {
    positions, indices,
    append(points, triangles, matrix = new Matrix4()) {
      const count = points.length / 3;
      if (rawVertices + count > MODEL_VERTEX_LIMIT || (indices.length + triangles.length) / 3 > MODEL_FACE_LIMIT) throw budget();
      const base = positions.length / 3;
      const point = new Vector3();
      for (let i = 0; i < points.length; i += 3) {
        point.fromArray(points, i).applyMatrix4(matrix);
        if (point.toArray().some(value => !Number.isFinite(value) || Math.abs(value) > 1e8)) throw invalid();
        positions.push(point.x, point.y, point.z);
      }
      const reflected = matrix.determinant() < 0;
      for (let i = 0; i < triangles.length; i += 3) {
        const face = triangles.slice(i, i + 3);
        if (face.length !== 3 || face.some(value => !Number.isInteger(value) || value < 0 || value >= count)) throw invalid();
        if (reflected) [face[1], face[2]] = [face[2], face[1]];
        indices.push(...face.map(value => base + value));
      }
      rawVertices += count;
    },
    finish() {
      if (!positions.length || !indices.length) throw new Error('模型中没有可用的三角面');
      return { positions: new Float64Array(positions), indices: new Uint32Array(indices), rawVertices, rawFaces: indices.length / 3 };
    },
  };
}

function readGlb(buffer, output) {
  const view = new DataView(buffer);
  if (buffer.byteLength < 20 || view.getUint32(0, true) !== 0x46546c67 || view.getUint32(4, true) !== 2 || view.getUint32(8, true) !== buffer.byteLength) throw invalid();
  let json, binary;
  for (let offset = 12; offset < buffer.byteLength;) {
    if (offset + 8 > buffer.byteLength) throw invalid();
    const length = view.getUint32(offset, true), type = view.getUint32(offset + 4, true);
    offset += 8;
    if (length % 4 || offset + length > buffer.byteLength) throw invalid();
    if (type === 0x4e4f534a) {
      if (json || offset !== 20) throw invalid();
      json = JSON.parse(new TextDecoder().decode(new Uint8Array(buffer, offset, length)));
    } else if (type === 0x004e4942) {
      if (binary) throw invalid();
      binary = new DataView(buffer, offset, length);
    }
    offset += length;
  }
  if (json?.asset?.version !== '2.0' || !binary || json.buffers?.length !== 1 || json.buffers[0].uri !== undefined || !Number.isInteger(json.buffers[0].byteLength) || json.buffers[0].byteLength > binary.byteLength) throw invalid();
  if (json.extensionsRequired?.length) throw new Error('暂不支持压缩或扩展几何，请导出普通 GLB');
  const readAccessor = (index, components) => {
    const accessor = json.accessors?.[index];
    const bv = json.bufferViews?.[accessor?.bufferView];
    const sizes = { 5121: 1, 5123: 2, 5125: 4, 5126: 4 };
    const bytes = sizes[accessor?.componentType];
    if (!accessor || !bv || bv.buffer !== 0 || bv.extensions || accessor.sparse || accessor.normalized || !bytes || accessor.type !== (components === 3 ? 'VEC3' : 'SCALAR') || (components === 3 && accessor.componentType !== 5126) || (components === 1 && accessor.componentType === 5126)) throw invalid();
    const count = accessor.count, stride = bv.byteStride ?? bytes * components;
    const start = bv.byteOffset ?? 0, relative = accessor.byteOffset ?? 0;
    if (!Number.isInteger(count) || count < 1 || count > (components === 3 ? MODEL_VERTEX_LIMIT : MODEL_FACE_LIMIT * 3)) throw budget();
    if (![start, relative, bv.byteLength, stride].every(Number.isInteger) || start < 0 || relative < 0 || bv.byteLength < 0 || stride < bytes * components || stride > 252 || stride % bytes || start + bv.byteLength > json.buffers[0].byteLength || relative + (count - 1) * stride + bytes * components > bv.byteLength) throw invalid();
    const values = new (components === 3 ? Float64Array : Uint32Array)(count * components);
    for (let i = 0; i < count; i++) for (let c = 0; c < components; c++) {
      const offset = start + relative + i * stride + c * bytes;
      values[i * components + c] = accessor.componentType === 5126 ? binary.getFloat32(offset, true) : bytes === 4 ? binary.getUint32(offset, true) : bytes === 2 ? binary.getUint16(offset, true) : binary.getUint8(offset);
    }
    return values;
  };
  const nodes = json.nodes;
  const scene = json.scenes?.[json.scene ?? 0];
  if (!Array.isArray(nodes) || nodes.length > 10000 || !Array.isArray(scene?.nodes)) throw invalid();
  const seen = new Set();
  const visit = (index, parent, depth) => {
    if (!Number.isInteger(index) || !nodes[index] || seen.has(index) || depth > 100) throw invalid();
    seen.add(index);
    const node = nodes[index];
    if (node.skin !== undefined || node.extensions) throw new Error('暂不支持骨骼或扩展实例，请导出静态模型');
    const vector = (value, fallback) => {
      const result = value ?? fallback;
      if (!Array.isArray(result) || result.length !== fallback.length || result.some(n => !Number.isFinite(n))) throw invalid();
      return result;
    };
    let matrix;
    if (node.matrix) {
      const values = vector(node.matrix, new Array(16).fill(0));
      if (values[3] || values[7] || values[11] || values[15] !== 1) throw invalid();
      matrix = new Matrix4().fromArray(values);
    } else {
      const rotation = new Quaternion().fromArray(vector(node.rotation, [0, 0, 0, 1]));
      if (Math.abs(rotation.length() - 1) > .001) throw invalid();
      matrix = new Matrix4().compose(new Vector3().fromArray(vector(node.translation, [0, 0, 0])), rotation, new Vector3().fromArray(vector(node.scale, [1, 1, 1])));
    }
    matrix.premultiply(parent);
    if (node.mesh !== undefined) {
      const mesh = json.meshes?.[node.mesh];
      if (!Array.isArray(mesh?.primitives)) throw invalid();
      for (const primitive of mesh.primitives) {
        if (primitive.extensions || primitive.targets) throw new Error('暂不支持压缩或扩展几何，请导出普通 GLB');
        const points = readAccessor(primitive.attributes?.POSITION, 3);
        const source = primitive.indices === undefined ? Uint32Array.from({ length: points.length / 3 }, (_, i) => i) : readAccessor(primitive.indices, 1);
        let triangles = source;
        const mode = primitive.mode ?? 4;
        if (mode === 5 || mode === 6) {
          triangles = [];
          for (let i = 2; i < source.length; i++) triangles.push(...(mode === 6 ? [source[0], source[i - 1], source[i]] : i % 2 ? [source[i - 1], source[i - 2], source[i]] : [source[i - 2], source[i - 1], source[i]]));
        } else if (mode !== 4) throw new Error('模型包含非三角面图元，请先转换为三角网格');
        output.append(points, triangles, matrix);
      }
    }
    if (node.children !== undefined && !Array.isArray(node.children)) throw invalid();
    for (const child of node.children || []) visit(child, matrix, depth + 1);
  };
  for (const root of scene.nodes) visit(root, new Matrix4(), 0);
}

export function parseModel(buffer, filename) {
  if (!(buffer instanceof ArrayBuffer) || !buffer.byteLength) throw invalid();
  if (buffer.byteLength > MODEL_FILE_LIMIT) throw budget();
  const extension = String(filename).split('.').pop().toLowerCase();
  const output = collector();
  if (extension === 'glb') readGlb(buffer, output);
  else if (extension === 'obj' || extension === 'stl') {
    let root, geometry;
    try {
      if (extension === 'obj') {
        const text = new TextDecoder().decode(buffer);
        let vertices = 0, triangles = 0;
        for (const line of text.split(/\r?\n/)) {
          const tokens = line.trim().split(/\s+/);
          if (tokens[0] === 'v') vertices++;
          if (tokens[0] === 'f') {
            triangles += tokens.length - 3;
            if (tokens.length < 4 || tokens.slice(1).some(token => {
              const index = Number(token.split('/')[0]);
              return !Number.isInteger(index) || index === 0 || index > vertices || index < -vertices;
            })) throw invalid();
          }
          if (vertices > MODEL_VERTEX_LIMIT || triangles * 3 > MODEL_VERTEX_LIMIT) throw budget();
        }
        root = new OBJLoader().parse(text);
        root.traverse(object => {
          if (object.isMesh) output.append(object.geometry.attributes.position.array, Uint32Array.from({ length: object.geometry.attributes.position.count }, (_, i) => i));
        });
      } else {
        const count = buffer.byteLength >= 84 ? new DataView(buffer).getUint32(80, true) : 0;
        if (84 + count * 50 === buffer.byteLength) {
          if (count * 3 > MODEL_VERTEX_LIMIT) throw budget();
        } else {
          const text = new TextDecoder().decode(buffer);
          if (!/^\s*solid\b/i.test(text) || !/endsolid/i.test(text)) throw invalid();
          if ((text.match(/\bvertex\b/g) || []).length > MODEL_VERTEX_LIMIT) throw budget();
        }
        geometry = new STLLoader().parse(buffer);
        const positions = geometry.attributes.position;
        if (positions.count % 3) throw invalid();
        output.append(positions.array, Uint32Array.from({ length: positions.count }, (_, i) => i));
      }
    } finally {
      geometry?.dispose();
      root?.traverse(object => {
        object.geometry?.dispose();
        for (const material of [].concat(object.material || [])) material.dispose();
      });
    }
  } else throw new Error('请选择 GLB、OBJ 或 STL 文件');
  return output.finish();
}
