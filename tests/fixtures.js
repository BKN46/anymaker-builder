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
