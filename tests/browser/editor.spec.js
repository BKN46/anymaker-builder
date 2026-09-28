import { test, expect } from '@playwright/test';
import { meshFixture, modelGlbFixture } from '../fixtures.js';
import { readFileSync } from 'node:fs';
import { hingeAssemblyFixture } from '../mechanical-fixtures.js';
import { parseNativePair } from '../../src/native/anymaker-data.js';
import { toEditorDocument } from '../../src/editor/model.js';
import { observeRendering, observePointerRay, renderedIdentities, renderedInterfaceSamples, projectWorldPoint, renderedPlacementState } from './render-observer.js';

test('mechanical mates update on edits and history and save reciprocal native hinge bodies', async ({ page }) => {
  await observeRendering(page);
  const errors = []; page.on('pageerror', error => errors.push(error.message));
  await page.goto('./'); await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  const document = toEditorDocument(parseNativePair(hingeAssemblyFixture(), {}));
  await page.locator('#file-input').setInputFiles({ name: 'hinge-assembly.json', mimeType: 'application/json', buffer: Buffer.from(JSON.stringify(document)) });
  await expect(page.locator('#object-count')).toHaveText('2 个组件');
  expect((await saveProject(page)).topology.mechanicalConnections).toHaveLength(1);
  await page.locator('#fit-btn').click(); await page.locator('[data-view="right"]').click();
  await openRightSidebar(page); await page.locator('#right-tab-inspector').click();
  await page.locator('#selection-filter-toggle').click();
  await page.locator('[data-selectable-kind="structure"]').uncheck();
  await page.locator('#selection-filter-toggle').click();
  const knuckle = document.objects.find(object => object.type === 'hinge_knuckle');
  const point = await projectWorldPoint(page, knuckle.position);
  await page.mouse.click(point.x, point.y);
  await expect(page.locator('#mechanical-mate-status')).toHaveText('自动机械配合：1');
  await page.locator('#language-select').selectOption('en');
  await expect(page.locator('#mechanical-mate-status')).toHaveText('Automatic mechanical mates: 1');
  const x = page.getByRole('spinbutton', { name: 'position-x', exact: true });
  const originalX = Number(await x.inputValue());
  await x.fill(String(originalX + 2)); await x.press('Enter');
  await expect(page.locator('#mechanical-mate-status')).toHaveText('Automatic mechanical mates: 0');
  expect((await saveProject(page)).topology.mechanicalConnections).toHaveLength(0);
  await page.locator('#undo-btn').click();
  expect((await saveProject(page)).topology.mechanicalConnections).toHaveLength(1);
  await page.locator('#redo-btn').click();
  expect((await saveProject(page)).topology.mechanicalConnections).toHaveLength(0);
  await page.locator('#undo-btn').click();
  const downloads = []; const onDownload = download => downloads.push(download);
  page.on('download', onDownload); await page.locator('#save-btn').click();
  await expect.poll(() => downloads.length).toBe(2); page.off('download', onDownload);
  const files = await Promise.all(downloads.map(async download => {
    const stream = await download.createReadStream(); let content = '';
    for await (const chunk of stream) content += chunk;
    return { name: download.suggestedFilename(), content: JSON.parse(content) };
  }));
  const data = files.find(file => file.name.endsWith('.data')).content;
  const bodies = data.vehicles.vehicles; expect(bodies).toHaveLength(2);
  expect(bodies.map(body => body.nodes.length)).toEqual([2, 2]);
  for (const body of bodies) {
    const component = body.grids[0].components[0];
    const mateBody = bodies.find(value => value.id === component.connected_vehicle);
    expect(mateBody.id).not.toBe(body.id);
    const mate = mateBody.grids[0].components.find(value => value.id === component.connected_component);
    expect(mate.connected_vehicle).toBe(body.id); expect(mate.connected_component).toBe(component.id);
    expect(body.mechanical_links).toHaveLength(0);
  }
  expect(errors).toEqual([]);
});

for (const projection of ['perspective', 'orthographic']) test('overlapping beams select visible nodes and split the front beam in ' + projection, async ({ page }) => {
  await observeRendering(page);
  const errors = []; page.on('pageerror', error => errors.push(error.message));
  await page.goto('./'); await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  const topology = {
    nodes: [
      { id: 'back-left', position: { x: -.64, y: 0, z: -.24 } },
      { id: 'back-right', position: { x: .64, y: 0, z: -.24 } },
      { id: 'front-start', position: { x: 0, y: 0, z: .24 } },
      { id: 'front-end', position: { x: .64, y: 0, z: .24 } },
    ],
    // The rear beam is deliberately first: insertion order must not decide
    // which beam is selected when their screen-space centre lines overlap.
    edges: [{ id: 'back', a: 'back-left', b: 'back-right' }, { id: 'front', a: 'front-start', b: 'front-end' }], plates: [], links: [],
  };
  await page.locator('#file-input').setInputFiles({ name: 'overlapping-beams.json', mimeType: 'application/json', buffer: Buffer.from(JSON.stringify({ format: 'anymaker-web-project', version: 1, objects: [], topology })) });
  await expect(page.locator('#topology-count')).toHaveText('4 节点 · 2 梁 · 0 面板');
  await page.locator('#fit-btn').click(); await page.locator('[data-view="front"]').click();
  if (projection === 'orthographic') await page.locator('[data-view="iso"]').click();
  await page.locator('[data-tool="edge"]').click();
  const start = await projectWorldPoint(page, topology.nodes[2].position);
  await page.mouse.move(start.x, start.y);
  const anchor = () => page.evaluate(() => window.__renderTestState.scene.getObjectByName('edge-placement-anchor').position.toArray());
  await expect.poll(anchor).toEqual([0, 0, .24]);
  await page.mouse.click(start.x, start.y);
  await expect(page.locator('#build-status')).toContainText(/点击(?:终点|完成)/);
  await expect(page.locator('#topology-count')).toHaveText('4 节点 · 2 梁 · 0 面板');
  await expect.poll(anchor).toEqual([0, 0, .24]);
  await page.keyboard.press('Escape');
  await page.locator('[data-tool="edge"]').click();
  await page.locator('#nodes-btn').click();
  const middle = await projectWorldPoint(page, { x: .32, y: 0, z: .24 });
  await page.mouse.move(middle.x, middle.y);
  await page.mouse.click(middle.x, middle.y);
  await expect(page.locator('#topology-count')).toHaveText('5 节点 · 3 梁 · 0 面板');
  const saved = await saveProject(page);
  expect(saved.topology.edges.find(edge => edge.id === 'back')).toMatchObject(topology.edges[0]);
  expect(saved.topology.edges.some(edge => edge.id === 'front')).toBe(false);
  const added = saved.topology.nodes.find(node => !topology.nodes.some(original => original.id === node.id));
  expect(added.position).toEqual({ x: .32, y: 0, z: .24 });
  await expect.poll(anchor).toEqual([.32, 0, .24]);
  await page.keyboard.press('Escape'); await page.locator('#undo-btn').click();
  await expect(page.locator('#topology-count')).toHaveText('4 节点 · 2 梁 · 0 面板');
  await page.locator('[data-view="back"]').click();
  await page.locator('[data-tool="edge"]').click();
  const reverse = await projectWorldPoint(page, { x: 0, y: 0, z: -.24 });
  await page.mouse.click(reverse.x, reverse.y);
  await expect(page.locator('#topology-count')).toHaveText('5 节点 · 3 梁 · 0 面板');
  const reversed = await saveProject(page);
  expect(reversed.topology.edges.find(edge => edge.id === 'front')).toMatchObject(topology.edges[1]);
  const reverseNode = reversed.topology.nodes.find(node => !topology.nodes.some(original => original.id === node.id));
  expect(reverseNode.position).toEqual({ x: 0, y: 0, z: -.24 });
  expect(errors).toEqual([]);
});

test('ordinary and Alt beam splitting respect a foreground panel', async ({ page }) => {
  await observeRendering(page);
  const errors = []; page.on('pageerror', error => errors.push(error.message));
  await page.goto('./'); await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  const topology = {
    nodes: [
      { id: 'a', position: { x: -.64, y: 0, z: 0 } }, { id: 'b', position: { x: .64, y: 0, z: 0 } },
      ...[[-.48, -.32], [.48, -.32], [.48, .32], [-.48, .32]].map(([x, y], index) => ({ id: 'p' + index, position: { x, y, z: .24 } })),
    ],
    edges: [{ id: 'beam', a: 'a', b: 'b' }], plates: [{ id: 'cover', nodeIds: ['p0', 'p1', 'p2', 'p3'], normalOffset: 0 }], links: [],
  };
  await page.locator('#file-input').setInputFiles({ name: 'covered-beam.json', mimeType: 'application/json', buffer: Buffer.from(JSON.stringify({ format: 'anymaker-web-project', version: 1, objects: [], topology })) });
  await expect(page.locator('#topology-count')).toHaveText('6 节点 · 1 梁 · 1 面板');
  await page.locator('#fit-btn').click(); await page.locator('[data-view="front"]').click();
  await page.locator('[data-tool="edge"]').click();
  let point = await projectWorldPoint(page, { x: 0, y: 0, z: 0 });
  await page.mouse.click(point.x, point.y);
  await expect(page.locator('#topology-count')).toHaveText('6 节点 · 1 梁 · 1 面板');
  await page.keyboard.press('Escape'); await page.locator('[data-tool="edge"]').click();
  await page.keyboard.down('Alt'); await page.mouse.click(point.x, point.y); await page.keyboard.up('Alt');
  await expect(page.locator('#topology-count')).toHaveText('6 节点 · 1 梁 · 1 面板');
  await page.locator('[data-view="back"]').click(); point = await projectWorldPoint(page, { x: 0, y: 0, z: 0 });
  await page.keyboard.down('Alt'); await page.mouse.click(point.x, point.y); await page.keyboard.up('Alt');
  await expect(page.locator('#topology-count')).toHaveText('7 节点 · 2 梁 · 1 面板');
  const saved = await saveProject(page);
  expect(saved.topology.nodes.find(node => !topology.nodes.some(original => original.id === node.id)).position).toEqual({ x: 0, y: 0, z: 0 });
  expect(errors).toEqual([]);
});

test('beam placement rejects a node behind a solid and reacquires it from the unobstructed view', async ({ page }) => {
  await observeRendering(page);
  const errors = []; page.on('pageerror', error => errors.push(error.message));
  await page.goto('./'); await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  const blocked = { x: -.08, y: .08, z: -.24 };
  const document = { format: 'anymaker-web-project', version: 1,
    objects: [{ id: 'wall-motor', type: 'electric_motor_b', position: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 }, scale: { x: 1, y: 1, z: 1 } }],
    topology: {
      nodes: [{ id: 'behind', position: blocked }, { id: 'beam-end', position: { x: .32, y: .08, z: -.24 } }],
      edges: [{ id: 'thick-support', a: 'behind', b: 'beam-end', size: 3 }], plates: [], links: [],
    },
  };
  await page.locator('#file-input').setInputFiles({ name: 'occluded-node.json', mimeType: 'application/json', buffer: Buffer.from(JSON.stringify(document)) });
  await expect(page.locator('#object-count')).toHaveText('1 个组件');
  await page.locator('#fit-btn').click(); await page.locator('[data-view="front"]').click();
  await page.locator('[data-tool="edge"]').click();
  let point = await projectWorldPoint(page, blocked);
  await page.mouse.move(point.x, point.y);
  const anchorPosition = () => page.evaluate(() => {
    const anchor = window.__renderTestState.scene.getObjectByName('edge-placement-anchor');
    return anchor.visible ? anchor.position.toArray() : null;
  });
  await expect.poll(async () => (await anchorPosition())?.[2]).toBeGreaterThan(.13);
  await page.locator('[data-view="back"]').click();
  point = await projectWorldPoint(page, blocked); await page.mouse.move(point.x, point.y);
  await expect.poll(anchorPosition).toEqual([blocked.x, blocked.y, blocked.z]);
  await page.mouse.click(point.x, point.y);
  await expect(page.locator('#build-status')).toContainText('点击完成');
  await page.keyboard.press('Escape');
  expect(errors).toEqual([]);
});

test('placement rotation immediately resnaps the preview and commits at the shown contact', async ({ page }) => {
  await observeRendering(page);
  const errors = []; page.on('pageerror', error => errors.push(error.message));
  await page.goto('./'); await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  const object = { id: 'support-motor', type: 'electric_motor_b', position: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 }, scale: { x: 1, y: 1, z: 1 } };
  await page.locator('#file-input').setInputFiles({ name: 'contact.json', mimeType: 'application/json', buffer: Buffer.from(JSON.stringify({ format: 'anymaker-web-project', version: 1, objects: [object] })) });
  await expect(page.locator('#object-count')).toHaveText('1 个组件');
  await page.locator('#fit-btn').click(); await page.locator('[data-view="front"]').click();
  await page.locator('#component-search').fill('drive_shaft'); await page.locator('[data-id="drive_shaft"]').click();
  const point = await projectWorldPoint(page, { x: -.08, y: .08, z: .13 });
  await page.mouse.move(point.x, point.y);
  await expect.poll(async () => (await renderedPlacementState(page))?.visible).toBe(true);
  const initial = await renderedPlacementState(page);
  expect(initial.min[2]).toBeGreaterThanOrEqual(.13 - .0008);
  // The real shaft is offset along Z. A half turn makes the long end face
  // the support and requires a different cell; a quarter turn can round to
  // the same cell, so it would not exercise immediate contact correction.
  await page.locator('#viewport').focus(); await page.keyboard.press('k'); await page.keyboard.press('k');
  await expect.poll(async () => (await renderedPlacementState(page))?.rotation[1]).toBeCloseTo(Math.PI);
  const rotated = await renderedPlacementState(page);
  expect(rotated.min[2]).toBeGreaterThanOrEqual(.13 - .0008);
  expect(rotated.position).not.toEqual(initial.position);
  await page.mouse.click(point.x, point.y);
  await expect(page.locator('#object-count')).toHaveText('2 个组件');
  const saved = await saveProject(page); const placed = saved.objects.find(object => object.type === 'drive_shaft');
  expect([placed.position.x, placed.position.y, placed.position.z]).toEqual(rotated.position);
  expect(placed.rotation.y).toBeCloseTo(Math.PI);
  await page.locator('#undo-btn').click(); await expect(page.locator('#object-count')).toHaveText('1 个组件');
  expect(errors).toEqual([]);
});

test('late placement loading stays hidden after pointer leave and uses the current position on return', async ({ page }) => {
  await observeRendering(page);
  const errors = []; page.on('pageerror', error => errors.push(error.message));
  const manifest = JSON.parse(readFileSync(new URL('../../public/assets/manifests/mesh-manifest.json', import.meta.url)));
  let release; const held = new Promise(resolve => { release = resolve; }); let requested = false;
  await page.route('**/' + manifest.entries['meshes/components/drive_shaft_a.mesh'].url, async route => { requested = true; await held; await route.continue(); });
  try {
    await page.goto('./'); await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
    await page.locator('[data-view="top"]').click();
    await page.locator('#component-search').fill('drive_shaft'); await page.locator('[data-id="drive_shaft"]').click();
    const canvas = page.locator('#viewport canvas'); const box = await canvas.boundingBox();
    await page.mouse.move(box.x + box.width * .35, box.y + box.height * .65);
    await expect.poll(() => requested).toBe(true);
    await page.mouse.move(20, 20); release();
    await expect.poll(async () => (await renderedPlacementState(page))?.visible).toBe(false);
    await expect(page.locator('#placement-indicator')).toBeHidden();
    const point = { x: box.x + box.width * .65, y: box.y + box.height * .65 };
    await page.mouse.move(point.x, point.y);
    await expect.poll(async () => (await renderedPlacementState(page))?.visible).toBe(true);
    const expected = await page.evaluate(point => {
      const { camera, renderer } = window.__renderTestState; const rect = renderer.domElement.getBoundingClientRect();
      const x = (point.x - rect.x) / rect.width * 2 - 1; const y = 1 - (point.y - rect.y) / rect.height * 2;
      const near = camera.position.clone().set(x, y, -1).unproject(camera);
      const direction = camera.position.clone().set(x, y, 1).unproject(camera).sub(near);
      return near.addScaledVector(direction, -near.y / direction.y).toArray().map(value => Math.round(value / .08) * .08);
    }, point);
    const preview = await renderedPlacementState(page);
    preview.position.forEach((value, axis) => expect(value).toBeCloseTo(expected[axis], 10));
    await page.mouse.click(point.x, point.y); await expect(page.locator('#object-count')).toHaveText('1 个组件');
    const saved = await saveProject(page);
    expect([saved.objects[0].position.x, saved.objects[0].position.y, saved.objects[0].position.z]).toEqual(preview.position);
  } finally { release(); }
  expect(errors).toEqual([]);
});

