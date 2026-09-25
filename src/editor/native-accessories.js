// Native vehicle components can carry an installed inventory item in
// `element.acc.item`.  The item is not a `grids[].components[]` record, but
// it has independent identity and must not be merged into the host mesh.
// Keep this representation DOM- and Three.js-free so import and export use
// the same conservative boundary.

const keyPattern = /^_?[A-Za-z][A-Za-z0-9_]{0,79}$/;

function cloneItem(value, depth = 0) {
  if (depth > 6) throw new Error('Native accessory item is too deeply nested');
  if (value === null || typeof value === 'boolean' || typeof value === 'string') return value;
  if (typeof value === 'number') {
    if (!Number.isFinite(value) || Math.abs(value) > 1e9) throw new Error('Native accessory item has an invalid number');
    return value;
  }
  if (!value || typeof value !== 'object') throw new Error('Native accessory item is invalid');
  if (Array.isArray(value)) {
    if (value.length > 128) throw new Error('Native accessory item array is too large');
    return value.map(item => cloneItem(item, depth + 1));
  }
  if (Object.getPrototypeOf(value) !== Object.prototype && Object.getPrototypeOf(value) !== null) throw new Error('Native accessory item is invalid');
  const entries = Object.entries(value);
  if (entries.length > 64 || entries.some(([key]) => !keyPattern.test(key))) throw new Error('Native accessory item has an invalid field');
  return Object.fromEntries(entries.map(([key, item]) => [key, cloneItem(item, depth + 1)]));
}

export function nativeAccessoryContainerFromState(state) {
  const direct = state?.acc?.item;
  if (direct && typeof direct === 'object' && !Array.isArray(direct) && typeof direct._type === 'string' && /^[A-Za-z][A-Za-z0-9_]{0,79}$/.test(direct._type)) return 'acc';
  const nested = state?.element?.acc?.item;
  if (nested && typeof nested === 'object' && !Array.isArray(nested) && typeof nested._type === 'string' && /^[A-Za-z][A-Za-z0-9_]{0,79}$/.test(nested._type)) return 'element.acc';
  return null;
}

export function nativeAccessoryFromState(state) {
  const container = nativeAccessoryContainerFromState(state);
  const item = container === 'acc' ? state?.acc?.item : state?.element?.acc?.item;
  if (!item || typeof item !== 'object' || Array.isArray(item) || typeof item._type !== 'string' || !/^[A-Za-z][A-Za-z0-9_]{0,79}$/.test(item._type)) return null;
  return cloneItem(item);
}

export function validateNativeAccessory(value) {
  const item = nativeAccessoryFromState({ element: { acc: { item: value } } });
  if (!item) throw new Error('Native accessory attachment item is invalid');
  return item;
}

