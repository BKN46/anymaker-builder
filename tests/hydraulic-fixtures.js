// Minimal construction poses for the three published cylinder sizes.
export function hydraulicFixture(suffix = '') {
  const component = (id, type, y) => ({ id, type, gridId: 'main', position: { x: 0, y, z: 0 }, rotation: { x: 0, y: 0, z: 0 }, scale: { x: 1, y: 1, z: 1 } });
  const base = component('base', 'hydraulic_cylinder_connector_base' + suffix, 0);
  const rod = component('rod', 'hydraulic_cylinder_connector' + suffix, 1.6);
  const link = { id: 'hydraulic-link-1', kind: 'hydraulic', from: { componentId: base.id, port: 2 }, to: { componentId: rod.id, port: 0 }, points: [], lengthMax: suffix === '_2_2' ? 19 : suffix === '_3_3' ? 18 : 20, extensionFactor: 1 };
  return { format: 'anymaker-web-project', version: 1, objects: [base, rod], topology: { nodes: [], edges: [], plates: [], links: [link] } };
}