test('native interface colours are visible on real Mesh faces and survive paint, mirrors and subgrid view', async ({ page }, testInfo) => {
  await observeRendering(page);
  const errors = []; page.on('pageerror', error => errors.push(error.message));
  await page.goto('./'); await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  const types = ['electrical_interface_straight', 'data_interface_straight', 'gas_interface_straight',
    'mechanical_interface_in_straight', 'mechanical_interface_out_straight', 'air_manifold',
    'wheel', 'electric_motor_b', 'liquid_interface_straight'];
  const objects = types.map((type, i) => ({
    id: type, type, position: { x: (i % 3 - 1) * .48, y: .72 - Math.floor(i / 3) * .48, z: 0 },
    rotation: { x: 0, y: 0, z: 0 }, scale: Object.fromEntries(['x', 'y', 'z'].map(axis => [axis, i === 6 ? .5 : i === 7 ? 1.3 : 3])),
    paintColor: '#dddddd', ...(i === 1 ? { localMirrorAxes: ['x'] } : {}),
  }));
  await page.locator('#file-input').setInputFiles({ name: 'interfaces.json', mimeType: 'application/json', buffer: Buffer.from(JSON.stringify({ format: 'anymaker-web-project', version: 1, objects })) });
  await expect(page.locator('#object-count')).toHaveText('9 个组件');
  await page.locator('#fit-btn').click();
  await page.locator('[data-view="front"]').click();
  const canvas = page.locator('#viewport canvas'); const box = await canvas.boundingBox();
  await canvas.hover({ position: { x: box.width / 2, y: box.height / 2 } });
  await page.mouse.wheel(0, -450);
  await page.locator('#viewport').screenshot({ path: testInfo.outputPath('interfaces-initial.png') });
  const visible = async () => {
    const samples = await renderedInterfaceSamples(page);
    expect(samples.electrical_interface_straight.counts.red, 'electric red').toBeGreaterThan(8);
    expect(samples.data_interface_straight.counts.blue, 'data blue').toBeGreaterThan(8);
    expect(samples.gas_interface_straight.counts.yellow, 'gas yellow').toBeGreaterThan(8);
    expect(samples.mechanical_interface_in_straight.counts.teal, 'mechanical input teal').toBeGreaterThan(8);
    expect(samples.mechanical_interface_out_straight.counts.yellow, 'mechanical output yellow').toBeGreaterThan(8);
    expect(samples.air_manifold.counts.teal, 'manifold teal').toBeGreaterThan(8);
    expect(samples.electric_motor_b.counts.red).toBe(0);
    expect(samples.liquid_interface_straight.counts.red).toBe(0);
    for (const sample of Object.values(samples)) expect(sample.interfaces.every(color => color === 'ffffff')).toBe(true);
    return samples;
  };
  await expect(async () => { await visible(); }).toPass({ timeout: 5000 });
  const initial = await visible();
  for (const sample of Object.values(initial)) expect(sample.body.every(color => color === 'dddddd')).toBe(true);
  await testInfo.attach('interface-framebuffer', { body: JSON.stringify(initial, null, 2), contentType: 'application/json' });
  await page.locator('#viewport').screenshot({ path: testInfo.outputPath('interfaces-front.png') });

  // Painting a mixed Mesh must affect its body, while its real connector
  // faces remain red even when the connection marker tool is inactive.
  await page.locator('[data-tool="paint"]').click();
  await page.locator('#paint-toolbar-hex').fill('#556677');
  await page.locator('#paint-toolbar-hex').press('Tab');
  const point = await page.evaluate(() => {
    const { scene, camera, renderer } = window.__renderTestState;
    const object = scene.children.find(o => o.userData.id === 'electrical_interface_straight');
    const point = object.position.clone().add(object.position.clone().set(.075, .075, .12)).project(camera);
    const rect = renderer.domElement.getBoundingClientRect();
    return { x: rect.x + (point.x + 1) * rect.width / 2, y: rect.y + (1 - point.y) * rect.height / 2 };
  });
  await page.mouse.click(point.x, point.y);
  await page.locator('[data-tool="select"]').click();
  await expect.poll(async () => (await renderedInterfaceSamples(page)).electrical_interface_straight.body[0]).toBe('556677');
  await visible();
  await page.locator('#undo-btn').click();
  await expect.poll(async () => (await renderedInterfaceSamples(page)).electrical_interface_straight.body[0]).toBe('dddddd');
  await visible();
  await page.locator('#redo-btn').click();
  await expect.poll(async () => (await renderedInterfaceSamples(page)).electrical_interface_straight.body[0]).toBe('556677');
  await visible();

  if (await page.locator('#left-sidebar-toggle').getAttribute('aria-expanded') === 'false') await page.locator('#left-sidebar-toggle').click();
  await page.locator('#left-tab-subgrids').click();
  await page.locator('#subgrid-view-toggle').check();
  const gridView = await renderedInterfaceSamples(page);
  expect(gridView.electrical_interface_straight.body[0]).not.toBe('556677');
  for (const sample of Object.values(gridView)) expect(sample.interfaces.every(color => color === 'ffffff')).toBe(true);
  expect(gridView.data_interface_straight.counts.blue).toBeGreaterThan(8);
  expect(gridView.mechanical_interface_in_straight.counts.teal).toBeGreaterThan(8);
  await page.locator('#subgrid-view-toggle').uncheck();
  await visible();
  await page.locator('[data-tool="connect"]').click();
  await page.locator('[data-tool="select"]').click();
  await expect(page.locator('#viewport')).toHaveAttribute('data-connection-port-count', '0');
  await visible();
  await page.locator('[data-view="back"]').click();
  await expect.poll(async () => (await renderedInterfaceSamples(page)).wheel.counts.teal).toBeGreaterThan(3);
  await page.locator('#viewport').screenshot({ path: testInfo.outputPath('interfaces-back.png') });
  expect(errors).toEqual([]);
});

test('pointer drags translate and rotate smoothly with one commit and a fixed camera', async ({ page }) => {
  await observeRendering(page);
  const errors = []; page.on('pageerror', error => errors.push(error.message));
  await page.goto('./'); await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  const component = { id: 'moving-shaft', type: 'drive_shaft', position: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 }, scale: { x: 1, y: 1, z: 1 } };
  await page.locator('#file-input').setInputFiles({ name: 'drag.json', mimeType: 'application/json', buffer: Buffer.from(JSON.stringify({ format: 'anymaker-web-project', version: 1, objects: [component] })) });
  await expect(page.locator('#object-count')).toHaveText('1 个组件');
  const canvas = page.locator('#viewport canvas'); const box = await canvas.boundingBox();
  await canvas.click({ position: { x: box.width / 2, y: box.height / 2 } });
  await page.locator('[data-view="front"]').click();
  for (const mode of ['translate', 'rotate']) {
    await page.locator('[data-tool="' + mode + '"]').click();
    const before = await saveProject(page);
    const historyCount = await page.locator('#history-list button').count();
    const drag = await page.evaluate(mode => {
      const { scene, renderer, camera } = window.__renderTestState;
      const helper = scene.children.find(o => o.isTransformControlsRoot);
      helper.updateMatrixWorld(true);
      const control = helper.controls;
      const axis = mode === 'rotate' ? 'Z' : 'X';
      const handle = control._gizmo.gizmo[mode].children.find(o => o.name === axis && o.visible);
      const point = handle.position.clone();
      if (mode === 'rotate') point.fromBufferAttribute(handle.geometry.attributes.position, 16);
      else { handle.geometry.computeBoundingBox(); handle.geometry.boundingBox.getCenter(point); }
      handle.localToWorld(point).project(camera);
      const origin = control.worldPosition.clone().project(camera);
      const rect = renderer.domElement.getBoundingClientRect();
      const x = rect.x + (point.x + 1) * rect.width / 2; const y = rect.y + (1 - point.y) * rect.height / 2;
      const cx = rect.x + (origin.x + 1) * rect.width / 2; const cy = rect.y + (1 - origin.y) * rect.height / 2;
      return { x, y, endX: mode === 'rotate' ? cx - (y - cy) : x + 85, endY: mode === 'rotate' ? cy + (x - cx) : y, camera: camera.position.toArray(), ratio: renderer.getPixelRatio(), uuid: scene.children.find(o => o.userData.id === 'moving-shaft').uuid };
    }, mode);
    await page.mouse.move(drag.x, drag.y); await page.mouse.down();
    await page.mouse.move(drag.endX, drag.endY, { steps: 24 });
    expect(await page.evaluate(() => window.__renderTestState.scene.children.find(o => o.isTransformControlsRoot).controls.dragging)).toBe(true);
    expect(await page.evaluate(() => window.__renderTestState.renderer.getPixelRatio())).toBeCloseTo(drag.ratio * .75);
    expect(await page.locator('#history-list button').count()).toBe(historyCount);
    await page.mouse.up();
    const after = await saveProject(page);
    expect(after.objects[0][mode === 'translate' ? 'position' : 'rotation']).not.toEqual(before.objects[0][mode === 'translate' ? 'position' : 'rotation']);
    expect(await page.locator('#history-list button').count()).toBe(historyCount + 1);
    const state = await page.evaluate(() => { const s = window.__renderTestState; return { camera: s.camera.position.toArray(), ratio: s.renderer.getPixelRatio(), uuid: s.scene.children.find(o => o.userData.id === 'moving-shaft').uuid }; });
    expect(state).toEqual({ camera: drag.camera, ratio: drag.ratio, uuid: drag.uuid });
    await page.locator('#undo-btn').click(); expect((await saveProject(page)).objects).toEqual(before.objects);
    await page.locator('#redo-btn').click(); expect((await saveProject(page)).objects).toEqual(after.objects);
    // History restore clears selection. Select the transformed shaft again.
    const point = await page.evaluate(() => { const s = window.__renderTestState; const o = s.scene.children.find(o => o.userData.id === 'moving-shaft'); const p = o.position.clone().project(s.camera); const r = s.renderer.domElement.getBoundingClientRect(); return { x: r.x + (p.x + 1) * r.width / 2, y: r.y + (1 - p.y) * r.height / 2 }; });
    await page.mouse.click(point.x, point.y);
  }
  expect(errors).toEqual([]);
});

test('editing a linear size retains unrelated component visuals and restores with one undo', async ({ page }) => {
  await observeRendering(page);
  const errors = []; page.on('pageerror', error => errors.push(error.message));
  await page.goto('./'); await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  await page.locator('#language-select').selectOption('en');
  const objects = Array.from({ length: 60 }, (_, index) => ({
    id: 'shaft-' + index, type: 'drive_shaft', gridId: 'grid-1',
    position: { x: (index % 10 - 5) * .24, y: Math.floor(index / 10) * .24, z: 0 },
    rotation: { x: 0, y: 0, z: 0 }, scale: { x: 1, y: 1, z: 1 },
  }));
  await page.locator('#file-input').setInputFiles({ name: 'shafts.json', mimeType: 'application/json', buffer: Buffer.from(JSON.stringify({ format: 'anymaker-web-project', version: 1, objects })) });
  await expect(page.locator('#object-count')).toHaveText('60 components');
  await page.locator('[data-view="front"]').click();
  const before = await renderedIdentities(page);
  const point = await page.evaluate(() => {
    const { scene, camera, renderer } = window.__renderTestState;
    const object = scene.children.find(o => o.userData.id === 'shaft-25');
    let mesh; object.traverse(child => { if (child.isMesh && !mesh) mesh = child; });
    const point = mesh.geometry.boundingBox.getCenter(mesh.position.clone());
    mesh.localToWorld(point).project(camera);
    const rect = renderer.domElement.getBoundingClientRect();
    return { x: rect.x + (point.x + 1) * rect.width / 2, y: rect.y + (1 - point.y) * rect.height / 2 };
  });
  await page.mouse.click(point.x, point.y);
  await openRightSidebar(page); await page.locator('#right-tab-inspector').click();
  const input = page.getByLabel('Linear size Z', { exact: true });
  await expect(input).toHaveValue('1');
  await input.fill('8'); await input.press('Tab');
  await expect(input).toHaveValue('8');
  const after = await renderedIdentities(page);
  expect(after.components['shaft-25']).not.toBe(before.components['shaft-25']);
  for (const object of objects.filter(o => o.id !== 'shaft-25')) expect(after.components[object.id]).toBe(before.components[object.id]);
  const saved = await saveProject(page);
  expect(saved.objects.find(o => o.id === 'shaft-25').nativeExtension).toEqual([0, 0, 7]);
  expect(saved.objects.find(o => o.id === 'shaft-25').scale).toEqual({ x: 1, y: 1, z: 1 });
  await page.locator('#undo-btn').click();
  const undone = await saveProject(page);
  expect(undone.objects.find(o => o.id === 'shaft-25').nativeExtension).toBeUndefined();
  const undoVisuals = await renderedIdentities(page);
  expect(undoVisuals.components['shaft-24']).toBe(before.components['shaft-24']);
  await page.locator('#redo-btn').click();
  expect((await saveProject(page)).objects.find(o => o.id === 'shaft-25').nativeExtension).toEqual([0, 0, 7]);
  expect(errors).toEqual([]);
});

test('beam cursor is half size and hovering reuses scene bounds without raycasting distant meshes', async ({ page }) => {
  await observeRendering(page);
  const errors = []; page.on('pageerror', error => errors.push(error.message));
  await page.goto('./'); await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  const objects = Array.from({ length: 60 }, (_, index) => ({
    id: 'hover-shaft-' + index, type: 'drive_shaft',
    position: { x: index % 10 * .32, y: 0, z: Math.floor(index / 10) * .32 },
    rotation: { x: 0, y: 0, z: 0 }, scale: { x: 1, y: 1, z: 1 },
  }));
  await page.locator('#file-input').setInputFiles({ name: 'hover.json', mimeType: 'application/json', buffer: Buffer.from(JSON.stringify({ format: 'anymaker-web-project', version: 1, objects })) });
  await expect(page.locator('#object-count')).toHaveText('60 个组件');
  await page.locator('[data-view="top"]').click();
  await page.locator('[data-tool="edge"]').click();
  const canvas = page.locator('#viewport canvas'); const box = await canvas.boundingBox();
  const x = box.x + box.width * .06; const y = box.y + box.height * .7;
  await page.mouse.move(x, y);
  await expect.poll(() => page.evaluate(() => window.__renderTestState.scene.getObjectByName('edge-placement-anchor').visible)).toBe(true);
  const before = await page.evaluate(() => {
    const { scene } = window.__renderTestState;
    const anchor = scene.getObjectByName('edge-placement-anchor');
    const counts = { boundsUpdates: 0, raycasts: 0, statusMutations: 0 };
    window.__hoverTestCounts = counts;
    for (const root of scene.children.filter(object => object.userData.id)) {
      const update = root.updateWorldMatrix;
      root.updateWorldMatrix = function (...args) { counts.boundsUpdates++; return update.apply(this, args); };
      root.traverse(mesh => {
        if (!mesh.isMesh) return;
        const raycast = mesh.raycast;
        mesh.raycast = function (...args) { counts.raycasts++; return raycast.apply(this, args); };
      });
    }
    new MutationObserver(records => { counts.statusMutations += records.length; }).observe(document.querySelector('#build-status'), { attributes: true, childList: true, characterData: true, subtree: true });
    return { radius: anchor.geometry.parameters.radius, position: anchor.position.toArray(), geometry: anchor.geometry.uuid };
  });
  expect(before.radius).toBe(.035);
  for (let step = 1; step <= 8; step++) {
    await page.mouse.move(x + step, y + step * 8);
    await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  }
  const after = await page.evaluate(() => {
    const anchor = window.__renderTestState.scene.getObjectByName('edge-placement-anchor');
    return { counts: window.__hoverTestCounts, position: anchor.position.toArray(), geometry: anchor.geometry.uuid };
  });
  expect(after.position).not.toEqual(before.position);
  expect(after.geometry).toBe(before.geometry);
  expect(after.counts).toEqual({ boundsUpdates: 0, raycasts: 0, statusMutations: 0 });
  await expect(page.locator('#build-status')).toHaveText('梁 1 格 · 点击起点');
  await page.mouse.click(x + 8, y + 64);
  await page.mouse.click(x + 90, y + 64);
  await expect(page.locator('#topology-count')).toHaveText('2 节点 · 1 梁 · 0 面板');
  await page.locator('#undo-btn').click();
  await expect(page.locator('#topology-count')).toHaveText('0 节点 · 0 梁 · 0 面板');
  expect(errors).toEqual([]);
});

for (const projection of ['perspective', 'orthographic']) test('all tool rays follow active camera rotation and pan in ' + projection, async ({ page }) => {
  await observeRendering(page);
  const errors = []; page.on('pageerror', error => errors.push(error.message));
  await page.goto('./'); await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  const topology = {
    nodes: [{ id: 'a', position: { x: -.64, y: 0, z: 0 } }, { id: 'b', position: { x: .64, y: 0, z: 0 } }],
    edges: [{ id: 'beam', a: 'a', b: 'b' }], plates: [], links: [],
  };
  await page.locator('#file-input').setInputFiles({ name: 'camera-picking.json', mimeType: 'application/json', buffer: Buffer.from(JSON.stringify({ format: 'anymaker-web-project', version: 1, objects: [], topology })) });
  await expect(page.locator('#topology-count')).toHaveText('2 节点 · 1 梁 · 0 面板');
  if (projection === 'orthographic') await page.locator('[data-view="iso"]').click();
  await page.locator('[data-tool="select"]').click();
  await observePointerRay(page);
  await page.locator('#viewport canvas').hover();
  await expect.poll(() => page.evaluate(() => window.__pointerRayTestState.ready)).toBe(true);
  const historyCount = await page.locator('#history-list button').count();
  const nextFrames = () => page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  for (const tool of ['select', 'place', 'erase', 'translate', 'rotate', 'scale', 'node', 'edge', 'plate', 'glass', 'connect', 'paint', 'hide']) {
    await page.locator('[data-tool="' + tool + '"]').click();
    const box = await page.locator('#viewport canvas').boundingBox();
    await page.mouse.move(box.x + box.width * .48, box.y + box.height * .65);
    await nextFrames();
    await page.evaluate(() => { const state = window.__pointerRayTestState; state.samples = []; state.recording = true; });
    for (const button of ['right', 'middle']) {
      await page.mouse.down({ button });
      for (let step = 0; step < 4; step++) {
        await page.mouse.move(box.x + box.width * (.48 + (step + 1) * .012), box.y + box.height * (.65 - (step + 1) * .008));
        await nextFrames();
      }
      await page.mouse.up({ button });
      // No new mouse input: the release position must keep following damping.
      await nextFrames();
    }
    const samples = await page.evaluate(() => { const state = window.__pointerRayTestState; state.recording = false; return state.samples; });
    expect(samples.length, tool).toBeGreaterThanOrEqual(8);
    expect(samples.some(sample => sample.buttons === 2), tool).toBe(true);
    expect(samples.some(sample => sample.buttons === 4), tool).toBe(true);
    expect(samples.at(-1).camera, tool).not.toEqual(samples[0].camera);
    expect(Math.max(...samples.map(sample => sample.originError)), tool).toBeLessThan(1e-8);
    expect(Math.max(...samples.map(sample => sample.directionError)), tool).toBeLessThan(1e-8);
  }
  await expect(page.locator('#topology-count')).toHaveText('2 节点 · 1 梁 · 0 面板');
  expect(await page.locator('#history-list button').count()).toBe(historyCount);
  expect(errors).toEqual([]);
});

