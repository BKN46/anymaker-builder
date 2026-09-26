// Synthetic geometry, no proprietary game assets.
export function meshFixture({ layout = 36, parts = 1 } = {}) {
  const chunks = [];
  const u32 = n => { const b = Buffer.alloc(4); b.writeUInt32LE(n); return b; };
  chunks.push(Buffer.from('mesh'), u32(5), u32(parts));
  for (let p = 0; p < parts; p++) {
    const name = Buffer.from('synthetic');
    const header = Buffer.alloc(140);
    const signature = layout === 36 ? [3, 1, 5, 2, 2, 3, 3, 4] : layout === 28 ? [3, 1, 5, 2, 3, 4, 0, 0] : [3, 1, 5, 2, 0, 0, 0, 0];
    signature.forEach((n, i) => header.writeUInt32LE(n, i * 4));
    [0, 0, 0, 1, 1, 0].forEach((v, i) => header.writeDoubleLE(v, 88 + i * 8));
    header.writeUInt32LE(layout * 3, 136);
    const vertices = Buffer.alloc(layout * 3);
    [[0, 0, 0], [1, 0, 0], [0, 1, 0]].forEach((v, i) => {
      v.forEach((n, a) => vertices.writeFloatLE(n, i * layout + a * 4));
      vertices.writeUInt32LE(0xffffffff, i * layout + 12);
      if (layout > 16) vertices.writeFloatLE(1, i * layout + (layout === 36 ? 24 : 16) + 8);
    });
    chunks.push(u32(name.length), name, header, vertices, u32(12), u32(0), u32(1), u32(2));
  }
  chunks.push(Buffer.alloc(8));
  return Buffer.concat(chunks);
}
// Small self-contained glTF 2.0 quad; mutation supports parser boundary tests.
export function modelGlbFixture(mutate = () => {}) {
  const binary = Buffer.alloc(60);
  [0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0].forEach((value, i) => binary.writeFloatLE(value, i * 4));
  [0, 1, 2, 0, 2, 3].forEach((value, i) => binary.writeUInt16LE(value, 48 + i * 2));
  const json = {
    asset: { version: '2.0' }, scene: 0, scenes: [{ nodes: [0] }], nodes: [{ mesh: 0 }],
    meshes: [{ primitives: [{ attributes: { POSITION: 0 }, indices: 1 }] }],
    buffers: [{ byteLength: binary.length }],
    bufferViews: [{ buffer: 0, byteOffset: 0, byteLength: 48 }, { buffer: 0, byteOffset: 48, byteLength: 12 }],
    accessors: [{ bufferView: 0, componentType: 5126, count: 4, type: 'VEC3' }, { bufferView: 1, componentType: 5123, count: 6, type: 'SCALAR' }],
  };
  mutate(json, binary);
  const text = Buffer.from(JSON.stringify(json));
  const padded = Buffer.alloc(Math.ceil(text.length / 4) * 4, 32); text.copy(padded);
  const buffer = Buffer.alloc(28 + padded.length + binary.length);
  buffer.writeUInt32LE(0x46546c67, 0); buffer.writeUInt32LE(2, 4); buffer.writeUInt32LE(buffer.length, 8);
  buffer.writeUInt32LE(padded.length, 12); buffer.writeUInt32LE(0x4e4f534a, 16); padded.copy(buffer, 20);
  buffer.writeUInt32LE(binary.length, 20 + padded.length); buffer.writeUInt32LE(0x004e4942, 24 + padded.length); binary.copy(buffer, 28 + padded.length);
  return buffer;
}
