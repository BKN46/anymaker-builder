// Synthetic layouts using real catalog wheel types; not game acceptance fixtures.
export function beltFixture(types = ['pulley_wheel', 'engine_wheel'], centers = [[-.48, 0], [.48, 0]]) {
  const objects = centers.map(([x, y], i) => ({
    id: 'belt-wheel-' + i, type: types[i % types.length], gridId: 'main',
    position: { x, y, z: 0 }, rotation: { x: 0, y: 0, z: 0 }, scale: { x: 1, y: 1, z: 1 },
  }));
  const links = Array.from({ length: objects.length === 2 ? 1 : objects.length }, (_, i) => ({
    id: 'belt-link-' + i, kind: 'belt', from: { componentId: objects[i].id, port: 0 },
    to: { componentId: objects[(i + 1) % objects.length].id, port: 0 }, points: [],
  }));
  return { format: 'anymaker-web-project', version: 1, objects, topology: { nodes: [], edges: [], plates: [], links } };
}

// A read-only extraction of the real sample's six-wheel drive. Preserve wheel
// poses, properties, definition indices and belt links exactly as saved.
export function sampleBeltData(source) {
  const data = structuredClone(source);
  const vehicle = data.vehicles.vehicles.find(value => value.id === 553);
  const ids = new Set(vehicle.belt_links.flatMap(link => [link.p0.comp, link.p1.comp]));
  vehicle.grids = vehicle.grids.map(grid => ({ ...grid, components: grid.components.filter(component => ids.has(component.id)) })).filter(grid => grid.components.length);
  for (const key of ['nodes', 'edges', 'plates', 'plate_paint', 'electric_links', 'mechanical_links', 'liquid_links', 'gas_links', 'data_links', 'loot_locations', 'creature_locations', 'buoyancy_fill']) delete vehicle[key];
  data.vehicles.vehicles = [vehicle];
  return data;
}