test('transform and extension handle picking follows camera motion without waiting for another mouse event', async ({ page }) => {
  await observeRendering(page);
  const errors = []; page.on('pageerror', error => errors.push(error.message));
  await page.goto('./'); await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  const component = { id: 'shaft', type: 'drive_shaft', position: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 }, scale: { x: 1, y: 1, z: 1 } };
  await page.locator('#file-input').setInputFiles({ name: 'camera-handles.json', mimeType: 'application/json', buffer: Buffer.from(JSON.stringify({ format: 'anymaker-web-project', version: 1, objects: [component] })) });
  await expect(page.locator('#object-count')).toHaveText('1 个组件');
  await page.locator('[data-tool="select"]').click();
  const point = await projectWorldPoint(page, component.position);
  await page.mouse.click(point.x, point.y);
  await observePointerRay(page, { gizmo: true });
  const nextFrames = () => page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  const historyCount = await page.locator('#history-list button').count();
  for (const tool of ['select', 'translate', 'rotate', 'scale']) {
    await page.locator('[data-tool="' + tool + '"]').click();
    await expect.poll(() => page.evaluate(() => !!window.__renderTestState.scene.children.find(object => object.isTransformControlsRoot).controls.object)).toBe(true);
    const box = await page.locator('#viewport canvas').boundingBox();
    await page.mouse.move(box.x + box.width * .54, box.y + box.height * .52);
    await nextFrames();
    await page.evaluate(() => { const state = window.__pointerRayTestState; state.samples = []; state.recording = true; });
    await page.mouse.down({ button: 'right' });
    for (let step = 0; step < 6; step++) {
      await page.mouse.move(box.x + box.width * (.54 + step * .012), box.y + box.height * (.52 - step * .008));
      await nextFrames();
    }
    await page.mouse.up({ button: 'right' });
    for (let step = 0; step < 5; step++) await nextFrames();
    const samples = await page.evaluate(() => { const state = window.__pointerRayTestState; state.recording = false; return state.samples; });
    expect(samples.length, tool).toBeGreaterThanOrEqual(10);
    expect(samples.at(-1).camera, tool).not.toEqual(samples[0].camera);
    expect(Math.max(...samples.map(sample => sample.originError)), tool).toBeLessThan(1e-8);
    expect(Math.max(...samples.map(sample => sample.directionError)), tool).toBeLessThan(1e-8);
    expect(samples.every(sample => sample.axis === sample.expectedAxis), tool).toBe(true);
  }
  expect(await page.locator('#history-list button').count()).toBe(historyCount);
  expect(errors).toEqual([]);
});

test('beam cursor follows fresh pointer input during orbit and subsequent camera damping', async ({ page }) => {
  await observeRendering(page);
  const errors = []; page.on('pageerror', error => errors.push(error.message));
  await page.goto('./'); await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  await page.locator('[data-tool="edge"]').click();
  const canvas = page.locator('#viewport canvas'); const box = await canvas.boundingBox();
  await page.mouse.move(box.x + box.width * .5, box.y + box.height * .65);
  await expect.poll(() => page.evaluate(() => window.__renderTestState.scene.getObjectByName('edge-placement-anchor').visible)).toBe(true);
  await page.evaluate(releasePointer => {
    const { renderer } = window.__renderTestState;
    const samples = []; window.__orbitPointerSamples = samples;
    let pointer = releasePointer;
    renderer.domElement.addEventListener('pointermove', event => { pointer = { x: event.clientX, y: event.clientY }; }, true);
    const render = renderer.render;
    renderer.render = function (scene, camera) {
      const result = render.call(this, scene, camera);
      if (pointer) {
        const rect = this.domElement.getBoundingClientRect();
        const direction = camera.position.clone().set((pointer.x - rect.x) / rect.width * 2 - 1, 1 - (pointer.y - rect.y) / rect.height * 2, .5).unproject(camera).sub(camera.position).normalize();
        const expected = camera.position.clone().addScaledVector(direction, -camera.position.y / direction.y);
        expected.set(...expected.toArray().map(value => Math.round(value / .08) * .08));
        const anchor = scene.getObjectByName('edge-placement-anchor');
        samples.push({ error: anchor.position.distanceTo(expected), visible: anchor.visible, camera: camera.quaternion.toArray(), pointer });
      }
      return result;
    };
  }, { x: box.x + box.width * .5, y: box.y + box.height * .65 });
  await page.mouse.down({ button: 'right' });
  await page.mouse.move(box.x + box.width * .62, box.y + box.height * .59, { steps: 6 });
  await page.mouse.up({ button: 'right' });
  // With no new mouse movement, the release position must also follow the
  // moving camera instead of reverting to the position before the orbit.
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  for (let step = 0; step < 6; step++) {
    await page.mouse.move(box.x + box.width * (.32 + step * .045), box.y + box.height * .76);
    await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  }
  const samples = await page.evaluate(() => window.__orbitPointerSamples);
  expect(samples.length).toBeGreaterThanOrEqual(6);
  expect(samples.at(-1).camera).not.toEqual(samples[0].camera);
  expect(samples.every(sample => sample.visible)).toBe(true);
  expect(Math.max(...samples.map(sample => sample.error))).toBeLessThan(1e-6);
  // Pointer capture keeps delivering orbit events outside the canvas. Those
  // events must hide the old preview and allow it to resume on re-entry.
  await page.mouse.down({ button: 'right' });
  await page.mouse.move(box.x - 12, box.y + box.height * .65, { steps: 3 });
  await expect.poll(() => page.evaluate(() => window.__renderTestState.scene.getObjectByName('edge-placement-anchor').visible)).toBe(false);
  await page.mouse.move(box.x + box.width * .5, box.y + box.height * .65, { steps: 3 });
  await expect.poll(() => page.evaluate(() => window.__renderTestState.scene.getObjectByName('edge-placement-anchor').visible)).toBe(true);
  await page.mouse.up({ button: 'right' });
  expect(errors).toEqual([]);
});

test('beam and panel commits reuse existing structure meshes across addition and undo', async ({ page }) => {
  await observeRendering(page);
  await page.goto('./'); await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  await page.locator('[data-view="front"]').click();
  const canvas = page.locator('#viewport canvas');
  const corners = [[430, 560], [730, 560], [730, 280], [430, 280]];
  await page.locator('[data-tool="edge"]').click();
  let previous = null;
  for (let index = 0; index < corners.length; index++) {
    await canvas.click({ position: { x: corners[index][0], y: corners[index][1] } });
    const next = corners[(index + 1) % corners.length];
    await canvas.click({ position: { x: next[0], y: next[1] } });
    const current = await renderedIdentities(page);
    if (previous) for (const [id, uuid] of Object.entries(previous.topology)) expect(current.topology[id]).toBe(uuid);
    previous = current;
  }
  await expect(page.locator('#topology-count')).toHaveText('4 节点 · 4 梁 · 0 面板');
  await page.locator('[data-tool="plate"]').click();
  for (const [x, y] of [[580, 560], [730, 420], [580, 280], [430, 420]]) await canvas.click({ position: { x, y } });
  await expect(page.locator('#topology-count')).toHaveText('4 节点 · 4 梁 · 1 面板');
  const panel = await renderedIdentities(page);
  for (const [id, uuid] of Object.entries(previous.topology)) expect(panel.topology[id]).toBe(uuid);
  await page.locator('#undo-btn').click();
  await expect(page.locator('#topology-count')).toHaveText('4 节点 · 4 梁 · 0 面板');
  expect((await renderedIdentities(page)).topology).toEqual(previous.topology);
});

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    const key = 'anymaker:' + location.pathname + ':settings:v1';
    if (!localStorage.getItem(key)) localStorage.setItem(key, JSON.stringify({ version: 1, language: 'zh' }));
  });
});

async function openRightSidebar(page) {
  const toggle = page.locator('#right-sidebar-toggle');
  if (await toggle.getAttribute('aria-expanded') === 'false') await toggle.click();
  await expect(page.locator('#right-sidebar')).toBeVisible();
}

test('3D model tool previews GLB, OBJ and STL, changes scale and panels, commits and undoes once', async ({ page }) => {
  const errors = []; page.on('pageerror', error => errors.push(error.message));
  await page.goto('./');
  await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  await openRightSidebar(page); await page.locator('#right-tab-resources').click();
  const input = page.locator('#model-file-input');
  await input.setInputFiles({ name: 'quad.glb', mimeType: 'model/gltf-binary', buffer: modelGlbFixture() });
  await expect(page.locator('.model-import-tool')).toHaveAttribute('data-state', 'ready');
  await expect(page.locator('#model-source-stats')).toContainText('4 顶点记录 / 2 三角面');
  await expect(page.locator('#model-simplification')).toHaveAttribute('max', '12');
  await expect(page.locator('#model-level')).toContainText('150 顶点');
  await expect(page.locator('#model-face-stats')).toContainText('1 四边面 / 0 三角面');
  await expect(page.locator('#model-preview')).toBeVisible();
  await expect(page.locator('#topology-count')).toContainText('0 节点');
  await page.locator('#model-scale').fill('0.3');
  await expect(page.locator('#model-scale-value')).toHaveText('2.00×');
  await expect(page.locator('.model-import-tool')).toHaveAttribute('data-state', 'ready');
  await expect(page.locator('#model-dimensions')).toContainText('8.08');
  await page.locator('#model-panels').uncheck();
  await expect(page.locator('#model-result-stats')).toContainText('0 面板');
  await page.locator('#model-generate-btn').click();
  await expect(page.locator('#topology-count')).toContainText('4 节点 · 4 梁 · 0 面板');
  await expect(page.locator('#project-name')).toHaveValue('quad');
  await page.locator('#undo-btn').click();
  await expect(page.locator('#topology-count')).toContainText('0 节点');
  await page.locator('#redo-btn').click();
  await expect(page.locator('#topology-count')).toContainText('4 节点 · 4 梁 · 0 面板');
  await input.setInputFiles({ name: 'triangle.obj', mimeType: 'text/plain', buffer: Buffer.from('v 0 0 0\nv 1 0 0\nv 0 1 0\nf 1 2 3\n') });
  await expect(page.locator('.model-import-tool')).toHaveAttribute('data-state', 'ready');
  await page.locator('#model-panels').check();
  await page.locator('#model-reverse-normals').check();
  await expect(page.locator('#model-result-stats')).toContainText('1 面板');
  await page.locator('#model-generate-btn').click();
  await expect(page.locator('#topology-count')).toContainText('3 节点 · 3 梁 · 1 面板');
  await page.locator('#left-tab-subgrids').click();
  await page.locator('#subgrid-check-btn').click();
  await expect(page.locator('#subgrid-summary')).toHaveAttribute('data-subgrid-valid', 'true');
  await expect(page.locator('#viewport')).toHaveAttribute('data-subgrid-error-marker-count', '0');
  await page.locator('#undo-btn').click();
  await expect(page.locator('#topology-count')).toContainText('4 节点 · 4 梁 · 0 面板');
  await input.setInputFiles({ name: 'triangle.stl', mimeType: 'application/octet-stream', buffer: Buffer.from('solid tri\nfacet normal 0 0 1\nouter loop\nvertex 0 0 0\nvertex 1 0 0\nvertex 0 1 0\nendloop\nendfacet\nendsolid tri') });
  await expect(page.locator('.model-import-tool')).toHaveAttribute('data-state', 'ready');
  await page.locator('#language-select').selectOption('en');
  await expect(page.locator('#model-result-stats')).toContainText('3 nodes / 3 beams / 1 panels');
  await page.locator('#model-cancel-btn').click();
  await expect(page.locator('#model-generate-btn')).toBeDisabled();
  await expect(page.locator('#topology-count')).toContainText('4 nodes');
  await input.setInputFiles({ name: 'bad.glb', mimeType: 'model/gltf-binary', buffer: Buffer.from('bad') });
  await expect(page.locator('#model-import-status')).toContainText('Invalid model geometry');
  await expect(page.locator('#model-generate-btn')).toBeDisabled();
  await expect(page.locator('#topology-count')).toContainText('4 nodes');
  expect(errors).toEqual([]);
});

test('3D model symmetry updates axis previews, restores the original and generates paired nodes', async ({ page }) => {
  const errors = []; page.on('pageerror', error => errors.push(error.message));
  await page.goto('./'); await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  await openRightSidebar(page); await page.locator('#right-tab-resources').click();
  const enabled = page.getByRole('checkbox', { name: '对称模式', exact: true });
  const direction = page.getByLabel('对称方向', { exact: true });
  await expect(enabled).not.toBeChecked(); await expect(direction).toBeDisabled();
  await page.locator('#model-file-input').setInputFiles({ name: 'asymmetric.glb', mimeType: 'model/gltf-binary', buffer: modelGlbFixture((_json, binary) => {
    binary.writeFloatLE(.7, 24); binary.writeFloatLE(.6, 28); binary.writeFloatLE(.2, 36);
  }) });
  await expect(page.locator('.model-import-tool')).toHaveAttribute('data-state', 'ready');
  const originalPath = await page.locator('#model-preview path').getAttribute('d');
  const originalCounts = await page.locator('#model-result-stats').textContent();
  await enabled.check(); await expect(direction).toBeEnabled();
  await expect(page.locator('.model-import-tool')).toHaveAttribute('data-state', 'ready');
  await expect(page.locator('#model-preview path')).not.toHaveAttribute('d', originalPath);
  const xPath = await page.locator('#model-preview path').getAttribute('d');
  await direction.selectOption('y');
  await expect(page.locator('.model-import-tool')).toHaveAttribute('data-state', 'ready');
  await expect(page.locator('#model-preview path')).not.toHaveAttribute('d', xPath);
  await direction.selectOption('z');
  await expect(page.locator('.model-import-tool')).toHaveAttribute('data-state', 'ready');
  await expect(page.locator('#model-preview path')).toHaveAttribute('d', originalPath);
  await enabled.uncheck(); await expect(direction).toBeDisabled();
  await expect(page.locator('.model-import-tool')).toHaveAttribute('data-state', 'ready');
  await expect(page.locator('#model-result-stats')).toHaveText(originalCounts);
  await enabled.check();
  // Change several controls before the worker returns; only the final request may commit.
  await direction.selectOption('x');
  await page.locator('#model-scale').fill('0.1');
  await page.locator('#model-simplification').fill('12');
  await expect(page.locator('#model-level')).toContainText('30 顶点');
  await expect(page.locator('.model-import-tool')).toHaveAttribute('data-state', 'ready');
  await expect(page.locator('#topology-count')).toContainText('0 节点');
  await page.locator('#language-select').selectOption('en');
  await expect(page.getByRole('checkbox', { name: 'Symmetry mode', exact: true })).toBeChecked();
  await expect(page.getByLabel('Symmetry direction', { exact: true })).toHaveValue('x');
  await expect(page.locator('#model-symmetry-axis option:checked')).toHaveText('X direction (center YZ plane)');
  await page.locator('#language-select').selectOption('zh');
  const expectedNodes = Number((await page.locator('#model-result-stats').textContent()).match(/生成：(\d+) 节点/)[1]);
  await page.locator('#model-generate-btn').click();
  await expect(page.locator('#topology-count')).toContainText(`${expectedNodes} 节点`);
  const snapshot = await page.evaluate(() => {
    window.dispatchEvent(new Event('pagehide'));
    return JSON.parse(localStorage.getItem('anymaker:' + location.pathname + ':autosave:v1')).document;
  });
  expect(snapshot.topology.nodes).toHaveLength(expectedNodes);
  const positions = snapshot.topology.nodes.map(node => ['x', 'y', 'z'].map(axis => Math.round(node.position[axis] / .08)));
  const keys = new Set(positions.map(point => point.join(',')));
  expect(positions.every(([x, y, z]) => keys.has([-x, y, z].join(',')))).toBe(true);
  await page.locator('#undo-btn').click(); await expect(page.locator('#topology-count')).toContainText('0 节点');
  await page.locator('#redo-btn').click(); await expect(page.locator('#topology-count')).toContainText(`${expectedNodes} 节点`);
  expect(errors).toEqual([]);
});

