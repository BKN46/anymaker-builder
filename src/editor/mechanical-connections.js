// Physical component mates are distinct from native logic/network links.
// The game discovers these pairs from component definitions and their
// constraint frames, so keep the editor representation explicit as well.

const AXES = ['x', 'y', 'z'];
const TYPES = new Set(['hinge', 'latch', 'mounting', 'rail', 'rail_ballscrew', 'tow']);

const finiteVector = value => value && AXES.every(axis => typeof value[axis] === 'number' && Number.isFinite(value[axis]));
const normalizeVector = value => Object.fromEntries(AXES.map(axis => [axis, Number(value[axis])]));

// These pairs mirror the *_definition_id_other fields in the published
// component definitions. The local anchors are the definition's
// constraint_position where one exists; components without that field mate at
// their origin. A rule may list several valid mates for one definition (the
// latch pin and handle both fit a latch knuckle).
export const NATIVE_MECHANICAL_MATE_RULES = Object.freeze([
  { type: 'hinge', a: 'hinge_pin', b: 'hinge_knuckle', anchors: { hinge_pin: [0, 0, 0], hinge_knuckle: [0, 0, -1] }, limits: { min: 0, max: Math.PI } },
  { type: 'latch', a: 'latch_pin', b: 'latch_knuckle', anchors: { latch_pin: [0, 0, 1], latch_knuckle: [0, 0, 0] } },
  { type: 'latch', a: 'latch_handle', b: 'latch_knuckle', anchors: { latch_handle: [0, 0, 1], latch_knuckle: [0, 0, 0] } },
  { type: 'mounting', a: 'mounting_pin', b: 'mounting_knuckle', anchors: { mounting_pin: [0, 0, 0], mounting_knuckle: [0, 0, 0] } },
  { type: 'rail', a: 'rail', b: 'rail_slider', anchors: { rail: [0, 0, 0], rail_slider: [0, 0, 0] } },
  { type: 'rail_ballscrew', a: 'rail_ballscrew', b: 'rail_ballscrew_slider', anchors: { rail_ballscrew: [0, 0, 0], rail_ballscrew_slider: [0, 0, 0] } },
  { type: 'tow', a: 'tow_bar', b: 'tow_hitch', anchors: { tow_bar: [0, 0, 0], tow_hitch: [0, 0, 0] } },
  { type: 'tow', a: 'truck_hitch_kingpin', b: 'truck_hitch', anchors: { truck_hitch_kingpin: [0, 1, 0], truck_hitch: [0, 1, 0] } },
]);

function validComponentEndpoint(value, componentIds) {
  return typeof value === 'string' && value.length > 0 && (!componentIds || componentIds.has(value));
}

export function validateMechanicalConnections(connections = [], componentIds = null) {
  if (!Array.isArray(connections)) throw new Error('Mechanical connections must be an array');
  const ids = new Set();
  return connections.map((connection, index) => {
    if (!connection || typeof connection.id !== 'string' || !connection.id || ids.has(connection.id)) throw new Error(`Mechanical connection ID is invalid or duplicated: ${index}`);
    if (!TYPES.has(connection.type)) throw new Error(`Unsupported mechanical connection type: ${String(connection.type)}`);
    if (!validComponentEndpoint(connection.from, componentIds) || !validComponentEndpoint(connection.to, componentIds) || connection.from === connection.to) throw new Error(`Mechanical connection ${connection.id} references an invalid component`);
    if (!finiteVector(connection.position)) throw new Error(`Mechanical connection ${connection.id} has an invalid position`);
    if (AXES.some(axis => Math.abs(connection.position[axis]) > 10000)) throw new Error(`Mechanical connection ${connection.id} position is out of range`);
    if (connection.nativeProjected !== undefined && connection.nativeProjected !== true) throw new Error(`Mechanical connection ${connection.id} has an invalid projection marker`);
    if (connection.limits !== undefined && (!connection.limits || !Number.isFinite(connection.limits.min) || !Number.isFinite(connection.limits.max) || connection.limits.min > connection.limits.max)) throw new Error(`Mechanical connection ${connection.id} has invalid limits`);
    if (connection.axis !== undefined && !finiteVector(connection.axis)) throw new Error(`Mechanical connection ${connection.id} has an invalid axis`);
    ids.add(connection.id);
    return {
      id: connection.id,
      type: connection.type,
      from: connection.from,
      to: connection.to,
      position: normalizeVector(connection.position),
      ...(connection.axis ? { axis: normalizeVector(connection.axis) } : {}),
      ...(connection.limits ? { limits: { min: Number(connection.limits.min), max: Number(connection.limits.max) } } : {}),
      ...(connection.nativeProjected ? { nativeProjected: true } : {}),
    };
  });
}

export function mechanicalMateRule(typeA, typeB) {
  return NATIVE_MECHANICAL_MATE_RULES.find(rule => (rule.a === typeA && rule.b === typeB) || (rule.a === typeB && rule.b === typeA)) || null;
}

export function nativeMechanicalConnectionId(from, to, type) {
  const [a, b] = [from, to].sort();
  return `native-${type}-${a}--${b}`;
}

export function createNativeMechanicalConnection({ id, type, from, to, position, axis, limits }) {
  return validateMechanicalConnections([{ id, type, from, to, position, ...(axis ? { axis } : {}), ...(limits ? { limits } : {}), nativeProjected: true }])[0];
}
