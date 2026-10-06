export const userTwoPlaneCode = 'AMB1.H4sIAAAAAAAACs2X326bMBTG3-Xs1iDAhmZcbleVpu0BJjQZ46ReACNDm9Eo7z4ZCHJTQ-lAWrnyH_H7zvHxZ8wZ9lIVtIEYaNkW9MiVc-KpUyn5m7MGEDxxVQtZQuwjGEa_04KbLzzxB8FyDghkqudriH8mCBpZyVweWojPUMqM6-EziAziruv4gKCStWg6_Bn-QOx4rrdD0ELsIXiG2HPJ7oLgoER2r9_TDceHCzI5gYXjuzvyXg6e4wQuDpajiBUV9Km9gxNal4j0nB64FBVZUX7Ur5IbkeUo3ymEUlK9XT9nWQGneTd1XMbDC3hjPZchyRzyRV2X8cK5Jbyt7zJkNIe8rfMkMkHAs4PpVd3tvEpN46am-5jMpYIYPmXdAwhq8cy7I2My5g4bmNjAxOI1WGxisYkla7DExBITG67BhiY2NLHRGmxkYiMT66_BGuanlgMhtZj637eHRSuwaOENtLBFC1u0yAZaxKJFLFrhBlqhRSu0aEUbaEUWrcii5W-gdTfp8S12w27yvNsi9s-Tx94WrvG9yQPFtqFYyO4YmcUnCKqcNuZXoet3K6PB95meerWRbzWHgBLdUgXNf-z3NW_0Z8kjr2URNG2lL5onUWbypCN8VHvK-DdRiOZLW9G6hrhRj3zI5tdeybJ5kVM_nlJ2NIbH5eqTCCxJhNdoydi4pvHBoseW6K9jphU-dBJkwT4aK4H_f_QJglyUx-FHp-DsgZaC0fyrLEvO9NWrmxouWIZtRkdd_gKyqz0Aeg0AAA';

export function twoPlaneFixture({ type = 'window', points = [[0, 0, -6], [8, 4, -6], [8, 4, 6], [0, 0, 6], [-8, 4, 6], [-8, 4, -6]] } = {}) {
  const nodes = points.map(([x, y, z], i) => ({ id: 'n' + i, gridId: 'grid-1', position: { x: x * .08, y: y * .08, z: z * .08 } }));
  const edges = nodes.map((node, i) => ({ id: 'e' + i, a: node.id, b: nodes[(i + 1) % nodes.length].id, gridId: 'grid-1', size: 1 }));
  const plates = [[0, 1, 2, 3], [3, 4, 5, 0]].map((indices, i) => ({ id: 'p' + i, nodeIds: indices.map(index => nodes[index].id), gridId: 'grid-1', normalOffset: .04, surfaceLimitBypass: true, color_front: '#c5c7c4', color_back: '#c5c7c4', ...(type === 'window' ? { type } : {}) }));
  return { format: 'anymaker-web-project', version: 1, projectName: 'two-plane', objects: [], grids: [{ id: 'grid-1' }], topology: { nodes, edges, plates, links: [] } };
}

export function twoPlaneBoundaryFixture(options = {}) {
  const fixture = twoPlaneFixture(options);
  fixture.topology.plates = [{ ...fixture.topology.plates[0], nodeIds: fixture.topology.nodes.map(node => node.id) }];
  return fixture;
}