// Opt in with ANYMAKER_MODEL_SAMPLE; the private model is never copied to the repo.
if (process.env.ANYMAKER_MODEL_SAMPLE) test('local 3D model sample generates the previewed structure and restores history', async ({ page }) => {
  test.setTimeout(120000);
  const errors = []; page.on('pageerror', error => errors.push(error.message));
  await page.goto('./'); await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  await openRightSidebar(page); await page.locator('#right-tab-resources').click();
  await page.locator('#model-file-input').setInputFiles(process.env.ANYMAKER_MODEL_SAMPLE);
  await expect(page.locator('.model-import-tool')).toHaveAttribute('data-state', 'ready', { timeout: 30000 });
  const source = await page.locator('#model-source-stats').textContent();
  const detailed = await page.locator('#model-simplified-stats').textContent();
  const levels = [];
  for (const level of ['0', '3', '5', '7', '9', '10', '11', '12']) {
    await page.locator('#model-simplification').fill(level);
    await expect(page.locator('.model-import-tool')).toHaveAttribute('data-state', 'ready');
    const count = Number((await page.locator('#model-result-stats').textContent()).match(/生成：(\d+) 节点/)[1]);
    expect(count).toBeGreaterThanOrEqual(Number(level) < 10 ? 70 : 20);
    expect(count).toBeLessThanOrEqual(Number(level) < 10 ? 250 : 70);
    const faces = (await page.locator('#model-face-stats').textContent()).match(/(\d+) 四边面 \/ (\d+) 三角面/).slice(1).map(Number);
    expect(faces[0] / (faces[0] + faces[1])).toBeGreaterThan(Number(level) < 10 ? .75 : .5);
    levels.push({ level, count, quads: faces[0], triangles: faces[1] });
  }
  expect(levels.every((item, i) => !i || item.count < levels[i - 1].count)).toBe(true);
  await page.locator('#model-simplification').fill('12');
  await expect(page.locator('.model-import-tool')).toHaveAttribute('data-state', 'ready');
  await expect(page.locator('#model-simplified-stats')).not.toHaveText(detailed);
  await page.locator('#model-scale').fill('0.1');
  await page.locator('#model-scale').fill('0');
  await expect(page.locator('.model-import-tool')).toHaveAttribute('data-state', 'ready');
  const noSymmetry = await page.locator('#model-preview path').getAttribute('d');
  await page.locator('#model-symmetry').check();
  for (const axis of ['y', 'z', 'x']) {
    await page.locator('#model-symmetry-axis').selectOption(axis);
    await expect(page.locator('.model-import-tool')).toHaveAttribute('data-state', 'ready');
    await expect(page.locator('#model-preview')).toBeVisible();
  }
  await page.locator('#model-symmetry').uncheck();
  await expect(page.locator('.model-import-tool')).toHaveAttribute('data-state', 'ready');
  await expect(page.locator('#model-preview path')).toHaveAttribute('d', noSymmetry);
  await page.locator('#model-symmetry').check();
  await expect(page.locator('.model-import-tool')).toHaveAttribute('data-state', 'ready');
  const expected = (await page.locator('#model-result-stats').textContent()).match(/生成：(\d+) 节点 \/ (\d+) 梁 \/ (\d+) 面板/).slice(1).map(Number);
  const dimensions = await page.locator('#model-dimensions').textContent();
  await page.locator('#model-preview').screenshot({ path: 'test-results/model-sample-preview.png' });
  await page.locator('#model-generate-btn').click();
  await expect(page.locator('#topology-count')).toHaveText(`${expected[0]} 节点 · ${expected[1]} 梁 · ${expected[2]} 面板`, { timeout: 30000 });
  await page.locator('#left-tab-subgrids').click();
  await page.locator('#subgrid-check-btn').click();
  await expect(page.locator('#subgrid-summary')).toHaveAttribute('data-subgrid-valid', 'true');
  await expect(page.locator('#subgrid-summary')).toContainText('0 个错误；0 个警告');
  await page.getByRole('button', { name: '隐藏节点', exact: true }).click();
  await page.locator('canvas').screenshot({ path: 'test-results/model-sample-vehicle.png' });
  const snapshot = await page.evaluate(() => {
    window.dispatchEvent(new Event('pagehide'));
    return JSON.parse(localStorage.getItem('anymaker:' + location.pathname + ':autosave:v1')).document;
  });
  expect(snapshot.topology.nodes).toHaveLength(expected[0]);
  expect(snapshot.topology.edges).toHaveLength(expected[1]);
  expect(snapshot.topology.plates).toHaveLength(expected[2]);
  expect(snapshot.topology.nodes.every(node => Object.values(node.position).every(value => Math.abs(value / .08 - Math.round(value / .08)) < 1e-7))).toBe(true);
  const points = snapshot.topology.nodes.map(node => ['x', 'y', 'z'].map(axis => Math.round(node.position[axis] / .08)));
  const pointKeys = new Set(points.map(point => point.join(',')));
  expect(points.every(([x, y, z]) => pointKeys.has([-x, y, z].join(',')))).toBe(true);
  await page.locator('#undo-btn').click(); await expect(page.locator('#topology-count')).toContainText('0 节点');
  await page.locator('#redo-btn').click(); await expect(page.locator('#topology-count')).toContainText(`${expected[0]} 节点`);
  console.log(JSON.stringify({ source, detailed, generated: expected, dimensions, levels }));
  expect(errors).toEqual([]);
});

test('GitHub build time selects a successful Pages deployment over a newer failure', async ({ page }) => {
  await page.route(/api\.github\.com\/repos\/BKN46\/anymaker-builder\/actions\/runs/, route => route.fulfill({
    contentType: 'application/json',
    body: JSON.stringify({ workflow_runs: [
      { path: 'dynamic/pages/pages-build-deployment', status: 'completed', conclusion: 'failure', updated_at: '2026-09-24T10:00:00Z' },
      { path: 'dynamic/pages/pages-build-deployment', status: 'completed', conclusion: 'success', updated_at: '2026-09-23T09:00:00Z' },
    ] }),
  }));
  await page.goto('./');
  await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  await expect(page.locator('#github-build-time')).toHaveAttribute('title', '2026-09-23T09:00:00.000Z');
});

test('GitHub build status remains visible when no Pages run succeeds', async ({ page }) => {
  await page.route(/api\.github\.com\/repos\/BKN46\/anymaker-builder\/actions\/runs/, route => route.fulfill({
    contentType: 'application/json', body: JSON.stringify({ workflow_runs: [] }),
  }));
  await page.goto('./');
  await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  await expect(page.locator('#github-build-time')).toHaveText('暂无成功的 Pages 构建');
});

test('Mesh → placement → transforms → history → files on Pages subpath', async ({ page }) => {
  await page.addInitScript(() => { window.showSaveFilePicker = undefined; });
  const errors = []; page.on('pageerror', error => errors.push(error.message));
  await page.goto('./');
  await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  await expect(page.locator('#load-btn')).toHaveCount(0);
  await expect(page.locator('#catalog-count')).toContainText('332 / 598');
  await page.locator('#mesh-input').setInputFiles({ name: 'engine_block_a_0_0_0.mesh', mimeType: 'application/octet-stream', buffer: meshFixture() });
  await expect(page.locator('#asset-status')).toContainText('1 个 Mesh');
  await expect(page.locator('#save-status')).toContainText('模型库已登记');
  await page.locator('#component-search').fill('engine');
  await page.locator('[data-id="engine"]').click();
  await page.locator('canvas').click({ position: { x: 380, y: 400 } });
  await expect(page.locator('#object-count')).toHaveText('1 个组件');
  await expect(page.locator('#inspector-content')).toContainText('342 顶点 / 218 三角形');
  await openRightSidebar(page);
  await page.locator('#right-tab-inspector').click();
  const x = page.getByRole('spinbutton', { name: 'position-x', exact: true });
  await x.fill('15'); await x.press('Enter');
  await expect(x).toHaveValue('15');
  await page.locator('[data-tool="rotate"]').click();
  const yRotation = page.getByRole('spinbutton', { name: 'rotation-y', exact: true });
  await yRotation.fill('90'); await yRotation.press('Enter');
  await page.locator('#delete-selected').click(); await expect(page.locator('#object-count')).toHaveText('0 个组件');
  await page.locator('#undo-btn').click(); await expect(page.locator('#object-count')).toHaveText('1 个组件');
  await page.locator('#redo-btn').click(); await expect(page.locator('#object-count')).toHaveText('0 个组件');
  await openRightSidebar(page);
  await page.locator('#right-tab-resources').click();
  const xmlDownload = page.waitForEvent('download'); await page.locator('#export-btn').click();
  const xml = await xmlDownload; const xmlStream = await xml.createReadStream(); let xmlContent = ''; for await (const c of xmlStream) xmlContent += c;
  expect(xmlContent).toContain('game-compatible="false"');
  await page.screenshot({ path: 'test-results/editor.png' });
  expect(errors).toEqual([]);
});

test('component placement preview exposes JKL rotation and UIO mirror controls', async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  await page.locator('#mesh-input').setInputFiles({ name: 'engine_block_a_0_0_0.mesh', mimeType: 'application/octet-stream', buffer: meshFixture() });
  await page.locator('#component-search').fill('engine');
  await page.locator('[data-id="engine"]').click();
  const canvas = page.locator('canvas');
  await canvas.hover({ position: { x: 380, y: 400 } });
  await expect(page.locator('#placement-indicator')).toBeVisible();
  await page.keyboard.press('j'); await page.keyboard.press('k'); await page.keyboard.press('l');
  await page.keyboard.press('u'); await page.keyboard.press('i'); await page.keyboard.press('o');
  await expect(page.locator('[data-placement-rotation="x"]')).toHaveText('↻');
  await expect(page.locator('[data-placement-rotation="y"]')).toHaveText('↻');
  await expect(page.locator('[data-placement-rotation="z"]')).toHaveText('↻');
  await expect(page.locator('[data-placement-mirror="x"]')).toHaveText('↔');
  await expect(page.locator('[data-placement-mirror="y"]')).toHaveText('↔');
  await expect(page.locator('[data-placement-mirror="z"]')).toHaveText('↔');
  await expect(page.locator('[data-placement-rotation="x"]').locator('..')).toHaveAttribute('aria-label', 'X rotation 90 degrees');
  await expect(page.locator('#placement-indicator')).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
  await openRightSidebar(page); await page.locator('#right-tab-editor').click();
  await page.locator('#placement-orientation-indicator').uncheck();
  await expect(page.locator('#placement-indicator')).toBeHidden();
  await page.locator('#viewport').focus();
  await page.keyboard.press('j');
  await expect(page.locator('[data-placement-rotation="x"]').locator('..')).toHaveAttribute('aria-label', 'X rotation 180 degrees');
  await canvas.click({ position: { x: 380, y: 400 } });
  const saved = await saveProject(page);
  expect(saved.objects[0].localMirrorAxes).toEqual(['x', 'y', 'z']);
  await openRightSidebar(page); await page.locator('#right-tab-inspector').click();
  await expect(page.getByRole('spinbutton', { name: 'rotation-x', exact: true })).toHaveValue(/^180(?:\.0+)?$/);
});

test('Shift-click component placement keeps orientation for repeated placements', async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  await page.locator('#mesh-input').setInputFiles({ name: 'engine_block_a_0_0_0.mesh', mimeType: 'application/octet-stream', buffer: meshFixture() });
  await page.locator('#component-search').fill('engine');
  await page.locator('[data-id="engine"]').click();
  const canvas = page.locator('canvas');
  await canvas.hover({ position: { x: 360, y: 400 } });
  await page.keyboard.press('j');
  await page.keyboard.press('u');
  await page.keyboard.down('Shift');
  await canvas.click({ position: { x: 320, y: 400 } });
  await expect(page.locator('#object-count')).toHaveText(/1/);
  await canvas.click({ position: { x: 520, y: 400 } });
  await page.keyboard.up('Shift');
  await expect(page.locator('#object-count')).toHaveText(/2/);
  const saved = await saveProject(page);
  expect(saved.objects).toHaveLength(2);
  for (const object of saved.objects) {
    expect(object.rotation.x).toBeCloseTo(Math.PI / 2);
    expect(object.localMirrorAxes).toEqual(['x']);
  }
  await expect(page.locator('[data-tool="place"]')).toHaveClass(/active/);
  await canvas.click({ position: { x: 620, y: 400 } });
  await expect(page.locator('#object-count')).toHaveText(/3/);
  await expect(page.locator('[data-tool="select"]')).toHaveClass(/active/);
});

test('Alt-clicking a component from any tool makes its type the active placement component', async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  await page.locator('#mesh-input').setInputFiles({ name: 'engine_block_a_0_0_0.mesh', mimeType: 'application/octet-stream', buffer: meshFixture() });
  const canvas = page.locator('canvas');
  await page.locator('#component-search').fill('engine');
  await page.locator('#component-list [data-id="engine"]').click();
  await canvas.click({ position: { x: 380, y: 400 } });
  await expect(page.locator('#object-count')).toHaveText('1 个组件');
  await page.locator('#component-search').fill('');
  await page.locator('#component-list [data-id="wheel"]').first().click();
  await page.locator('[data-tool="paint"]').click();
  await canvas.click({ position: { x: 380, y: 400 }, modifiers: ['Alt'] });
  await expect(page.locator('[data-tool="place"]')).toHaveClass(/active/);
  await expect(page.locator('#component-list [data-id="engine"]')).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('#object-count')).toHaveText('1 个组件');
});

test('battery components expose an installed battery selector that saves to the host accessory', async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  await page.locator('#component-search').fill('battery');
  await page.locator('#component-list [data-id="battery_a"]').click();
  await page.locator('canvas').click({ position: { x: 380, y: 400 } });
  await expect(page.locator('#object-count')).toHaveText('1 个组件');
  await openRightSidebar(page); await page.locator('#right-tab-inspector').click();
  await expect(page.locator('.native-accessory-property h3')).toHaveText('已安装电池');
  const battery = page.getByRole('combobox', { name: '电池', exact: true });
  // The fitted cell is a separate inventory Mesh below the cradle host.
  // Await its published resource so this checks visual assembly as well as
  // the serialised acc.item record.
  const manifest = JSON.parse(readFileSync(new URL('../../public/assets/manifests/mesh-manifest.json', import.meta.url)));
  const batteryMeshUrl = new URL(manifest.entries['meshes/components/battery_a.mesh'].url, page.url()).href;
  const [batteryMesh] = await Promise.all([
    page.waitForResponse(response => response.url() === batteryMeshUrl && response.ok()),
    battery.selectOption('battery_a'),
  ]);
  expect(batteryMesh.headers()['content-type']).toMatch(/application\/json|application\/gzip|octet-stream/i);
  await expect(page.locator('#save-status')).toContainText('更新电池');
  const saved = await saveProject(page);
  expect(saved.objects[0].nativeAccessory).toMatchObject({ _type: 'battery_a' });
  expect(saved.objects[0].nativeAccessoryContainer).toBe('acc');
});

test('structural commands create independent components and remain undoable', async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  await page.locator('#mesh-input').setInputFiles({ name: 'engine_block_a_0_0_0.mesh', mimeType: 'application/octet-stream', buffer: meshFixture() });
  await page.locator('#component-search').fill('engine');
  await page.locator('[data-id="engine"]').click();
  await page.locator('canvas').click({ position: { x: 380, y: 400 } });
  await expect(page.locator('#object-count')).toHaveText('1 个组件');
  await expect(page.locator('#copy-action kbd')).toHaveText('D');
  await expect(page.locator('#mirror-action kbd')).toHaveText('M');
  await page.locator('#viewport').focus();
  await page.keyboard.press('d');
  await expect(page.locator('#object-count')).toHaveText('2 个组件');
  await page.keyboard.press('m');
  await expect(page.locator('#mirror-toolbar')).toBeVisible();
  await expect(page.locator('#selection-filter-toolbar #mirror-toolbar')).toBeVisible();
  await expect(page.locator('#viewport')).toHaveAttribute('data-mirror-guide-visible', 'true');
  await page.locator('#mirror-hide-plane').check();
  await expect(page.locator('#viewport')).toHaveAttribute('data-mirror-guide-visible', 'false');
  await expect(page.locator('#mirror-action')).toHaveAttribute('aria-pressed', 'true');
  await page.locator('[data-id="engine"]').click();
  await expect(page.locator('#mirror-action')).toHaveClass(/active/);
  await expect(page.locator('#mirror-action')).toHaveCSS('background-color', 'rgb(15, 118, 110)');
  await page.locator('canvas').click({ position: { x: 540, y: 400 } });
  await expect(page.locator('#object-count')).toHaveText('4 个组件');
  await page.locator('#mirror-hide-plane').uncheck();
  await expect(page.locator('#viewport')).toHaveAttribute('data-mirror-guide-visible', 'true');
  await page.locator('#undo-btn').click();
  await expect(page.locator('#object-count')).toHaveText('2 个组件');
});

