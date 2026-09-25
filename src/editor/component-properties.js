// Properties exposed by Anymaker's vehicle-editor Properties Tool are stored
// on a component record, separately from its transform and palette slots.
// Keep this module DOM- and Three.js-free so import, history and export share
// one conservative validation boundary.

const blockedKeys = new Set([
  'id', 'def', 'pos', 'rot', 'colors', 'ext',
  'connected_vehicle', 'connected_component',
]);
const keyPattern = /^[A-Za-z][A-Za-z0-9_]{0,79}$/;
const own = (value, key) => Object.hasOwn(value, key);

function validateValue(value, depth = 0) {
  if (value === null || typeof value === 'boolean') return value;
  if (typeof value === 'number') {
    if (!Number.isFinite(value) || Math.abs(value) > 1e9) throw new Error('Invalid native component property number');
    return value;
  }
  if (typeof value === 'string') {
    if (value.length > 65536) throw new Error('Native component property text is too long');
    return value;
  }
  if (depth >= 5 || !value || typeof value !== 'object') throw new Error('Invalid native component property value');
  if (Array.isArray(value)) {
    if (value.length > 256) throw new Error('Native component property array is too large');
    return value.map(item => validateValue(item, depth + 1));
  }
  const keys = Object.keys(value);
  if (keys.length > 128 || keys.some(key => !keyPattern.test(key))) throw new Error('Invalid native component property object');
  return Object.fromEntries(keys.map(key => [key, validateValue(value[key], depth + 1)]));
}

export function validateNativeProperties(input) {
  if (input === undefined) return undefined;
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw new Error('Invalid native component properties');
  const keys = Object.keys(input);
  if (keys.length > 64 || keys.some(key => !keyPattern.test(key) || blockedKeys.has(key))) throw new Error('Invalid native component property name');
  return Object.fromEntries(keys.map(key => [key, validateValue(input[key])]));
}

// The native state includes both editor properties and simulation state. We
// retain safe values so a paired import remains inspectable, but do not carry
// relationship references into an editor component-property record.
export function nativePropertiesFromState(state) {
  if (!state || typeof state !== 'object' || Array.isArray(state)) return undefined;
  const properties = {};
  for (const [key, value] of Object.entries(state)) {
    if (blockedKeys.has(key) || !keyPattern.test(key)) continue;
    // Simulation snapshots can contain opaque state blobs that are not safe to
    // put into a portable editor document. Keep every independently valid
    // value instead of rejecting the entire component because of one blob.
    try { properties[key] = validateValue(value); } catch { /* retained by the raw native model only */ }
  }
  return Object.keys(properties).length ? validateNativeProperties(properties) : undefined;
}

const descriptor = (key, type, options = {}) => ({ key, type, ...options });
const integer = (key, options) => descriptor(key, 'integer', { step: 1, ...options });
const number = (key, options) => descriptor(key, 'number', { step: .01, ...options });
const forTypes = (types, descriptors) => Object.fromEntries(types.map(type => [type, descriptors]));

