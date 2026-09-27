// Published Meshes keep the game's connection-interface colours in their
// packed vertex colour channel. Only these named surface parts are known to
// represent network interfaces; ordinary body parts remain diagnostic grey.
const INTERFACE_PART = /(?:^|[_-])(?:electric|data|gas|liquid|mechanical|pipe|torque|oil)_surface(?:[_-]|$)/i;
const INTERFACE_SOURCE = /(?:^|\/)interface_(?:electric|data|gas|liquid|mechanical|torque)(?:[_./-]|$)/i;
const DIAGNOSTIC_RGB = [180, 195, 206];
export function isConnectionInterfacePart(partName = '', source = '') {
  return INTERFACE_PART.test(String(partName)) || INTERFACE_SOURCE.test(String(source));
}

export function connectionInterfaceVertexColors(colors, partName = '', source = '') {
  if (!(colors instanceof Uint8Array) || colors.length % 4) return colors;
  // Interface parts carry the game's complete packed palette. Preserve every
  // channel on these parts; masking them to a short whitelist loses gas,
  // liquid and torque variants whose exact shades differ by Mesh.
  if (isConnectionInterfacePart(partName, source)) return colors;
  const masked = new Uint8Array(colors.length);
  for (let offset = 0; offset < colors.length; offset += 4) {
    masked.set([...DIAGNOSTIC_RGB, 255], offset);
  }
  return masked;
}