test('mirror mode keeps paired component moves and rotations synchronized through Inspector and history', async ({ page }) => {
  const errors = []; page.on('pageerror', error => errors.push(error.message));
  await page.goto('./');
  await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  await page.locator('#mesh-input').setInputFiles({ name: 'engine_block_a_0_0_0.mesh', mimeType: 'application/octet-stream', buffer: meshFixture() });
  await page.locator('#mirror-action').click();
  await page.locator('#component-search').fill('engine');
  await page.locator('[data-id="engine"]').click();
  await page.locator('canvas').hover({ position: { x: 540, y: 400 } });
  await page.keyboard.press('k');
  await page.locator('canvas').click({ position: { x: 540, y: 400 } });
  await expect(page.locator('#object-count')).toHaveText('2 个组件');
  const initial = await saveProject(page);
  const source = initial.objects.find(object => !object.mirror);
  const mirror = initial.objects.find(object => object.mirror);
  expect(mirror.position.x).toBeCloseTo(-source.position.x);
  expect(mirror.rotation.y).toBeCloseTo(-source.rotation.y);
  await openRightSidebar(page); await page.locator('#right-tab-inspector').click();
  const sourceX = Math.round(source.position.x / .08);
  const x = page.getByRole('spinbutton', { name: 'position-x', exact: true });
  await x.fill(String(sourceX + 3)); await x.press('Enter');
  let changed = await saveProject(page);
  expect(changed.objects.find(object => object.id === source.id).position.x).toBeCloseTo((sourceX + 3) * .08);
  expect(changed.objects.find(object => object.id === mirror.id).position.x).toBeCloseTo(-(sourceX + 3) * .08);
  const y = page.getByRole('spinbutton', { name: 'position-y', exact: true });
  await y.fill('2'); await y.press('Enter');
  changed = await saveProject(page);
  expect(changed.objects[0].position.y).toBeCloseTo(.16);
  expect(changed.objects[1].position.y).toBeCloseTo(.16);
  const yaw = page.getByRole('spinbutton', { name: 'rotation-y', exact: true });
  await yaw.fill('180'); await yaw.press('Enter');
  changed = await saveProject(page);
  expect(changed.objects.find(object => object.id === source.id).rotation.y).toBeCloseTo(Math.PI);
  expect(changed.objects.find(object => object.id === mirror.id).rotation.y).toBeCloseTo(-Math.PI);
  const roll = page.getByRole('spinbutton', { name: 'rotation-x', exact: true });
  await roll.fill('45'); await roll.press('Enter');
  changed = await saveProject(page);
  expect(changed.objects.find(object => object.id === source.id).rotation.x).toBeCloseTo(Math.PI / 4);
  expect(changed.objects.find(object => object.id === mirror.id).rotation.x).toBeCloseTo(Math.PI / 4);
  await page.locator('#undo-btn').click();
  changed = await saveProject(page);
  expect(changed.objects.find(object => object.id === source.id).rotation.x).toBeCloseTo(0);
  expect(changed.objects.find(object => object.id === mirror.id).rotation.x).toBeCloseTo(0);
  await page.locator('#redo-btn').click();
  changed = await saveProject(page);
  expect(changed.objects.find(object => object.id === mirror.id).rotation.x).toBeCloseTo(Math.PI / 4);
  expect(errors).toEqual([]);
});

test('Shift click multi-selection batches structural actions into one history entry', async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  const canvas = page.locator('canvas');
  await page.locator('#mesh-input').setInputFiles({ name: 'engine_block_a_0_0_0.mesh', mimeType: 'application/octet-stream', buffer: meshFixture() });
  await page.locator('#component-search').fill('engine');
  await page.locator('[data-id="engine"]').click();
  await canvas.click({ position: { x: 380, y: 400 } });
  await expect(page.locator('#undo-btn')).toBeEnabled();
  await page.locator('[data-id="engine"]').click();
  await canvas.click({ position: { x: 680, y: 400 } });
  await expect(page.locator('#object-count')).toHaveText('2 个组件');
  await canvas.click({ position: { x: 380, y: 400 } });
  await page.keyboard.down('Shift'); await canvas.click({ position: { x: 680, y: 400 } }); await page.keyboard.up('Shift');
  await expect(page.locator('#inspector-content')).toContainText('已选择 2 个组件');
  await page.locator('#copy-action').click();
  await expect(page.locator('#object-count')).toHaveText('4 个组件');
  await page.locator('#undo-btn').click();
  await expect(page.locator('#object-count')).toHaveText('2 个组件');
  await page.locator('#redo-btn').click();
  await expect(page.locator('#object-count')).toHaveText('4 个组件');
});

test('erase tool deletes only its highlighted component from a multi-selection', async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  const canvas = page.locator('canvas');
  await page.locator('#mesh-input').setInputFiles({ name: 'engine_block_a_0_0_0.mesh', mimeType: 'application/octet-stream', buffer: meshFixture() });
  await page.locator('#component-search').fill('engine');
  for (const x of [380, 680]) {
    await page.locator('[data-id="engine"]').click();
    await canvas.click({ position: { x, y: 400 } });
  }
  const before = await saveProject(page);
  await canvas.click({ position: { x: 380, y: 400 } });
  await page.keyboard.down('Shift'); await canvas.click({ position: { x: 680, y: 400 } }); await page.keyboard.up('Shift');
  await expect(page.locator('#inspector-content')).toContainText('已选择 2 个组件');
  await page.locator('[data-tool="erase"]').click();
  await canvas.hover({ position: { x: 380, y: 400 } });
  await expect(page.locator('#viewport')).toHaveAttribute('data-interaction-highlight-count', '1');
  await canvas.click({ position: { x: 380, y: 400 } });
  await expect(page.locator('#object-count')).toHaveText('1 个组件');
  await expect(page.locator('#viewport')).toHaveAttribute('data-interaction-highlight-count', '0');
  expect((await saveProject(page)).objects.map(object => object.id)).toEqual([before.objects[1].id]);
});

test('native JSON maps through the domain model and imports components', async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  await expect(page.locator('#native-export-btn')).toBeEnabled();
  const freshNativeDownloads = [];
  page.on('download', download => freshNativeDownloads.push(download));
  await expect(page.locator('#project-name')).toHaveValue('anymaker-vehicle');
  await page.locator('#project-name').fill('My: Vehicle');
  await page.locator('#project-name').press('Tab');
  await page.locator('#save-btn').click();
  await expect.poll(() => freshNativeDownloads.length).toBe(2);
  expect((await Promise.all(freshNativeDownloads.map(download => download.suggestedFilename()))).sort()).toEqual(['My_ Vehicle.data', 'My_ Vehicle.meta']);
  await page.locator('#library-btn').click();
  await expect(page.locator('#right-sidebar')).toBeVisible();
  await expect(page.locator('#right-tab-resources')).toHaveAttribute('aria-selected', 'true');
  await expect(page.locator('#resources-tab-panel')).toBeVisible();
  const native = {
    definitions: { components: ['engine'] },
    vehicles: { vehicles: [{ id: 9, transform: { m: [1, 0, 0, 0, 1, 0, 0, 0, 1], t: [0, 0, 0] }, nodes: [], edges: [], plates: [], grids: [{ components: [{ def: 0, id: 3, pos: [0, 0, 0] }] }], electric_links: [], mechanical_links: [], liquid_links: [], gas_links: [], belt_links: [], data_links: [] }] },
  };
  const meta = { bounds: { min: [0, 0, 0], max: [1, 1, 1] } };
  await page.locator('#native-input').setInputFiles([
    { name: 'vehicle.data', mimeType: 'application/json', buffer: Buffer.from(JSON.stringify(native)) },
    { name: 'vehicle.meta', mimeType: 'application/json', buffer: Buffer.from(JSON.stringify(meta)) },
  ]);
  await expect(page.locator('#project-name')).toHaveValue('vehicle');
  await expect(page.locator('#object-count')).toHaveText('1 个组件', { timeout: 30000 });
  await expect(page.locator('#native-summary')).toContainText('已导入 vehicle.data / vehicle.meta');
  await expect(page.locator('#native-import-btn')).toHaveCount(0);
  await expect(page.locator('#native-export-btn')).toBeEnabled();
  await page.locator('#left-tab-subgrids').click();
  const subgrid = page.locator('.subgrid-row', { hasText: '主载具 9' });
  await expect(subgrid).toContainText('1 网格 · 1 组件 · 可见');
  await subgrid.getByRole('button', { name: '隐藏' }).click();
  await expect(subgrid.getByRole('button', { name: '取消隐藏' })).toBeVisible();
  let subgridProject = await saveProject(page);
  expect(subgridProject.objects[0].hidden).toBe(true);
  await subgrid.getByRole('button', { name: '取消隐藏' }).click();
  subgridProject = await saveProject(page);
  expect(subgridProject.objects[0].hidden).toBeUndefined();
  const nativeDownloads = [];
  page.on('download', download => nativeDownloads.push(download));
  await page.locator('#save-btn').click();
  await expect.poll(() => nativeDownloads.length).toBe(2);
  expect((await Promise.all(nativeDownloads.map(download => download.suggestedFilename()))).sort()).toEqual(['vehicle.data', 'vehicle.meta']);
  await page.locator('#native-input').setInputFiles({ name: 'other.data', mimeType: 'application/json', buffer: Buffer.from(JSON.stringify(native)) });
  await expect(page.locator('#native-export-btn')).toBeEnabled();
  await expect(page.locator('#native-summary')).toContainText('请同时选择一份 .data 和一份 .meta 文件');
});

test('native import centers a half-cell-wide structure without moving nodes off the construction grid', async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  const native = {
    definitions: { components: [] },
    vehicles: { vehicles: [{
      id: 1,
      transform: { m: [1, 0, 0, 0, 1, 0, 0, 0, 1], t: [0, 0, 0] },
      nodes: [{ id: 1, pos: [0, 0, 0] }, { id: 2, pos: [3, 0, 0] }],
      edges: [{ n0: 1, n1: 2 }],
      plates: [], grids: [{ components: [] }],
    }] },
  };
  await page.locator('#native-input').setInputFiles([
    { name: 'half-cell.data', mimeType: 'application/json', buffer: Buffer.from(JSON.stringify(native)) },
    { name: 'half-cell.meta', mimeType: 'application/json', buffer: Buffer.from('{}') },
  ]);
  await expect(page.locator('#topology-count')).toContainText('2 节点');
  const imported = await saveProject(page);
  expect(imported.topology.edges).toHaveLength(1);
  const xPositions = imported.topology.nodes.map(node => node.position.x).sort((a, b) => a - b);
  expect(xPositions[1] - xPositions[0]).toBeCloseTo(3 * .08, 10);
  for (const node of imported.topology.nodes) for (const axis of ['x', 'y', 'z']) {
    expect(node.position[axis] / .08).toBeCloseTo(Math.round(node.position[axis] / .08), 6);
  }
  await page.locator('#left-tab-subgrids').click();
  await page.locator('#subgrid-check-btn').click();
  await expect(page.locator('#subgrid-summary')).toHaveAttribute('data-subgrid-valid', 'true');
  await expect(page.locator('#subgrid-summary')).toHaveText('子网格检查结果：1 个子网格；0 个错误；0 个警告');
  await expect(page.locator('#save-status')).toHaveText('子网格检查完成：1 个子网格；0 个错误；0 个警告');
  await expect(page.locator('#viewport')).toHaveAttribute('data-subgrid-error-marker-count', '0');
  await expect(page.locator('#subgrid-error-markers .subgrid-error-marker')).toHaveCount(0);
  await expect(page.locator('#subgrid-diagnostics')).toBeHidden();
  await page.locator('#subgrid-error-toggle').uncheck();
  await expect(page.locator('#subgrid-error-markers')).toBeHidden();
  await page.locator('#subgrid-error-toggle').check();
  await expect(page.locator('#subgrid-error-markers .subgrid-error-marker')).toHaveCount(0);
  await page.locator('#language-select').selectOption('en');
  await expect(page.locator('#subgrid-summary')).toHaveText('Subgrid check: 1 subgrid(s); 0 error(s); 0 warning(s)');
  await page.locator('#subgrid-check-btn').click();
  await expect(page.locator('#save-status')).toHaveText('Subgrid check complete: 1 subgrid(s); 0 error(s); 0 warning(s)');
  await page.locator('#new-btn').click();
  await expect(page.locator('#subgrid-diagnostics')).toBeHidden();
  await expect(page.locator('#subgrid-error-markers .subgrid-error-marker')).toHaveCount(0);
  await page.locator('#undo-btn').click();
  await expect(page.locator('#subgrid-error-markers .subgrid-error-marker')).toHaveCount(0);
});

test('native pair downloads directly while XML still uses a save path', async ({ page }) => {
  await page.addInitScript(() => {
    window.savedFiles = [];
    const fileHandle = name => ({
      async createWritable() {
        return { async write(content) { window.savedFiles.push({ name, content }); }, async close() {} };
      },
    });
    window.showDirectoryPicker = async () => { throw new Error('Native save must not open a directory picker'); };
    window.showSaveFilePicker = async options => {
      window.fileOptions = options;
      return fileHandle(options.suggestedName);
    };
  });
  await page.goto('./');
  await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  await page.locator('#project-name').fill('Chosen Vehicle');
  await page.locator('#project-name').press('Tab');
  const nativeDownloads = [];
  page.on('download', download => nativeDownloads.push(download));
  await page.locator('#save-btn').click();
  await expect.poll(() => nativeDownloads.length).toBe(2);
  const nativeFiles = await Promise.all(nativeDownloads.map(async download => {
    const stream = await download.createReadStream(); let content = '';
    for await (const chunk of stream) content += chunk;
    return { name: download.suggestedFilename(), content: JSON.parse(content) };
  }));
  expect(nativeFiles.map(file => file.name)).toEqual(['Chosen Vehicle.data', 'Chosen Vehicle.meta']);
  expect(nativeFiles[0].content).toHaveProperty('vehicles');
  expect(nativeFiles[1].content.vehicles.vehicles[0]).toHaveProperty('bounds');

  await openRightSidebar(page);
  await page.locator('#right-tab-resources').click();
  await page.locator('#export-btn').click();
  await expect.poll(() => page.evaluate(() => window.savedFiles.length)).toBe(1);
  const xml = await page.evaluate(() => ({ file: window.savedFiles[0], options: window.fileOptions }));
  expect(xml.file.name).toBe('Chosen Vehicle.xml');
  expect(xml.file.content).toContain('game-compatible="false"');
  expect(xml.options.suggestedName).toBe('Chosen Vehicle.xml');
});

test('native vehicle can be staged as a ghost subgrid and placed into the current project', async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  await page.locator('#language-select').selectOption('en');
  const native = {
    definitions: { components: ['engine'] },
    vehicles: { vehicles: [{ id: 12, transform: { m: [1, 0, 0, 0, 1, 0, 0, 0, 1], t: [0, 0, 0] }, nodes: [], edges: [], plates: [], grids: [{ components: [{ def: 0, id: 3, pos: [0, 0, 0] }, { def: 0, id: 4, pos: [2, 0, 0] }] }], electric_links: [], mechanical_links: [], liquid_links: [], gas_links: [], belt_links: [], data_links: [] }] },
  };
  const meta = { bounds: { min: [0, 0, 0], max: [1, 1, 1] } };
  await page.locator('#subgrid-import-btn').click();
  await page.locator('#native-subgrid-input').setInputFiles([
    { name: 'addon.data', mimeType: 'application/json', buffer: Buffer.from(JSON.stringify(native)) },
    { name: 'addon.meta', mimeType: 'application/json', buffer: Buffer.from(JSON.stringify(meta)) },
  ]);
  await expect(page.locator('#save-status')).toContainText('Loaded addon.data as a subgrid ghost', { timeout: 30000 });
  await page.locator('canvas').click({ position: { x: 620, y: 440 } });
  await expect(page.locator('#object-count')).toHaveText('2 components');
  await expect(page.locator('#tools [data-tool="translate"]')).toHaveClass(/active/);
  const saved = await saveProject(page);
  expect(new Set(saved.objects.map(object => object.gridId))).toEqual(new Set(['imported-vehicle-1']));
  expect(saved.grids).toContainEqual({ id: 'imported-vehicle-1' });
});

test('multi-selection paints and deletes every selected component from the keyboard', async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  await page.locator('#mesh-input').setInputFiles({ name: 'engine_block_a_0_0_0.mesh', mimeType: 'application/octet-stream', buffer: meshFixture() });
  const canvas = page.locator('canvas');
  await page.locator('#component-search').fill('engine');
  for (const x of [380, 680]) {
    await page.locator('[data-id="engine"]').click();
    await canvas.click({ position: { x, y: 400 } });
  }
  await page.locator('[data-tool="select"]').click();
  await canvas.click({ position: { x: 380, y: 400 } });
  await page.keyboard.down('Shift'); await canvas.click({ position: { x: 680, y: 400 } }); await page.keyboard.up('Shift');
  await expect(page.locator('#inspector-content')).toContainText('已选择 2 个组件');
  await page.keyboard.press('c');
  const painted = await saveProject(page);
  expect(painted.objects).toHaveLength(2);
  expect(painted.objects.every(object => object.paintColor === '#dddddd')).toBe(true);
  await page.keyboard.press('Delete');
  await expect(page.locator('#object-count')).toHaveText('0 个组件');
  await page.locator('#undo-btn').click();
  await expect(page.locator('#object-count')).toHaveText('2 个组件');
});

test('subgrid list deletes an authored subgrid as one undoable action', async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  await page.locator('#left-tab-subgrids').click();
  await page.locator('#subgrid-new-id').fill('temporary-grid');
  await page.locator('#subgrid-create-btn').click();
  const row = page.locator('.subgrid-row', { hasText: 'Grid temporary-grid' });
  await expect(row).toBeVisible();
  page.once('dialog', dialog => dialog.accept());
  await row.locator('.subgrid-delete').click();
  await expect(row).toHaveCount(0);
  const saved = await saveProject(page);
  expect(saved.grids.map(grid => grid.id)).toEqual(['grid-1']);
  await page.locator('#undo-btn').click();
  await expect(page.locator('.subgrid-row', { hasText: 'Grid temporary-grid' })).toBeVisible();
});