// These fields are cross-checked against the game's Properties Tool labels,
// component descriptions, and the native component records used by shipped
// vehicle/building samples. Values are native save keys, not UI-only state.
const known = {
  gear_stick: [integer('gear_count', { min: 2, max: 10, defaultValue: 2 })],
  turnable_knob_a: [integer('count', { min: 2, max: 12, defaultValue: 2 })],
  turnable_knob_b: [integer('count', { min: 2, max: 12, defaultValue: 2 })],
  turnable_knob_c: [integer('count', { min: 2, max: 12, defaultValue: 2 })],
  turnable_knob_d: [integer('count', { min: 2, max: 12, defaultValue: 2 })],
  turnable_knob_e: [integer('count', { min: 2, max: 12, defaultValue: 2 })],
  mechanical_junction_offset: [number('offset', { min: -1, max: 1, defaultValue: 0 })],
  mechanical_junction_scale: [number('scale', { min: -1, max: 1, defaultValue: 1 })],
  hinge_pin: [number('min', { min: 0, max: Math.PI, step: .01, defaultValue: 0 }), number('max', { min: 0, max: Math.PI, step: .01, defaultValue: Math.PI })],
  ...forTypes(['round_headlight_a', 'round_headlight_b', 'round_headlight_c', 'square_headlight'], [
    number('tilt_x', { min: -Math.PI, max: Math.PI, step: .01, defaultValue: 0 }),
    number('tilt_y', { min: -Math.PI, max: Math.PI, step: .01, defaultValue: 0 }),
    number('fov', { min: .01, max: Math.PI, step: .01, defaultValue: .3 }),
  ]),
  differential_gearbox_a: [integer('input', { min: 1, max: 8, defaultValue: 1 }), integer('output', { min: 1, max: 8, defaultValue: 1 })],
  differential_gearbox_b: [integer('input', { min: 1, max: 8, defaultValue: 1 }), integer('output', { min: 1, max: 8, defaultValue: 1 })],
  gearbox_fixed_ratio: [integer('input', { min: 1, max: 8, defaultValue: 1 }), integer('output', { min: 1, max: 8, defaultValue: 1 }), descriptor('reverse', 'boolean', { defaultValue: false })],
  jet_accessory_gearbox_a: [integer('gear_ratio', { min: 1, max: 128, defaultValue: 1 })],
  jet_nosecone_gearbox: [integer('gear_ratio', { min: 1, max: 128, defaultValue: 1 })],
  ...forTypes(['hydraulic_pump', 'liquid_pump', 'gas_pump'], [descriptor('is_reverse', 'boolean', { defaultValue: false, label: 'reverse' }), number('flow_factor', { min: 0, max: 1, defaultValue: 1 })]),
  pulley_wheel: [descriptor('reverse', 'boolean', { defaultValue: false })],
  electric_motor_a: [descriptor('reverse', 'boolean', { defaultValue: false }), number('power', { min: 0, max: 1, defaultValue: 1 })],
  electric_motor_b: [descriptor('reverse', 'boolean', { defaultValue: false }), number('power', { min: 0, max: 1, defaultValue: 1 })],
  electric_motor_c: [descriptor('reverse', 'boolean', { defaultValue: false }), number('power', { min: 0, max: 1, defaultValue: 1 })],
  handbrake: [integer('input', { min: 0, max: 255, defaultValue: 0 })],
  klaxon: [integer('sound_effect', { min: 0, max: 255, defaultValue: 0 })],
  horn_speaker: [integer('sound_effect', { min: 0, max: 255, defaultValue: 0 })],
  speaker_a: [integer('audio_radius', { min: 8, max: 64, defaultValue: 8 })],
  speaker_b: [integer('audio_radius', { min: 8, max: 64, defaultValue: 8 })],
  speaker_c: [integer('audio_radius', { min: 8, max: 64, defaultValue: 8 })],
  steering_wheel: [number('sensitivity_steering', { min: 0, max: 1, defaultValue: .5 }), number('sensitivity_pedal_l', { min: 0, max: 1, defaultValue: .5 }), number('sensitivity_pedal_r', { min: 0, max: 1, defaultValue: .5 })],
  ...forTypes(['throttle_collective', 'throttle', 'multi_throttle', 'trim_throttle', 'fighter_jet_throttle'], [descriptor('sticky', 'boolean', { defaultValue: false })]),
  ...forTypes(['flight_yoke', 'flight_stick', 'flight_stick_jet'], [number('sensitivity_yaw', { min: 0, max: 1, defaultValue: .5 }), number('sensitivity_pitch', { min: 0, max: 1, defaultValue: .5 }), number('sensitivity_roll', { min: 0, max: 1, defaultValue: .5 })]),
  ...forTypes(['bench_seat', 'high_back_car_seat', 'low_back_car_seat', 'flight_seat'], [integer('seat_pose', { min: 0, max: 255, defaultValue: 0 })]),
  ...forTypes(['circular_dial_a', 'circular_dial_small_a', 'circular_dial_b', 'circular_dial_small_b', 'circular_dial_small_c', 'circular_dial_small_d', 'circular_dial_c', 'circular_dial_d', 'circular_dial_e', 'circular_dial_f', 'circular_dial_g', 'circular_dial_h'], [descriptor('light_activation', 'boolean', { defaultValue: false })]),
  ...forTypes(['roller_wheel_suspension_a', 'roller_wheel_suspension_b', 'roller_wheel_suspension_c', 'roller_wheel_suspension_d', 'roller_wheel_suspension_e', 'roller_wheel_suspension_f'], [number('stiffness', { min: 0, defaultValue: 1 }), number('damping', { min: 0, defaultValue: 1 })]),
  pintle_mount: [number('traverse_limit_left', { min: -Math.PI / 2, max: 0, step: .01, defaultValue: -Math.PI / 2 }), number('traverse_limit_right', { min: 0, max: Math.PI / 2, step: .01, defaultValue: Math.PI / 2 }), number('elevation_limit_down', { min: -Math.PI / 4, max: 0, step: .01, defaultValue: -Math.PI / 4 }), number('elevation_limit_up', { min: 0, max: Math.PI / 4, step: .01, defaultValue: Math.PI / 4 })],
};

