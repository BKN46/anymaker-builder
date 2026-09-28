export const TYPE_VISIBILITY_KINDS = ['component', 'structure', 'node', 'edge', 'plate', 'link'];

export function normalizeHiddenKinds(value) {
  return Object.fromEntries(TYPE_VISIBILITY_KINDS.map(kind => [kind, value?.[kind] === true]));
}

// Display filters never change authored hidden flags or selection filters.
// Belts and tracks are rendered derivatives of the connection records.
export function isKindVisible(kind, hiddenKinds) {
  const type = kind === 'belt' || kind === 'track' ? 'link' : kind;
  return hiddenKinds[type] !== true && !(hiddenKinds.structure && ['node', 'edge', 'plate'].includes(type));
}