test('extendable components expose native linear dimensions instead of transform scale', async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  await page.locator('#language-select').selectOption('en');
  const component = { id: 'shaft', type: 'drive_shaft', gridId: 'grid-1', position: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 }, scale: { x: 1, y: 1, z: 1 } };
  await page.locator('#file-input').setInputFiles({ name: 'shaft.json', mimeType: 'application/json', buffer: Buffer.from(JSON.stringify({ format: 'anymaker-web-project', version: 1, objects: [component] })) });
  await expect(page.locator('#object-count')).toHaveText('1 components');
  const canvas = page.locator('canvas'); const bounds = await canvas.boundingBox();
  await canvas.click({ position: { x: bounds.width / 2, y: bounds.height / 2 } });
  await openRightSidebar(page); await page.locator('#right-tab-inspector').click();
  await expect(page.locator('#inspector-content')).toContainText('Linear size');
  const input = page.locator('input[aria-label="Linear size Z"]');
  // The control includes the one-cell base; nativeExtension stores only the added cells.
  await expect(input).toHaveValue('1');
  await input.fill('3'); await input.press('Tab');
  await expect(input).toHaveValue('3');
  const document = await page.evaluate(() => {
    window.dispatchEvent(new Event('pagehide'));
    return JSON.parse(localStorage.getItem('anymaker:' + location.pathname + ':autosave:v1')).document;
  });
  expect(document.objects[0].nativeExtension).toEqual([0, 0, 2]);
});

test('extension handles cross the base length and commit the compensating position', async ({ page }) => {
  await observeRendering(page);
  await page.goto('./');
  await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  await page.locator('#language-select').selectOption('en');
  const component = { id: 'shaft', type: 'drive_shaft', gridId: 'grid-1', position: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 }, scale: { x: 1, y: 1, z: 1 } };
  await page.locator('#file-input').setInputFiles({ name: 'shaft-reverse.json', mimeType: 'application/json', buffer: Buffer.from(JSON.stringify({ format: 'anymaker-web-project', version: 1, objects: [component] })) });
  await page.locator('[data-tool="select"]').click();
  const point = await projectWorldPoint(page, component.position);
  await page.mouse.click(point.x, point.y);
  await expect.poll(() => page.evaluate(() => !!window.__renderTestState.scene.getObjectByName('component-extension-handle'))).toBe(true);
  const preview = await page.evaluate(async () => {
    const { scene } = window.__renderTestState;
    const controls = scene.children.find(object => object.isTransformControlsRoot).controls;
    const handle = scene.getObjectByName('component-extension-handle');
    controls.axis = 'Z';
    controls.dispatchEvent({ type: 'dragging-changed', value: true });
    handle.position.z = -.12;
    controls.dispatchEvent({ type: 'objectChange' });
    await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    const object = scene.children.find(value => value.userData.id === 'shaft');
    const result = { handle: handle.position.toArray(), position: object.position.toArray() };
    controls.dispatchEvent({ type: 'dragging-changed', value: false });
    return result;
  });
  expect(preview.handle[0]).toBeCloseTo(0);
  expect(preview.handle[1]).toBeCloseTo(0);
  expect(preview.handle[2]).toBeCloseTo(.2);
  expect(preview.position[0]).toBeCloseTo(0);
  expect(preview.position[1]).toBeCloseTo(0);
  expect(preview.position[2]).toBeCloseTo(-.32);
  await page.waitForTimeout(300);
  const saved = await saveProject(page);
  expect(saved.objects[0].nativeExtension).toEqual([0, 0, 2]);
  expect(saved.objects[0].position).toEqual({ x: 0, y: 0, z: -.32 });
  await page.locator('#undo-btn').click();
  const undone = await saveProject(page);
  expect(undone.objects[0].nativeExtension).toBeUndefined();
  expect(undone.objects[0].position).toEqual({ x: 0, y: 0, z: 0 });
});

test('tank capacity includes base cells as well as native extensions', async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  await page.locator('#language-select').selectOption('en');
  const tank = { id: 'tank', type: 'liquid_tank', gridId: 'grid-1', position: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 }, scale: { x: 1, y: 1, z: 1 }, nativeExtension: [0, 1, 2] };
  await page.locator('#file-input').setInputFiles({ name: 'tank.json', mimeType: 'application/json', buffer: Buffer.from(JSON.stringify({ format: 'anymaker-web-project', version: 1, objects: [tank] })) });
  await expect(page.locator('#object-count')).toHaveText('1 components');
  const canvas = page.locator('canvas'); const bounds = await canvas.boundingBox();
  await canvas.click({ position: { x: bounds.width / 2, y: bounds.height / 2 } });
  await openRightSidebar(page); await page.locator('#right-tab-inspector').click();
  await expect(page.getByTestId('tank-capacity')).toHaveText('Max capacity: 12 L (24 cells × 0.5 L)');
});

test('microcontroller saves script and typed global variables without executing code', async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  await page.locator('#language-select').selectOption('en');
  await page.locator('#component-search').fill('microcontroller');
  await page.locator('[data-id="microcontroller"]').click();
  await page.locator('canvas').click({ position: { x: 500, y: 420 } });
  await openRightSidebar(page); await page.locator('#right-tab-inspector').click();
  const inspector = page.locator('#inspector-content');
  const script = inspector.getByRole('textbox', { name: 'Microcontroller script' });
  await expect(script).toBeVisible();
  await script.fill('on_tick\n{\n  out Display.value = 1.0\n}');
  await script.press('Tab');
  const privateVariables = inspector.locator('details.microcontroller-variables').nth(2);
  await privateVariables.locator('summary').click();
  await privateVariables.getByRole('button', { name: 'Add variable' }).click();
  await privateVariables.locator('summary').click();
  const name = privateVariables.getByRole('textbox', { name: 'Private variables name' });
  await name.fill('fuel_ratio'); await name.press('Tab');
  const saved = await page.evaluate(() => {
    window.dispatchEvent(new Event('pagehide'));
    return JSON.parse(localStorage.getItem('anymaker:' + location.pathname + ':autosave:v1')).document;
  });
  expect(saved.objects[0].nativeProperties).toEqual({
    script: 'on_tick\n{\n  out Display.value = 1.0\n}',
    global_inputs: [], global_outputs: [],
    global_private: [{ name: 'fuel_ratio', data_value: { _type: 'f64', data_value: 0 } }],
  });
});

test('history drawer restores a committed snapshot and viewport reports vehicle size', async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  await page.locator('#component-search').fill('engine');
  await page.locator('[data-id="engine"]').click();
  await page.locator('canvas').click({ position: { x: 440, y: 420 } });
  await expect(page.locator('#vehicle-size')).toContainText('载具尺寸');
  await expect(page.locator('#vehicle-size')).toContainText('cm');
  await openRightSidebar(page);
  await page.locator('#right-tab-history').click();
  await expect(page.locator('#history-list .history-entry')).toHaveCount(2);
  await page.locator('#history-list .history-entry').nth(1).click();
  await expect(page.locator('#object-count')).toHaveText('0 个组件');
  await expect(page.locator('#vehicle-size')).toContainText('空载具');
});

test('paint and connection context toolbars expose saved colors, network ports and selection highlighting', async ({ page }) => {
  await observeRendering(page);
  await page.goto('./');
  await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  await expect(page.locator('#selection-filter-toolbar')).toBeVisible();
  const filterBounds = await page.locator('#selection-filter-toolbar').boundingBox();
  const toolbarBounds = await page.locator('.top-tool-section').boundingBox();
  const viewportStartBounds = await page.locator('#viewport').boundingBox();
  expect(Math.abs(filterBounds.y - toolbarBounds.y)).toBeLessThan(1);
  expect(filterBounds.x).toBeGreaterThanOrEqual(viewportStartBounds.x);
  expect(filterBounds.x + filterBounds.width).toBeLessThanOrEqual(toolbarBounds.x);
  await page.locator('#right-sidebar-toggle').click();
  const openSidebarFilterBounds = await page.locator('#selection-filter-toolbar').boundingBox();
  const openToolbarBounds = await page.locator('.top-tool-section').boundingBox();
  expect(Math.abs(openSidebarFilterBounds.y - openToolbarBounds.y)).toBeLessThan(1);
  expect(openSidebarFilterBounds.x + openSidebarFilterBounds.width).toBeLessThanOrEqual(openToolbarBounds.x);
  await page.locator('#right-sidebar-toggle').click();
  await expect(page.locator('#selection-filter-toolbar [data-selectable-kind]')).toHaveCount(6);
  await expect(page.locator('#selection-filter-toggle')).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('#selection-filter-options')).toBeHidden();
  await page.locator('#selection-filter-toggle').click();
  await expect(page.locator('#selection-filter-toggle')).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('#selection-filter-options')).toBeVisible();
  await expect(page.locator('[data-selectable-kind="structure"]')).toBeChecked();
  await page.locator('#selection-filter-toolbar [data-selectable-kind="edge"]').uncheck();
  await expect(page.locator('#selection-filter-toolbar [data-selectable-kind="edge"]')).not.toBeChecked();
  await page.locator('#selection-filter-toolbar [data-selectable-kind="edge"]').check();
  const connectionVisibilityToggle = page.locator('#connection-visibility-toggle');
  await expect(connectionVisibilityToggle).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('#connection-visibility-options')).toBeHidden();
  await connectionVisibilityToggle.click();
  await expect(connectionVisibilityToggle).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('#connection-visibility-options [data-connection-kind]')).toHaveCount(6);
  await expect(page.locator('#connection-visibility-options [data-connection-kind]:checked')).toHaveCount(6);
  await page.locator('[data-connection-kind="liquid"]').uncheck();
  await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('anymaker:' + location.pathname + ':settings:v1'))?.connectionVisibility?.liquid)).toBe(false);
  const canvas = page.locator('canvas');
  await page.locator('#component-search').fill('electric_port_straight');
  await page.locator('[data-id="electric_port_straight"]').click();
  await canvas.click({ position: { x: 420, y: 420 } });
  await expect(page.locator('#viewport')).toHaveAttribute('data-interaction-highlight-count', '1');
  for (const tool of ['translate', 'rotate', 'scale', 'hide']) {
    await page.locator(`[data-tool="${tool}"]`).click();
    await canvas.hover({ position: { x: 420, y: 420 } });
    await expect.poll(() => page.locator('#viewport').getAttribute('data-interaction-highlight-count').then(Number)).toBeGreaterThanOrEqual(1);
  }

  await page.locator('[data-tool="paint"]').click();
  await expect(page.locator('#paint-toolbar')).toBeVisible();
  const paintToolbarBounds = await page.locator('#paint-toolbar').boundingBox();
  const viewportBounds = await page.locator('#viewport').boundingBox();
  expect(Math.abs((paintToolbarBounds.x + paintToolbarBounds.width / 2) - (viewportBounds.x + viewportBounds.width / 2))).toBeLessThan(1);
  await page.locator('#official-palette-toggle').click();
  await expect(page.locator('#official-palette .official-palette-swatch')).toHaveCount(85);
  await page.locator('#official-palette [data-index="26"]').click();
  await expect(page.locator('#paint-toolbar-hex')).toHaveValue('#861a22');
  await expect(page.locator('#official-palette-toggle')).toHaveAttribute('aria-expanded', 'false');
  await canvas.hover({ position: { x: 420, y: 420 } });
  await expect(page.locator('#viewport')).toHaveAttribute('data-interaction-highlight-count', '1');
  await page.locator('#paint-toolbar-hex').fill('#7c3aed');
  await page.locator('#paint-toolbar-hex').press('Tab');
  await page.locator('#save-paint-quick-color').click();
  await expect(page.locator('#paint-quick-colors')).toContainText('#7c3aed');
  await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('anymaker:' + location.pathname + ':settings:v1'))?.paintQuickColors?.includes('#7c3aed') ?? false)).toBe(true);
  await page.locator('#paint-quick-colors .quick-color-item', { hasText: '#7c3aed' }).locator('.quick-color-remove').click();
  await expect(page.locator('#paint-quick-colors')).not.toContainText('#7c3aed');

  await page.locator('[data-tool="connect"]').click();
  await expect(page.locator('#connection-toolbar')).toBeVisible();
  await expect(page.locator('#viewport')).toHaveAttribute('data-connection-port-count', '1');
  await expect(page.locator('#viewport')).toHaveAttribute('data-connection-port-colors', '#ff3131');
  await expect.poll(() => page.evaluate(() => {
    const layer = window.__renderTestState.scene.getObjectByName('connection-ports');
    return layer?.getObjectsByProperty('name', 'connection-port-direction-arrow').length || 0;
  })).toBe(1);
  await page.locator('#connection-kind-buttons [data-kind="liquid"]').click();
  await expect(page.locator('#connection-kind-buttons [data-kind="liquid"]')).toHaveClass(/active/);
  await expect(page.locator('#viewport')).toHaveAttribute('data-connection-port-count', '0');
  await expect(page.locator('#viewport')).toHaveAttribute('data-connection-port-colors', '');

  await page.reload();
  await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  await page.locator('[data-tool="paint"]').click();
  await expect(page.locator('#paint-quick-colors')).not.toContainText('#7c3aed');
});

test('project restore removes unrenderable and oversized connections', async ({ page }) => {
  const errors = []; page.on('pageerror', error => errors.push(error.message));
  await page.goto('./');
  await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  const component = (id, x) => ({
    id, type: 'electric_port_straight', position: { x, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 }, scale: { x: 1, y: 1, z: 1 },
  });
  const link = (id, points, port = 0) => ({
    id, kind: 'electric', from: { componentId: 'source', port: 0 },
    to: { componentId: 'target', port }, points,
  });
  const document = {
    format: 'anymaker-web-project', version: 1,
    objects: [component('source', 0), component('target', .8)],
    topology: { nodes: [], edges: [], plates: [], links: [
      link('valid', []), link('missing-port', [], 255), link('oversized', [{ x: 128, y: 0, z: 0 }]),
    ] },
  };
  await page.locator('#file-input').setInputFiles({ name: 'connections.json', mimeType: 'application/json', buffer: Buffer.from(JSON.stringify(document)) });
  await expect(page.locator('#object-count')).toContainText('2');
  const saved = await page.evaluate(() => {
    window.dispatchEvent(new Event('pagehide'));
    return JSON.parse(localStorage.getItem('anymaker:' + location.pathname + ':autosave:v1')).document;
  });
  expect(saved.topology.links.map(link => link.id)).toEqual(['valid']);
  expect(errors).toEqual([]);
});

test('registered reference vehicle imports every component and structural record', async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  await page.locator('#native-input').setInputFiles([
    'test-vehicle/vehicle.data',
    'test-vehicle/vehicle.meta',
  ]);
  await expect(page.locator('#object-count')).toHaveText('159 个组件', { timeout: 60000 });
  await expect(page.locator('#topology-count')).toHaveText('271 节点 · 493 梁 · 138 面板 · 73 连接');
  await expect(page.locator('#native-reference-preview-btn')).toHaveAttribute('aria-pressed', 'false');
  await expect(page.locator('#orientation-indicator')).toBeVisible();
  await expect(page.locator('.top-tool-section')).toBeVisible();
  // Read the committed scene snapshot after import; counts alone cannot catch
  // surface-grid handles floating outside the doors.
  const imported = await page.evaluate(() => {
    window.dispatchEvent(new Event('pagehide'));
    return JSON.parse(localStorage.getItem('anymaker:' + location.pathname + ':autosave:v1')).document;
  });
  const evidence = JSON.parse(readFileSync(new URL('../../doc/evidence/native-grid-transform.json', import.meta.url)));
  // Import recenters the whole assembly at the editor origin. Compare to the
  // main vehicle's hinge pin so the rendering bounds do not affect this check.
  const hinge = imported.objects.find(object => object.id === '553:grid-553-1:113');
  const hingePosition = [6.8, 1.6, 19.6];
  for (const expected of evidence.referenceComponents) {
    const handle = imported.objects.find(object => object.id === expected.id);
    expect(handle.type).toBe('mechanical_handle');
    // The evidence uses native coordinates; the editor reflects X (see the domain-model unit test).
    for (const [index, axis] of ['x', 'y', 'z'].entries()) expect(handle.position[axis] - hinge.position[axis]).toBeCloseTo((axis === 'x' ? -1 : 1) * (expected.worldPosition[index] - hingePosition[index]), 10);
  }
  await page.locator('canvas').screenshot({ path: 'test-results/reference-vehicle-import.png' });
  await page.locator('#library-btn').click();
  await page.locator('#native-reference-preview-btn').click();
  await page.locator('canvas').screenshot({ path: 'test-results/reference-vehicle-door-handles.png' });
});

test('editor history atomically restores interleaved component and topology actions', async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  const canvas = page.locator('canvas');
  await page.locator('[data-tool="node"]').click();
  await canvas.click({ position: { x: 500, y: 450 } });
  await expect(page.locator('#topology-count')).toHaveText('1 节点 · 0 梁 · 0 面板');
  await page.locator('#mesh-input').setInputFiles({ name: 'engine_block_a_0_0_0.mesh', mimeType: 'application/octet-stream', buffer: meshFixture() });
  await page.locator('#component-search').fill('engine');
  await page.locator('[data-id="engine"]').click();
  await canvas.click({ position: { x: 620, y: 450 } });
  await expect(page.locator('#object-count')).toHaveText('1 个组件');
  await page.locator('#undo-btn').click();
  await expect(page.locator('#object-count')).toHaveText('0 个组件');
  await expect(page.locator('#topology-count')).toHaveText('1 节点 · 0 梁 · 0 面板');
  await page.locator('#undo-btn').click();
  await expect(page.locator('#topology-count')).toHaveText('0 节点 · 0 梁 · 0 面板');
  await page.locator('#redo-btn').click();
  await expect(page.locator('#topology-count')).toHaveText('1 节点 · 0 梁 · 0 面板');
  await page.locator('#redo-btn').click();
  await expect(page.locator('#object-count')).toHaveText('1 个组件');
  await expect(page.locator('#topology-count')).toHaveText('1 节点 · 0 梁 · 0 面板');
  page.once('dialog', dialog => dialog.accept());
  await page.locator('#new-btn').click();
  await expect(page.locator('#object-count')).toHaveText('0 个组件');
  await expect(page.locator('#topology-count')).toHaveText('0 节点 · 0 梁 · 0 面板');
  await page.locator('#undo-btn').click();
  await expect(page.locator('#object-count')).toHaveText('1 个组件');
  await expect(page.locator('#topology-count')).toHaveText('1 节点 · 0 梁 · 0 面板');
});

