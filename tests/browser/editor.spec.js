import { test, expect } from '@playwright/test';
import { meshFixture } from '../fixtures.js';

test('Mesh → placement → transforms → history → files on Pages subpath', async ({ page }) => {
  const errors = []; page.on('pageerror', error => errors.push(error.message));
  await page.goto('./');
  await expect(page.locator('#catalog-count')).toContainText('598 / 598');
  await page.locator('#mesh-input').setInputFiles({ name: 'engine_block_a_0_0_0.mesh', mimeType: 'application/octet-stream', buffer: meshFixture() });
  await expect(page.locator('#asset-status')).toContainText('1 个 Mesh');
  await expect(page.locator('#save-status')).toContainText('模型库已登记');
  await page.locator('#component-search').fill('engine');
  await page.locator('[data-id="engine"]').click();
  await page.locator('canvas').click({ position: { x: 380, y: 400 } });
  await expect(page.locator('#object-count')).toHaveText('1 个组件');
  await expect(page.locator('#inspector-content')).toContainText('342 顶点 / 218 三角形');
  await page.locator('.inspector-drawer > summary').click();
  const x = page.getByRole('spinbutton', { name: 'position-x', exact: true });
  await x.fill('1.25'); await x.press('Enter');
  await expect(x).toHaveValue('1.2500');
  await page.locator('[data-tool="rotate"]').click();
  const yRotation = page.getByRole('spinbutton', { name: 'rotation-y', exact: true });
  await yRotation.fill('90'); await yRotation.press('Enter');
  const save = page.waitForEvent('download'); await page.locator('#save-btn').click();
  const saved = await save; const stream = await saved.createReadStream(); let content = ''; for await (const chunk of stream) content += chunk;
  const doc = JSON.parse(content); expect(doc.objects[0].position.x).toBe(1.25); expect(doc.objects[0].rotation.y).toBeCloseTo(Math.PI / 2);
  await page.locator('#delete-selected').click(); await expect(page.locator('#object-count')).toHaveText('0 个组件');
  await page.locator('#undo-btn').click(); await expect(page.locator('#object-count')).toHaveText('1 个组件');
  await page.locator('#redo-btn').click(); await expect(page.locator('#object-count')).toHaveText('0 个组件');
  await page.locator('#file-input').setInputFiles({ name: 'project.json', mimeType: 'application/json', buffer: Buffer.from(content) });
  await expect(page.locator('#object-count')).toHaveText('1 个组件');
  const xmlDownload = page.waitForEvent('download'); await page.locator('#export-btn').click();
  const xml = await xmlDownload; const xmlStream = await xml.createReadStream(); let xmlContent = ''; for await (const c of xmlStream) xmlContent += c;
  expect(xmlContent).toContain('game-compatible="false"');
  doc.objects.push(doc.objects[0]);
  await page.locator('#file-input').setInputFiles({ name: 'bad.json', mimeType: 'application/json', buffer: Buffer.from(JSON.stringify(doc)) });
  await expect(page.locator('#save-status')).toContainText('重复');
  await expect(page.locator('#object-count')).toHaveText('1 个组件');
  await page.screenshot({ path: 'test-results/editor.png' });
  expect(errors).toEqual([]);
});

test('structural commands create independent components and remain undoable', async ({ page }) => {
  await page.goto('./');
  await page.locator('#mesh-input').setInputFiles({ name: 'engine_block_a_0_0_0.mesh', mimeType: 'application/octet-stream', buffer: meshFixture() });
  await page.locator('#component-search').fill('engine');
  await page.locator('[data-id="engine"]').click();
  await page.locator('canvas').click({ position: { x: 380, y: 400 } });
  await expect(page.locator('#object-count')).toHaveText('1 个组件');
  await page.locator('#copy-action').click();
  await expect(page.locator('#object-count')).toHaveText('2 个组件');
  await page.locator('#mirror-action').click();
  await expect(page.locator('#object-count')).toHaveText('3 个组件');
  await page.locator('#undo-btn').click();
  await expect(page.locator('#object-count')).toHaveText('2 个组件');
});

test('native JSON maps through the domain model and imports components', async ({ page }) => {
  await page.goto('./');
  const native = {
    definitions: { components: ['engine'] },
    vehicles: { vehicles: [{ id: 9, transform: { m: [1, 0, 0, 0, 1, 0, 0, 0, 1], t: [0, 0, 0] }, nodes: [], edges: [], plates: [], grids: [{ components: [{ def: 0, id: 3, pos: [0, 0, 0] }] }], electric_links: [], mechanical_links: [], liquid_links: [], gas_links: [], belt_links: [], data_links: [] }] },
  };
  await page.locator('#native-input').setInputFiles({ name: 'vehicle.data', mimeType: 'application/json', buffer: Buffer.from(JSON.stringify(native)) });
  await expect(page.locator('#native-import-btn')).toBeEnabled();
  await page.locator('#native-import-btn').evaluate(element => { element.closest('details').open = true; });
  await page.locator('#native-import-btn').click();
  await expect(page.locator('#object-count')).toHaveText('1 个组件', { timeout: 30000 });
});

test('topology tools create nodes and a beam in the viewport', async ({ page }) => {
  await page.goto('./');
  const canvas = page.locator('canvas');
  await page.locator('[data-tool="node"]').click();
  await canvas.click({ position: { x: 500, y: 450 } });
  await canvas.click({ position: { x: 620, y: 450 } });
  await expect(page.locator('#topology-count')).toHaveText('2 节点 · 0 梁 · 0 面板');
  await page.locator('[data-tool="beam"]').click();
  await canvas.click({ position: { x: 500, y: 450 } });
  await canvas.click({ position: { x: 620, y: 450 } });
  await expect(page.locator('#topology-count')).toHaveText('2 节点 · 1 梁 · 0 面板');
  const save = page.waitForEvent('download');
  await page.locator('#save-btn').click();
  const stream = await (await save).createReadStream(); let content = '';
  for await (const chunk of stream) content += chunk;
  const saved = JSON.parse(content);
  expect(saved.topology.nodes).toHaveLength(2);
  expect(saved.topology.edges).toHaveLength(1);
  await page.locator('#undo-btn').click();
  await expect(page.locator('#topology-count')).toHaveText('2 节点 · 0 梁 · 0 面板');
});
