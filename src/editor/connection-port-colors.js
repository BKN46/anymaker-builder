// Interface colors observed in the published native Mesh parts
// (interface_electric, interface_data, interface_gas, interface_liquid and
// interface_mechanical_*). These are separate from LINK_COLORS, which
// describe the editor's routed connection diagnostics. Keeping the two
// palettes separate preserves port identity when the active tool changes.
export const NATIVE_PORT_COLORS = Object.freeze({
  electric: '#ff3131',
  mechanicalInput: '#1e9999',
  mechanicalOutput: '#ffcc31',
  liquid: '#990000',
  gas: '#cc9900',
  belt: '#98a2b3',
  data: '#1860ff',
  hydraulic: '#64748b', // Editor diagnostic color; not a native Mesh claim.
  fallback: '#f1c232',
});

function mechanicalRole(portDefinition = {}, definition = null) {
  const type = typeof portDefinition.type === 'string' ? portDefinition.type : '';
  if (type === 'mechanical_in') return 'input';
  if (type === 'mechanical_out') return 'output';
  if (portDefinition.gender === 2) return 'input';
  if (portDefinition.gender === 1) return 'output';
  const surfaces = Array.isArray(definition?.surfaces) ? definition.surfaces : [];
  const direction = portDefinition.direction ?? portDefinition.dir;
  const surface = surfaces.find(candidate => {
    if (!['mechanical', 'torque'].includes(candidate?.type)) return false;
    const candidateDirection = candidate.direction ?? candidate.dir;
    return direction === undefined || candidateDirection === undefined || candidateDirection === direction;
  });
  if (surface?.gender === 2) return 'input';
  if (surface?.gender === 1) return 'output';
  return null;
}

// `gender` is the native surface field used by the mechanical interface
// definitions; logic-node types provide the same role when a surface is not
// present on the definition.
export function nativeConnectionPortColor(kind, portDefinition = {}, definition = null) {
  if (kind === 'mechanical') {
    const role = mechanicalRole(portDefinition, definition);
    if (role === 'input') return NATIVE_PORT_COLORS.mechanicalInput;
    if (role === 'output') return NATIVE_PORT_COLORS.mechanicalOutput;
  }
  return NATIVE_PORT_COLORS[kind] || NATIVE_PORT_COLORS.fallback;
}

export function nativeMechanicalPortRole(portDefinition = {}, definition = null) {
  return mechanicalRole(portDefinition, definition);
}