test('topology tools create nodes and an edge in the viewport', async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  const canvas = page.locator('canvas');
  await page.locator('[data-tool="node"]').click();
  await canvas.click({ position: { x: 500, y: 450 } });
  await canvas.click({ position: { x: 620, y: 450 } });
  await expect(page.locator('#topology-count')).toHaveText('2 节点 · 0 梁 · 0 面板');
  await page.locator('[data-tool="edge"]').click();
  await canvas.click({ position: { x: 500, y: 450 } });
  await canvas.click({ position: { x: 620, y: 450 } });
  await expect(page.locator('#topology-count')).toHaveText('2 节点 · 1 梁 · 0 面板');
  await openRightSidebar(page);
  await page.locator('#edge-lengths-visible').check();
  await expect(page.locator('.edge-length-label')).toHaveCount(1);
  await expect(page.locator('.edge-length-label')).toBeVisible();
  await expect(page.locator('.edge-length-label')).toContainText('X');
  await page.locator('#edge-lengths-visible').uncheck();
  await expect(page.locator('#edge-length-labels')).toBeHidden();
  await page.locator('#undo-btn').click();
  await expect(page.locator('#topology-count')).toHaveText('2 节点 · 0 梁 · 0 面板');
});

test('hide tool persists component and edge visibility and restores all hidden objects', async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  const canvas = page.locator('canvas');
  await page.locator('[data-tool="node"]').click();
  await canvas.click({ position: { x: 500, y: 450 } });
  await canvas.click({ position: { x: 620, y: 450 } });
  await page.locator('[data-tool="edge"]').click();
  await canvas.click({ position: { x: 500, y: 450 } });
  await canvas.click({ position: { x: 620, y: 450 } });
  await page.locator('[data-tool="hide"]').click();
  await canvas.click({ position: { x: 560, y: 450 } });
  await expect(page.locator('#restore-transparency')).toBeVisible();
  let saved = await saveProject(page);
  expect(saved.topology.edges[0].hidden).toBe(true);
  await page.locator('#restore-transparency').click();
  await expect(page.locator('#restore-transparency')).toBeHidden();
  saved = await saveProject(page);
  expect(saved.topology.edges[0].hidden).toBeUndefined();

  await page.locator('#component-search').fill('engine');
  await page.locator('[data-id="engine"]').click();
  await canvas.click({ position: { x: 740, y: 540 } });
  await expect(page.locator('#object-count')).toHaveText('1 个组件');
  await page.locator('[data-tool="hide"]').click();
  await expect(page.locator('[data-tool="hide"]')).toHaveClass(/active/);
  await canvas.click({ position: { x: 740, y: 540 } });
  saved = await saveProject(page);
  expect(saved.objects[0].hidden).toBe(true);
  await expect(page.locator('#restore-transparency')).toBeVisible();
  await page.locator('#restore-transparency').click();
  saved = await saveProject(page);
  expect(saved.objects[0].hidden).toBeUndefined();
});

test('hide toolbar saves the current hidden objects as a visibility group and reapplies it', async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  const canvas = page.locator('canvas');
  await page.locator('#mesh-input').setInputFiles({ name: 'engine_block_a_0_0_0.mesh', mimeType: 'application/octet-stream', buffer: meshFixture() });
  await page.locator('#component-search').fill('engine');
  await page.locator('[data-id="engine"]').click();
  await canvas.click({ position: { x: 560, y: 420 } });
  await page.locator('[data-tool="hide"]').click();
  await canvas.click({ position: { x: 560, y: 420 } });
  await expect(page.locator('#restore-transparency')).toBeVisible();
  await expect(page.locator('#transparency-toolbar')).toBeVisible();
  await page.locator('#transparency-group-name').fill('engine group');
  await page.locator('#save-transparency-group').click();
  await expect(page.locator('#transparency-groups')).toContainText('engine group');
  let saved = await saveProject(page);
  expect(saved.visibilityGroups).toHaveLength(1);
  expect(saved.objects[0].hidden).toBe(true);
  const groupToggle = page.locator('#transparency-groups .transparency-group-toggle');
  await expect(groupToggle).toHaveAttribute('aria-pressed', 'true');
  await groupToggle.click();
  saved = await saveProject(page);
  expect(saved.objects[0].hidden).toBeUndefined();
  await groupToggle.click();
  saved = await saveProject(page);
  expect(saved.objects[0].hidden).toBe(true);
});

test('node tool hides IDs, toggles helpers and merges without orphaned data', async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  const canvas = page.locator('canvas');
  await page.locator('[data-tool="node"]').click();
  await canvas.click({ position: { x: 500, y: 450 } });
  await canvas.click({ position: { x: 680, y: 450 } });
  await expect(page.locator('#topology-count')).toHaveText('2 节点 · 0 梁 · 0 面板');
  await expect(page.locator('#node-labels')).toHaveCount(0);
  await page.locator('#nodes-btn').click();
  await expect(page.locator('#nodes-btn')).toHaveAttribute('aria-pressed', 'false');
  await page.locator('#nodes-btn').click();
  await expect(page.locator('#nodes-btn')).toHaveAttribute('aria-pressed', 'true');
  await canvas.click({ position: { x: 500, y: 450 } });
  await canvas.click({ position: { x: 680, y: 450 } });
  await expect(page.locator('#topology-count')).toHaveText('1 节点 · 0 梁 · 0 面板');
  const saved = await saveProject(page);
  expect(Object.keys(saved.topology.nodes[0]).sort()).toEqual(['gridId', 'id', 'position', 'standalone']);
  expect(saved.topology.nodes[0].standalone).toBe(true);
  await canvas.click({ position: { x: 680, y: 450 } });
  await page.keyboard.press('Delete');
  await expect(page.locator('#topology-count')).toHaveText('0 节点 · 0 梁 · 0 面板');
  await page.locator('#undo-btn').click();
  await expect(page.locator('#topology-count')).toHaveText('1 节点 · 0 梁 · 0 面板');
});

async function saveProject(page) {
  const download = page.waitForEvent('download');
  await page.locator('#project-save-btn').evaluate(element => element.click());
  const stream = await (await download).createReadStream(); let content = '';
  for await (const chunk of stream) content += chunk;
  return JSON.parse(content);
}

test('catalog uses compact square cards and category icons with accessible labels', async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  await expect(page.locator('#catalog-count')).toHaveText('332 / 598');
  const cards = page.locator('#component-list .component');
  await expect(cards.locator('svg.category-icon')).toHaveCount(332);
  expect(await cards.evaluateAll(elements => elements.every(element => !['building', 'furniture'].includes(element.dataset.category)))).toBe(true);
  await expect(page.locator('#use-model-thumbnails')).not.toBeChecked();
  await page.locator('#use-model-thumbnails').check();
  await expect.poll(() => cards.locator('img.component-thumbnail').count()).toBeGreaterThan(0, { timeout: 30000 });
  await page.locator('#catalog-card-size').evaluate(input => {
    input.value = input.min;
    input.dispatchEvent(new Event('input', { bubbles: true }));
  });
  const compactCard = cards.filter({ has: page.locator('img.component-thumbnail') }).first();
  const compactName = compactCard.locator('.component-name');
  const compactCardBox = await compactCard.boundingBox(); const compactNameBox = await compactName.boundingBox();
  expect(compactNameBox).not.toBeNull();
  expect(compactNameBox.y).toBeGreaterThanOrEqual(compactCardBox.y);
  expect(compactNameBox.y + compactNameBox.height).toBeLessThanOrEqual(compactCardBox.y + compactCardBox.height + 1);
  await page.locator('#use-model-thumbnails').uncheck();
  await expect(cards.locator('svg.category-icon')).toHaveCount(332);
  await page.locator('#show-building-furniture').check();
  await expect(page.locator('#catalog-count')).toHaveText('598 / 598');
  await expect(cards.locator('svg.category-icon')).toHaveCount(598);
  const first = await cards.nth(0).boundingBox(); const second = await cards.nth(1).boundingBox();
  const firstId = await cards.nth(0).getAttribute('data-id');
  expect(firstId).toBeTruthy();
  await cards.nth(0).hover();
  await expect(page.locator('#component-id-tooltip')).toHaveText(firstId);
  await expect(page.locator('#component-model-preview')).toBeVisible({ timeout: 30000 });
  await page.mouse.move(1100, 900);
  await expect(page.locator('#component-model-preview')).toBeHidden();
  expect(Math.abs(first.width - first.height)).toBeLessThan(1);
  expect(first.width).toBeLessThan(95); expect(second.y).toBe(first.y); expect(second.x).toBeGreaterThan(first.x);
  await page.locator('#category-filter').selectOption('wheel');
  expect(await cards.count()).toBeGreaterThan(0);
  expect(await cards.evaluateAll(elements => elements.every(element => element.dataset.category === 'wheel'))).toBe(true);
  const wheelIcon = await cards.first().locator('path').getAttribute('d');
  await page.locator('#category-filter').selectOption('engine');
  expect(await cards.first().locator('path').getAttribute('d')).not.toBe(wheelIcon);
  await page.locator('#component-search').fill('engine');
  const engine = page.locator('[data-id="engine"]');
  await expect(engine).toHaveAttribute('title', /engine/);
  await expect(engine.locator('.component-id')).toHaveCount(0);
  await engine.click(); await expect(page.locator('[data-id="engine"]')).toHaveAttribute('aria-pressed', 'true');
  await page.locator('#component-search').fill('no-such-component-xyz');
  await expect(page.locator('.catalog-empty')).toContainText('没有匹配组件');
});

test('component thumbnails persist in IndexedDB across reloads', async ({ page }) => {
  let meshRequests = 0;
  await page.route('**/assets/meshes/**', async route => { meshRequests++; await route.continue(); });
  await page.goto('./');
  await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  await page.locator('#use-model-thumbnails').check();
  await expect(page.locator('#component-list img.component-thumbnail').first()).toBeVisible({ timeout: 30000 });
  const firstLoadRequests = meshRequests;
  expect(firstLoadRequests).toBeGreaterThan(0);
  await page.reload();
  await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  await expect(page.locator('#use-model-thumbnails')).toBeChecked();
  await expect(page.locator('#component-list img.component-thumbnail').first()).toBeVisible({ timeout: 30000 });
  expect(meshRequests).toBe(firstLoadRequests);
});

test('favorite stars pin components in a persisted catalog section', async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  const star = page.locator('#component-list [data-favorite-component="engine"]');
  await expect(star).toHaveAttribute('aria-pressed', 'false');
  await star.click();
  await expect(page.locator('#favorite-components')).toBeVisible();
  await expect(page.locator('#favorite-component-list [data-id="engine"]')).toHaveCount(1);
  await expect(page.locator('#component-list [data-favorite-component="engine"]')).toHaveAttribute('aria-pressed', 'true');
  await page.reload();
  await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  await expect(page.locator('#favorite-components')).toBeVisible();
  await expect(page.locator('#favorite-component-list [data-id="engine"]')).toHaveCount(1);
  await page.locator('#favorite-component-list [data-favorite-component="engine"]').click();
  await expect(page.locator('#favorite-components')).toBeHidden();
});

test('ray-placed edge creation previews, cancels and commits both endpoints atomically', async ({ page }) => {
  const errors = []; page.on('pageerror', error => errors.push(error.message));
  await page.goto('./');
  await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  await expect(page.locator('#catalog-count')).toContainText('332 / 598');
  const canvas = page.locator('canvas');
  await page.locator('[data-tool="edge"]').click();
  await canvas.click({ position: { x: 450, y: 400 } });
  await canvas.hover({ position: { x: 740, y: 330 } });
  await expect(page.locator('#build-status')).toContainText('整格端点');
  await expect(page.locator('#edge-ruler')).toBeVisible();
  await expect(page.locator('#edge-ruler output')).toHaveCount(3);
  await expect(page.locator('#edge-ruler-mode')).toHaveText('自由建梁');
  const dimensions = await page.locator('#edge-ruler output').evaluateAll(elements => elements.map(e => Number(e.dataset.cells)));
  expect(dimensions.filter(cells => cells > 0).length).toBeGreaterThan(1);
  expect(dimensions.every(Number.isInteger)).toBe(true);
  await expect(page.locator('#undo-btn')).toBeDisabled();
  await page.keyboard.press('Escape');
  await expect(page.locator('#build-status')).toBeHidden();
  await page.locator('[data-tool="edge"]').click();
  await canvas.click({ position: { x: 450, y: 400 } });
  await canvas.click({ position: { x: 740, y: 330 } });
  await expect(page.locator('#topology-count')).toHaveText('2 节点 · 1 梁 · 0 面板');
  await expect(page.locator('#object-count')).toHaveText('0 个组件');
  const built = await saveProject(page);
  // With no geometry under the pointer, beams now share component placement's
  // fixed XZ work-plane fallback rather than using an arbitrary camera plane.
  expect(built.topology.nodes.every(node => Math.abs(node.position.y) < .01)).toBe(true);
  await page.locator('#nodes-btn').click();
  await expect(page.locator('#nodes-btn')).toHaveAttribute('aria-pressed', 'false');
  expect(await saveProject(page)).toEqual(built);
  await page.locator('#undo-btn').click();
  await expect(page.locator('#topology-count')).toHaveText('0 节点 · 0 梁 · 0 面板');
  await page.locator('#redo-btn').click();
  await expect(page.locator('#topology-count')).toHaveText('2 节点 · 1 梁 · 0 面板');
  await expect(page.locator('#nodes-btn')).toHaveAttribute('aria-pressed', 'false');
  await canvas.click({ position: { x: 740, y: 330 } });
  await canvas.click({ position: { x: 850, y: 520 } });
  await expect(page.locator('#topology-count')).toHaveText('3 节点 · 2 梁 · 0 面板');
  await page.locator('#fit-btn').click();
  await page.screenshot({ path: 'test-results/edge-builder.png' });
  await page.locator('#file-input').setInputFiles({ name: 'old.json', mimeType: 'application/json', buffer: Buffer.from(JSON.stringify({ format: 'anymaker-web-project', version: 1, objects: [] })) });
  await expect(page.locator('#topology-count')).toHaveText('0 节点 · 0 梁 · 0 面板');
  expect(errors).toEqual([]);
});

test('edge micro mode moves the endpoint with UIOJKL and commits with Enter', async ({ page }) => {
  const errors = []; page.on('pageerror', error => errors.push(error.message));
  await page.goto('./');
  await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  const canvas = page.locator('canvas');
  await page.locator('[data-tool="edge"]').click();
  await page.locator('#edge-micro-mode').check();
  await canvas.click({ position: { x: 450, y: 400 } });
  await expect(page.locator('#build-status')).toContainText('微操');
  await expect(page.locator('#placement-indicator')).toBeVisible();
  await page.keyboard.press('u');
  await page.keyboard.press('i');
  await page.keyboard.press('Enter');
  await expect(page.locator('#topology-count')).toHaveText('2 节点 · 1 梁 · 0 面板');
  const saved = await saveProject(page);
  const edge = saved.topology.edges[0];
  const byId = new Map(saved.topology.nodes.map(node => [node.id, node]));
  const start = byId.get(edge.a).position; const end = byId.get(edge.b).position;
  expect(Math.abs(end.x - start.x) + Math.abs(end.y - start.y) + Math.abs(end.z - start.z)).toBeCloseTo(.16, 6);
  expect(errors).toEqual([]);
});

test('edge tool creates a node on an existing beam before continuing a new beam', async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  await page.locator('[data-view="front"]').click();
  const canvas = page.locator('canvas');
  await page.locator('[data-tool="edge"]').click();
  await canvas.click({ position: { x: 400, y: 420 } });
  await canvas.click({ position: { x: 800, y: 420 } });
  const base = await saveProject(page);
  expect(base.topology.nodes).toHaveLength(2);
  expect(base.topology.edges).toHaveLength(1);
  await canvas.click({ position: { x: 600, y: 420 } });
  const split = await saveProject(page);
  expect(split.topology.nodes).toHaveLength(3);
  expect(split.topology.edges).toHaveLength(2);
  await canvas.click({ position: { x: 600, y: 260 } });
  const continued = await saveProject(page);
  expect(continued.topology.nodes).toHaveLength(4);
  expect(continued.topology.edges).toHaveLength(3);
  expect(continued.topology.edges.some(edge => edge.a === split.topology.nodes[2].id || edge.b === split.topology.nodes[2].id)).toBe(true);
});

