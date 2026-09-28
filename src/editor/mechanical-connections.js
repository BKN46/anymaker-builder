// Physical component mates are distinct from native logic/network links.
// Editor placement can discover mates, but native post_load restores explicit
// connected_vehicle/component references. Keep them separate from *_links.
import { CELL_SIZE_WORLD } from './grid.js';
import { MECHANICAL_MATE_PROFILES } from './mechanical-mate-profiles.js';
import { componentFrame, frameVector, IDENTITY_ROTATION, multiplyRotations, transposeRotation, transformVector, subtractVectors, dotVectors } from './component-frame.js';

const AXES = ['x', 'y', 'z'];
const TYPES = new Set(['hinge', 'latch', 'mounting', 'rail', 'rail_ballscrew', 'tow']);

export function mechanicalMateError(code, message, components) {
  return Object.assign(new Error(message + ': ' + components), { mechanicalMateCode: code, components });
}

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
    if (connection.orientationIndices !== undefined && (!Array.isArray(connection.orientationIndices) || connection.orientationIndices.length !== 2 || connection.orientationIndices.some(value => !Number.isInteger(value) || value < 0 || value > 31))) throw new Error(`Mechanical connection ${connection.id} has invalid orientation indices`);
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
      ...(connection.orientationIndices ? { orientationIndices: [...connection.orientationIndices] } : {}),
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

export function mechanicalComponentDefinition(component, definitions = new Map()) {
  return component.definitionOverride || definitions.get(component.type) || MECHANICAL_MATE_PROFILES[component.type];
}

const EPSILON = CELL_SIZE_WORLD * 1e-5;
const samePoint = (a, b) => Math.hypot(...subtractVectors(a, b)) <= EPSILON;
const sameRotation = (a, b) => a.every((value, index) => Math.abs(value - b[index]) < 1e-5);
const direction = value => [[-1, 0, 0], [1, 0, 0], [0, -1, 0], [0, 1, 0], [0, 0, -1], [0, 0, 1]][value ?? 0];
const finiteArray = (value, length) => Array.isArray(value) && value.length === length && value.every(Number.isFinite);
function validMateDefinition(definition) {
  if (definition.constraint_position !== undefined && !finiteArray(definition.constraint_position, 3)) return false;
  if (definition.center_stretch !== undefined && !finiteArray(definition.center_stretch, 3)) return false;
  if (!direction(definition.hinge_direction) || !direction(definition.tow_hitch_dir)) return false;
  if (definition.tow_hitch_dot_min !== undefined && (!Number.isFinite(definition.tow_hitch_dot_min) || Math.abs(definition.tow_hitch_dot_min) > 1)) return false;
  const rotations = definition.constraint_orientations;
  return rotations === undefined || (Array.isArray(rotations) && rotations.length <= 32 && rotations.every(matrix => finiteArray(matrix, 9) && sameRotation(multiplyRotations(matrix, transposeRotation(matrix)), IDENTITY_ROTATION)));
}
const orientations = definition => definition.constraint_orientations?.length
  ? definition.constraint_orientations.map(transposeRotation) : [IDENTITY_ROTATION];

function matchingOrientations(a, b, rule) {
  if (rule.type === 'tow') {
    // vehicle_component_definition.parse_json defaults: +Y and dot_min = 0.
    // tow_bar.tick_multibody compares each side's own axis and both limits.
    const leftAxis = transformVector(a.frame.basis, direction(a.definition.tow_hitch_dir ?? 3));
    const rightAxis = transformVector(b.frame.basis, direction(b.definition.tow_hitch_dir ?? 3));
    const minimum = Math.max(a.definition.tow_hitch_dot_min ?? 0, b.definition.tow_hitch_dot_min ?? 0);
    return dotVectors(leftAxis, rightAxis) >= minimum - 1e-5 ? [0, 0] : null;
  }
  const left = orientations(a.definition); const right = orientations(b.definition);
  for (let i = 0; i < left.length; i++) for (let j = 0; j < right.length; j++) {
    // client_scene.vehicle_component.can_connect_multibody: Rb = Ra * Ca * Cb.
    const expected = multiplyRotations(multiplyRotations(a.frame.basis, left[i]), right[j]);
    if (sameRotation(expected, b.frame.basis)) return [i, j];
  }
  return null;
}