// Verified from rom/data/inventory_definitions.json: these native inventory
// items are component accessories whose descriptions say they fit `wheel`.
const wheelAccessories = {
  wheel_car: { name: 'Car Wheel', name_zh: '汽车车轮', mesh: 'meshes/components/car_wheel.mesh' },
  wheel_quadbike: { name: 'Quadbike Wheel', name_zh: '四轮摩托车车轮', mesh: 'meshes/components/quadbike_wheel.mesh' },
  wheel_van: { name: 'Van Wheel', name_zh: '货车车轮', mesh: 'meshes/components/van_wheel.mesh' },
  wheel_5_prong: { name: '5-Spoke Car Wheel', name_zh: '五爪汽车车轮', mesh: 'meshes/components/_5_prong_wheels.mesh' },
  wheel_5_prong_tread: { name: '5-Spoke Tread Wheel', name_zh: '五爪轮胎花纹', mesh: 'meshes/components/_5_prong_wheels_tread.mesh' },
  wheel_rim_20: { name: '20 in Car Wheel', name_zh: '20 英寸汽车车轮', mesh: 'meshes/components/rim_20_wheel.mesh' },
  wheel_rim_20_tread: { name: '20 in Tread Wheel', name_zh: '20 英寸轮胎花纹', mesh: 'meshes/components/rim_20_wheel_tread.mesh' },
  wheel_rim_22: { name: '22 in Car Wheel', name_zh: '22 英寸汽车车轮', mesh: 'meshes/components/rim_22_wheel.mesh' },
  wheel_rim_22_tread: { name: '22 in Tread Wheel', name_zh: '22 英寸轮胎花纹', mesh: 'meshes/components/rim_22_wheel_tread.mesh' },
  wheel_rim_24: { name: '24 in Car Wheel', name_zh: '24 英寸汽车车轮', mesh: 'meshes/components/rim_24_wheel.mesh' },
  wheel_rim_24_tread: { name: '24 in Tread Wheel', name_zh: '24 英寸轮胎花纹', mesh: 'meshes/components/rim_24_wheel_tread.mesh' },
  wheel4x4: { name: '4x4 Wheel', name_zh: '四驱车轮', mesh: 'meshes/components/_4x4_wheel.mesh' },
};
const batteryAccessories = {
  // These inventory Meshes share the battery cradle's component-local
  // origin. Their native attachment/floor transforms are for a character or
  // world item presentation, respectively, and must not be applied when the
  // item is rendered as `acc.item` on a vehicle component.
  battery_a: { name: 'Battery', name_zh: '电池', mesh: 'meshes/components/battery_a.mesh' },
  battery_b: { name: 'Battery', name_zh: '电池', mesh: 'meshes/components/battery_b.mesh' },
};
const accessories = { ...wheelAccessories, ...batteryAccessories };
const tyreRotation = [1, 0, 0, 0, 0, -1, 0, 1, 0];

export function accessoryOptionsForComponent(type) {
  if (['wheel', 'wheel_b'].includes(type)) return Object.keys(wheelAccessories);
  return batteryAccessories[type] ? [type] : [];
}

export function createNativeAccessoryItem(itemType, id) {
  if (!Number.isInteger(id) || id < 0 || id > 1e9) throw new Error('Native accessory item ID is invalid');
  if (!accessories[itemType]) throw new Error('Unsupported native accessory item type');
  return wheelAccessories[itemType] ? { _type: itemType, id, pattern: 1 } : { _type: itemType, id };
}

export function nativeAccessoryContainerForComponent(type) {
  // Current native samples use the direct component `acc.item` field for
  // wheel tyres and battery cells. Keep the older nested path only when it
  // was explicitly imported from a legacy record.
  return accessoryOptionsForComponent(type).length ? 'acc' : null;
}

// The component's wheel binding establishes the observed mounting frame;
// each inventory mesh swaps only the wheel/rim shape in that frame.
export function nativeAccessoryDefinition(itemType) {
  const wheel = wheelAccessories[itemType];
  if (wheel) {
    return {
      id: `native-accessory-${itemType}`,
      name: wheel.name,
      name_zh: wheel.name_zh,
      category: 'wheel',
      class: 'native_accessory',
      meshBinding: {
        staticMesh: null,
        dynamicMeshes: [{
          index: 0,
          path: wheel.mesh,
          position: [0, .1, .37],
          previewRotation: tyreRotation,
          addComponentTool: false,
        }],
      },
      meshes_dynamic: [{ path: wheel.mesh }],
    };
  }
  const battery = batteryAccessories[itemType];
  if (battery) {
    return {
      id: `native-accessory-${itemType}`,
      name: battery.name,
      name_zh: battery.name_zh,
      category: 'electric',
      class: 'native_accessory',
      meshBinding: {
        staticMesh: null,
        dynamicMeshes: [{ index: 0, path: battery.mesh, addComponentTool: false }],
      },
      meshes_dynamic: [{ path: battery.mesh }],
    };
  }
  return {
    id: `native-accessory-${itemType}`,
    name: itemType.replaceAll('_', ' '),
    name_zh: itemType.replaceAll('_', ' '),
    category: 'miscellaneous',
    class: 'native_accessory',
    meshBinding: { staticMesh: null, dynamicMeshes: [] },
    meshes_dynamic: [],
  };
}