test('front-view solid edges are pickable off the centerline and split with hidden nodes', async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  await page.locator('[data-view="front"]').click();
  await page.locator('#nodes-btn').click();
  await page.locator('[data-tool="edge"]').click();
  const canvas = page.locator('canvas');
  await canvas.click({ position: { x: 430, y: 420 } });
  await canvas.click({ position: { x: 770, y: 420 } });
  await expect(page.locator('#topology-count')).toHaveText('2 节点 · 1 梁 · 0 面板');
  const built = await saveProject(page);
  for (const node of built.topology.nodes) expect(node.position.z).toBeCloseTo(0, 5);
  await page.locator('[data-tool="erase"]').click();
  await canvas.click({ position: { x: 600, y: 425 } });
  await expect(page.locator('#topology-count')).toHaveText('0 节点 · 0 梁 · 0 面板');
  expect((await saveProject(page)).topology.nodes).toEqual([]);
  await page.locator('#undo-btn').click();
  await expect(page.locator('#topology-count')).toHaveText('2 节点 · 1 梁 · 0 面板');
  await page.locator('[data-tool="edge"]').click();
  await canvas.click({ position: { x: 600, y: 420 }, modifiers: ['Alt'] });
  await expect(page.locator('#topology-count')).toHaveText('3 节点 · 2 梁 · 0 面板');
  const split = await saveProject(page);
  for (const node of split.topology.nodes) {
    expect(node.position.y).toBeCloseTo(built.topology.nodes[0].position.y, 5);
    expect(node.position.z).toBeCloseTo(0, 5);
  }
});

test('structural selection is enabled by default and can be disabled without affecting construction', async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  await page.locator('[data-view="front"]').click();
  await page.locator('[data-tool="edge"]').click();
  const canvas = page.locator('canvas');
  await canvas.click({ position: { x: 430, y: 420 } });
  await canvas.click({ position: { x: 770, y: 420 } });
  await expect(page.locator('#topology-count')).toHaveText('2 节点 · 1 梁 · 0 面板');
  await page.locator('[data-tool="select"]').click();
  await canvas.hover({ position: { x: 600, y: 420 } });
  await expect.poll(() => page.locator('#viewport').getAttribute('data-interaction-highlight-count').then(Number)).toBeGreaterThanOrEqual(1);
  await canvas.click({ position: { x: 600, y: 420 } });
  await expect(page.locator('#inspector-content')).toContainText('已选择 1 个结构对象');
  await page.locator('#box-select-action').click();
  await canvas.dragTo(canvas, { sourcePosition: { x: 570, y: 390 }, targetPosition: { x: 630, y: 450 } });
  await expect(page.locator('#inspector-content')).toContainText('已选择 1 个结构对象');

  await page.locator('#selection-filter-toggle').click();
  const structure = page.locator('[data-selectable-kind="structure"]');
  await expect(structure).toBeChecked();
  await structure.uncheck();
  await expect(page.locator('#inspector-content')).not.toContainText('已选择 1 个结构对象');
  await canvas.hover({ position: { x: 600, y: 420 } });
  await expect(page.locator('#viewport')).toHaveAttribute('data-interaction-highlight-count', '0');
});

test('glass tool closes selected edges into an offset window panel and paint stores Hex RGB colors', async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  await page.locator('[data-view="front"]').click();
  const canvas = page.locator('canvas');
  const corners = [[430, 560], [730, 560], [730, 280], [430, 280]];
  await page.locator('[data-tool="edge"]').click();
  for (let index = 0; index < corners.length; index++) {
    await canvas.click({ position: { x: corners[index][0], y: corners[index][1] } });
    const next = corners[(index + 1) % corners.length];
    await canvas.click({ position: { x: next[0], y: next[1] } });
  }
  await expect(page.locator('#topology-count')).toHaveText('4 节点 · 4 梁 · 0 面板');
  await page.locator('[data-tool="paint"]').click();
  await page.locator('#paint-toolbar-hex').fill('#bd2636');
  await page.locator('#paint-toolbar-hex').press('Tab');
  await canvas.hover({ position: { x: 580, y: 560 } });
  await expect(page.locator('#viewport')).toHaveAttribute('data-edge-center-highlight-count', '1');
  await canvas.click({ position: { x: 580, y: 560 } });
  let saved = await saveProject(page);
  expect(saved.topology.edges.some(edge => edge.color === '#bd2636')).toBe(true);
  await page.locator('[data-tool="glass"]').click();
  await canvas.click({ position: { x: 580, y: 560 } });
  await expect.poll(() => page.locator('#viewport').getAttribute('data-edge-center-highlight-count').then(Number)).toBeGreaterThanOrEqual(1);
  for (const [x, y] of [[730, 420], [580, 280], [430, 420]]) await canvas.click({ position: { x, y } });
  await expect(page.locator('#topology-count')).toHaveText('4 节点 · 4 梁 · 1 面板');
  saved = await saveProject(page);
  expect(saved.topology.plates[0].normalOffset).toBeCloseTo(.04, 8);
  expect(saved.topology.plates[0].type).toBe('window');
  await openRightSidebar(page);
  await page.locator('[data-tool="paint"]').click();
  await canvas.hover({ position: { x: 580, y: 560 } });
  // The finished panel covers the boundary beam and has paint priority.
  await expect(page.locator('#viewport')).toHaveAttribute('data-edge-center-highlight-count', '0');
  await expect(page.locator('#viewport')).toHaveAttribute('data-plate-boundary-highlight-count', '1');
  await canvas.click({ position: { x: 580, y: 560 } });
  saved = await saveProject(page);
  expect(saved.topology.plates.some(plate => plate.color_front === '#bd2636')).toBe(true);
  await canvas.hover({ position: { x: 560, y: 400 } });
  await expect(page.locator('#viewport')).toHaveAttribute('data-interaction-highlight-count', '1');
  await expect(page.locator('#viewport')).toHaveAttribute('data-edge-center-highlight-count', '0');
  await expect(page.locator('#viewport')).toHaveAttribute('data-plate-boundary-highlight-count', '1');
  await canvas.click({ position: { x: 560, y: 400 } });
  saved = await saveProject(page);
  expect(saved.topology.plates[0].color_front).toBe('#bd2636');
  await page.locator('#paint-toolbar-hex').fill('#7c3aed');
  await page.locator('#paint-toolbar-hex').press('Tab');
  await canvas.click({ position: { x: 560, y: 400 } });
  await expect(page.locator('#pick-paint-color')).toBeVisible();
  await page.locator('#pick-paint-color').click();
  await expect(page.locator('#pick-paint-color')).toHaveAttribute('aria-pressed', 'true');
  await canvas.click({ position: { x: 560, y: 400 } });
  await expect(page.locator('#paint-toolbar-hex')).toHaveValue('#7c3aed');
  await expect(page.locator('#paint-color-hex')).toHaveValue('#7c3aed');
  await expect(page.locator('#pick-paint-color')).toHaveAttribute('aria-pressed', 'false');

  await page.locator('[data-tool="select"]').click();
  await page.locator('#selection-filter-toggle').click();
  await page.locator('[data-selectable-kind="structure"]').check();
  await canvas.hover({ position: { x: 560, y: 400 } });
  await expect(page.locator('#viewport')).toHaveAttribute('data-interaction-highlight-count', '1');
  await canvas.click({ position: { x: 560, y: 400 } });
  await expect(page.locator('#inspector-content')).toContainText('已选择 1 个结构对象');
  // Click the exposed outer half of the supporting beam; the panel now
  // intentionally covers the centreline and wins overlapping paint hits.
  await page.keyboard.down('Shift'); await canvas.click({ position: { x: 580, y: 575 } }); await page.keyboard.up('Shift');
  await expect(page.locator('#inspector-content')).toContainText('已选择 2 个结构对象');
  await expect.poll(() => page.locator('#viewport').getAttribute('data-interaction-highlight-count').then(Number)).toBeGreaterThanOrEqual(2);
});

test('erase tool removes the highlighted front panel before its supporting edge', async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  await page.locator('[data-view="front"]').click();
  const canvas = page.locator('canvas');
  const corners = [[430, 560], [730, 560], [730, 280], [430, 280]];
  await page.locator('[data-tool="edge"]').click();
  for (let index = 0; index < corners.length; index++) {
    await canvas.click({ position: { x: corners[index][0], y: corners[index][1] } });
    const next = corners[(index + 1) % corners.length];
    await canvas.click({ position: { x: next[0], y: next[1] } });
  }
  await page.locator('[data-tool="glass"]').click();
  for (const [x, y] of [[580, 560], [730, 420], [580, 280], [430, 420]]) await canvas.click({ position: { x, y } });
  await expect(page.locator('#topology-count')).toHaveText('4 节点 · 4 梁 · 1 面板');

  await page.locator('[data-tool="erase"]').click();
  await canvas.hover({ position: { x: 580, y: 560 } });
  await expect(page.locator('#viewport')).toHaveAttribute('data-plate-boundary-highlight-count', '1');
  await canvas.click({ position: { x: 580, y: 560 } });
  let saved = await saveProject(page);
  expect(saved.topology.plates).toHaveLength(0);
  expect(saved.topology.edges).toHaveLength(4);

  await canvas.hover({ position: { x: 580, y: 560 } });
  await expect(page.locator('#viewport')).toHaveAttribute('data-edge-center-highlight-count', '1');
  await canvas.click({ position: { x: 580, y: 560 } });
  saved = await saveProject(page);
  expect(saved.topology.edges).toHaveLength(3);
});

test('XYZ rulers follow axis snapping, language, cancellation and committed endpoints', async ({ page }) => {
  const errors = []; page.on('pageerror', error => errors.push(error.message));
  await page.goto('./');
  await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  await page.locator('[data-view="front"]').click();
  await page.locator('[data-tool="edge"]').click();
  const canvas = page.locator('canvas'); const ruler = page.locator('#edge-ruler');
  await canvas.click({ position: { x: 430, y: 420 } });
  await canvas.hover({ position: { x: 750, y: 340 } });
  await expect(ruler).toBeVisible();
  await page.keyboard.press('a');
  await expect(page.locator('#axis-snap-btn')).toHaveAttribute('aria-pressed', 'true');
  await expect(ruler).toHaveAttribute('data-axis', 'x');
  await expect(page.locator('#edge-ruler-mode')).toHaveText('吸附 X 轴');
  const dimensions = await ruler.locator('output').evaluateAll(elements => elements.map(e => Number(e.dataset.cells)));
  expect(dimensions[0]).toBeGreaterThan(0); expect(dimensions.slice(1)).toEqual([0, 0]); expect(dimensions.every(Number.isInteger)).toBe(true);
  await canvas.hover({ position: { x: 440, y: 240 } });
  await expect(ruler).toHaveAttribute('data-axis', 'y');
  await canvas.hover({ position: { x: 750, y: 340 } });
  await page.screenshot({ path: 'test-results/edge-axis-ruler.png' });
  await page.locator('#language-select').selectOption('en');
  await canvas.hover({ position: { x: 750, y: 340 } });
  await expect(page.locator('#edge-ruler-mode')).toHaveText('Snap to X axis');
  await expect(ruler.locator('output').first()).toContainText('blocks');
  await canvas.click({ position: { x: 750, y: 340 } });
  await expect(ruler).toBeHidden();
  const built = await saveProject(page);
  const [a, b] = built.topology.nodes.map(node => node.position);
  expect(b.y).toBe(a.y); expect(b.z).toBe(a.z); expect(Math.abs(b.x - a.x) / .08).toBe(dimensions[0]);
  expect(Object.keys(built).sort()).toEqual(['format', 'grids', 'objects', 'projectName', 'topology', 'version']);
  expect(built.renderQuality).toBeUndefined();
  await page.locator('#undo-btn').click();
  await expect(page.locator('#topology-count')).toHaveText('0 nodes · 0 edges · 0 plates');
  await page.locator('#redo-btn').click();
  expect(await saveProject(page)).toEqual(built);
  await canvas.click({ position: { x: 600, y: 500 } });
  await canvas.hover({ position: { x: 730, y: 380 } });
  await page.keyboard.press('a');
  await expect(ruler).toHaveAttribute('data-axis', '');
  await page.locator('#component-search').focus(); await page.keyboard.press('a');
  await expect(page.locator('#axis-snap-btn')).toHaveAttribute('aria-pressed', 'false');
  await canvas.hover({ position: { x: 730, y: 380 } });
  await page.locator('#viewport').focus(); await page.keyboard.press('Escape');
  await expect(ruler).toBeHidden();
  expect(await saveProject(page)).toEqual(built);
  await page.locator('[data-tool="edge"]').click();
  await canvas.click({ position: { x: 600, y: 500 } });
  await page.locator('[data-tool="select"]').click();
  await expect(ruler).toBeHidden();
  expect(await saveProject(page)).toEqual(built);
  expect(errors).toEqual([]);
});

test('A toggles axis snapping from the viewport before edge creation', async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  await expect(page.locator('#axis-snap-btn')).toHaveAttribute('aria-pressed', 'false');
  await page.locator('#viewport').focus();
  await page.keyboard.press('a');
  await expect(page.locator('#axis-snap-btn')).toHaveAttribute('aria-pressed', 'true');
  await page.keyboard.press('a');
  await expect(page.locator('#axis-snap-btn')).toHaveAttribute('aria-pressed', 'false');
});

test('Shift temporarily enables axis snapping while using the edge tool', async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  await page.locator('[data-tool="edge"]').click();
  const snapButton = page.locator('#axis-snap-btn');
  await expect(snapButton).toContainText('Shift');
  await expect(snapButton).toHaveAttribute('aria-pressed', 'false');
  await page.keyboard.down('Shift');
  await expect(snapButton).toHaveAttribute('aria-pressed', 'true');
  await page.keyboard.up('Shift');
  await expect(snapButton).toHaveAttribute('aria-pressed', 'false');
});

test('sidebars resize, collapse with scoped Tab shortcut, and keep editor controls on the right', async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  await expect(page.locator('#catalog-count')).toContainText('332 / 598');
  await expect(page.locator('#left-sidebar')).toBeVisible();
  await expect(page.locator('#right-sidebar')).toBeHidden();
  await expect(page.locator('#left-tab-catalog')).toHaveAttribute('aria-selected', 'true');
  const catalogBounds = await page.locator('#catalog-panel').boundingBox(); const sidebarBounds = await page.locator('#left-sidebar').boundingBox();
  expect(catalogBounds.height).toBeLessThan(sidebarBounds.height);
  await expect.poll(() => page.locator('#component-list').evaluate(element => element.scrollHeight > element.clientHeight)).toBe(true);
  expect((await page.locator('#component-list').boundingBox()).height).toBeGreaterThan(sidebarBounds.height * .6);
  expect(await page.locator('#component-list').evaluate(element => { element.scrollTop = 120; return element.scrollTop > 0 && getComputedStyle(element).overflowY === 'scroll'; })).toBe(true);
  expect(await page.locator('#grid-settings').evaluate(element => element.closest('#right-sidebar')?.id)).toBe('right-sidebar');
  expect(await page.locator('#inspector-content').evaluate(element => element.closest('#right-sidebar')?.id)).toBe('right-sidebar');

  const left = page.locator('#left-sidebar'); const resizer = page.locator('#left-sidebar-resizer');
  const before = await left.boundingBox(); const separator = await resizer.boundingBox();
  await page.mouse.move(separator.x + separator.width / 2, separator.y + 80);
  await page.mouse.down(); await page.mouse.move(separator.x + 108, separator.y + 80); await page.mouse.up();
  const widened = await left.boundingBox();
  expect(widened.width).toBeGreaterThan(before.width + 80); expect(widened.width).toBeLessThanOrEqual(720);
  await resizer.focus(); await page.keyboard.press('ArrowLeft');
  expect((await left.boundingBox()).width).toBeLessThan(widened.width);

  await page.locator('#left-sidebar-toggle').click();
  await expect(left).toBeHidden(); await expect(resizer).toBeHidden();
  await expect(page.locator('#left-sidebar-toggle')).toHaveAttribute('aria-expanded', 'false');
  await page.locator('#viewport').focus(); await page.keyboard.press('Tab');
  await expect(left).toBeVisible(); await expect(page.locator('#left-sidebar-toggle')).toBeFocused();
  await expect(page.locator('#left-sidebar-toggle')).toHaveAttribute('aria-expanded', 'true');
  await page.locator('#component-search').focus(); await page.keyboard.press('Tab');
  await expect(page.locator('#category-filter')).toBeFocused();
  await expect(page.locator('#left-sidebar-toggle')).toHaveAttribute('aria-expanded', 'true');

  await openRightSidebar(page);
  await expect(page.locator('#right-sidebar-toggle')).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('#right-tab-editor')).toHaveAttribute('aria-selected', 'true');
  await expect(page.locator('#grid-settings')).toContainText(/1 (格|block) = 8 cm/); await expect(page.locator('#grid-btn')).toBeVisible();
  const right = page.locator('#right-sidebar'); const rightResizer = page.locator('#right-sidebar-resizer');
  await expect(rightResizer).toBeVisible();
  const rightBefore = await right.boundingBox(); const rightSeparator = await rightResizer.boundingBox();
  await page.mouse.move(rightSeparator.x + rightSeparator.width / 2, rightSeparator.y + 80);
  await page.mouse.down(); await page.mouse.move(rightSeparator.x - 108, rightSeparator.y + 80); await page.mouse.up();
  const rightWidened = await right.boundingBox();
  expect(rightWidened.width).toBeGreaterThan(rightBefore.width + 80); expect(rightWidened.width).toBeLessThanOrEqual(720);
  await rightResizer.focus(); await page.keyboard.press('ArrowRight');
  expect((await right.boundingBox()).width).toBeLessThan(rightWidened.width);
  await page.locator('#right-sidebar-toggle').click();
  await expect(page.locator('#right-sidebar')).toBeHidden(); await expect(rightResizer).toBeHidden();
});