// Derived data: rebuilding removes stale mates after moves, deletions and
// copies. Hidden objects still participate; visibility is not construction.
export function detectMechanicalConnections(objects, definitions = new Map()) {
  const entries = new Map(); const diagnostics = [];
  for (const object of objects) {
    if (!Object.hasOwn(MECHANICAL_MATE_PROFILES, object.type)) continue;
    const definition = { ...MECHANICAL_MATE_PROFILES[object.type], ...mechanicalComponentDefinition(object, definitions) };
    if (!validMateDefinition(definition)) {
      diagnostics.push({ code: 'invalid-mate-definition', components: [object.id] });
      continue;
    }
    const frame = componentFrame(object);
    if (!entries.has(object.type)) entries.set(object.type, []);
    entries.get(object.type).push({ object, definition, frame });
  }
  const candidates = [];
  for (const rule of NATIVE_MECHANICAL_MATE_RULES) {
    for (const a of entries.get(rule.a) || []) for (const b of entries.get(rule.b) || []) {
      const aAnchor = a.frame.point(a.definition.constraint_position || rule.anchors[rule.a]);
      const bAnchor = b.frame.point(b.definition.constraint_position || rule.anchors[rule.b]);
      const rail = rule.type === 'rail' || rule.type === 'rail_ballscrew';
      if (rail) {
        const local = a.frame.local(bAnchor);
        const anchor = a.definition.constraint_position || rule.anchors[rule.a];
        const travel = (a.object.nativeExtension?.[2] ?? 0) + (a.definition.center_stretch?.[2] ?? 0);
        if (Math.abs(local[0] - anchor[0]) > 1e-5 || Math.abs(local[1] - anchor[1]) > 1e-5 || local[2] < anchor[2] - 1e-5 || local[2] > anchor[2] + travel + 1e-5) continue;
      } else if (!samePoint(aAnchor, bAnchor)) continue;
      if ([...a.frame.scale, ...b.frame.scale].some(value => Math.abs(value - 1) > 1e-8)) {
        diagnostics.push({ code: 'scaled-mate', components: [a.object.id, b.object.id] });
        continue;
      }
      const orientationIndices = matchingOrientations(a, b, rule);
      if (!orientationIndices) continue;
      const axis = rail || rule.type === 'hinge' || rule.type === 'tow'
        ? transformVector(a.frame.basis, rail ? [0, 0, 1] : direction(rule.type === 'tow' ? a.definition.tow_hitch_dir ?? 3 : a.definition.hinge_direction)) : null;
      candidates.push({
        id: nativeMechanicalConnectionId(a.object.id, b.object.id, rule.type),
        type: rule.type, from: a.object.id, to: b.object.id,
        position: frameVector(rail ? bAnchor : aAnchor), ...(axis ? { axis: frameVector(axis) } : {}),
        ...(rule.limits ? { limits: { ...rule.limits } } : {}),
        ...(rule.type === 'mounting' ? { orientationIndices } : {}), nativeProjected: true,
      });
    }
  }
  // A pin/knuckle has one physical mate. Rails own a list of sliders, each of
  // which still has a single rail. Do not choose arbitrarily among overlaps.
  const sockets = new Map();
  for (const connection of candidates) for (const id of [connection.from, connection.to]) {
    if (id === connection.from && ['rail', 'rail_ballscrew'].includes(connection.type)) continue;
    sockets.set(id, (sockets.get(id) || 0) + 1);
  }
  const connections = candidates.filter(connection => {
    if ([connection.from, connection.to].some(id => sockets.get(id) > 1)) {
      diagnostics.push({ code: 'ambiguous-mate', components: [connection.from, connection.to] });
      return false;
    }
    return true;
  });
  return { connections: validateMechanicalConnections(connections, new Set(objects.map(object => object.id))), diagnostics };
}

export function reconcileMechanicalConnections(topology = {}, objects = [], definitions = new Map()) {
  const { connections } = detectMechanicalConnections(objects, definitions);
  return { ...topology, ...(connections.length || topology.mechanicalConnections !== undefined ? { mechanicalConnections: connections } : {}) };
}