function inferredDescriptor(key, value) {
  if (typeof value === 'boolean') return descriptor(key, 'boolean');
  if (typeof value === 'string') return descriptor(key, 'string');
  if (typeof value === 'number') return Number.isInteger(value) ? integer(key, { min: -1e9, max: 1e9 }) : number(key, { min: -1e9, max: 1e9 });
  return descriptor(key, 'readonly');
}

function knownDescriptors(type, nativeExtension) {
  if (type !== 'gearbox') return [...(known[type] || [])];
  // Gearboxes stretch from two to eight gears. Native `ext.z` stores the
  // number of extra gear sections, so the properties shown in the editor
  // follow the placed component instead of always exposing eight ratios.
  const count = Math.max(2, Math.min(8, (Number.isInteger(nativeExtension?.[2]) ? nativeExtension[2] : 0) + 2));
  return [
    ...Array.from({ length: count }, (_, index) => number(`gear_ratio_${index + 1}`, { min: .0625, max: 16, step: .0625, defaultValue: index === 0 ? 1 : 2 ** index })),
    descriptor('reverse', 'boolean', { defaultValue: false }),
  ];
}

export function componentPropertyDescriptors(type, properties = {}, nativeExtension = undefined) {
  const result = knownDescriptors(type, nativeExtension);
  const existing = new Set(result.map(item => item.key));
  // The base component Properties Tool exposes an optional alias. It is shown
  // for a newly placed component too, but no field is emitted until the user
  // actually changes it.
  if (!existing.has('user_defined_alias')) {
    result.unshift(descriptor('user_defined_alias', 'string', { maxLength: 200, defaultValue: '' }));
    existing.add('user_defined_alias');
  }
  for (const [key, value] of Object.entries(properties)) {
    if (existing.has(key)) continue;
    result.push(inferredDescriptor(key, value));
  }
  return result;
}

export function updateNativeProperty(properties, descriptorValue, value) {
  const result = validateNativeProperties(properties || {}) || {};
  const { key, type, min = -1e9, max = 1e9, maxLength = 65536 } = descriptorValue;
  if (type === 'readonly') throw new Error('This native component property is read-only');
  if (type === 'boolean') result[key] = value === true;
  else if (type === 'string') {
    if (typeof value !== 'string' || value.length > maxLength) throw new Error('Invalid component property text');
    result[key] = value;
  } else {
    if (!Number.isFinite(value) || value < min || value > max || (type === 'integer' && !Number.isInteger(value))) throw new Error('Component property is outside the supported range');
    result[key] = value;
  }
  return validateNativeProperties(result);
}
