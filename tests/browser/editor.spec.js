import { test, expect } from '@playwright/test';
import { meshFixture } from '../fixtures.js';

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

test('Mesh → placement → transforms → history → files on Pages subpath', async ({ page }) => {
  const errors = []; page.on('pageerror', error => errors.push(error.message));
  await page.goto('./');
  await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  await expect(page.locator('#catalog-count')).toContainText('598 / 598');
  await page.locator('#mesh-input').setInputFiles({ name: 'engine_block_a_0_0_0.mesh', mimeType: 'application/octet-stream', buffer: meshFixture() });
  await expect(page.locator('#asset-status')).toContainText('1 个 Mesh');
  await expect(page.locator('#save-status')).toContainText('模型库已登记');
  await page.locator('#component-search').fill('engine');
  await page.locator('[data-id="engine"]').click();
  await page.locator('canvas').click({ position: { x: 380, y: 400 } });
  await expect(page.locator('#object-count')).toHaveText('1 个组件');
  await expect(page.locator('#inspector-content')).toContainText('342 顶点 / 218 三角形');
  await openRightSidebar(page);
  await page.locator('.inspector-drawer > summary').click();
  const x = page.getByRole('spinbutton', { name: 'position-x', exact: true });
  await x.fill('15'); await x.press('Enter');
  await expect(x).toHaveValue('15');
  await page.locator('[data-tool="rotate"]').click();
  const yRotation = page.getByRole('spinbutton', { name: 'rotation-y', exact: true });
  await yRotation.fill('90'); await yRotation.press('Enter');
  const save = page.waitForEvent('download'); await page.locator('#save-btn').click();
  const saved = await save; const stream = await saved.createReadStream(); let content = ''; for await (const chunk of stream) content += chunk;
  const doc = JSON.parse(content); expect(doc.objects[0].position.x).toBeCloseTo(1.2); expect(doc.objects[0].rotation.y).toBeCloseTo(Math.PI / 2);
  await page.locator('#delete-selected').click(); await expect(page.locator('#object-count')).toHaveText('0 个组件');
  await page.locator('#undo-btn').click(); await expect(page.locator('#object-count')).toHaveText('1 个组件');
  await page.locator('#redo-btn').click(); await expect(page.locator('#object-count')).toHaveText('0 个组件');
  await page.locator('#file-input').setInputFiles({ name: 'project.json', mimeType: 'application/json', buffer: Buffer.from(content) });
  await expect(page.locator('#object-count')).toHaveText('1 个组件');
  await openRightSidebar(page);
  await page.locator('#resource-drawer > summary').click();
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
  await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
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

test('native JSON maps through the domain model and imports components', async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  const native = {
    definitions: { components: ['engine'] },
    vehicles: { vehicles: [{ id: 9, transform: { m: [1, 0, 0, 0, 1, 0, 0, 0, 1], t: [0, 0, 0] }, nodes: [], edges: [], plates: [], grids: [{ components: [{ def: 0, id: 3, pos: [0, 0, 0] }] }], electric_links: [], mechanical_links: [], liquid_links: [], gas_links: [], belt_links: [], data_links: [] }] },
  };
  const meta = { bounds: { min: [0, 0, 0], max: [1, 1, 1] } };
  await page.locator('#native-input').setInputFiles([
    { name: 'vehicle.data', mimeType: 'application/json', buffer: Buffer.from(JSON.stringify(native)) },
    { name: 'vehicle.meta', mimeType: 'application/json', buffer: Buffer.from(JSON.stringify(meta)) },
  ]);
  await expect(page.locator('#native-summary')).toContainText('已配对 vehicle.data / vehicle.meta');
  await expect(page.locator('#native-import-btn')).toBeEnabled();
  await openRightSidebar(page);
  await page.locator('#native-import-btn').evaluate(element => { element.closest('details').open = true; });
  await page.locator('#native-import-btn').click();
  await expect(page.locator('#object-count')).toHaveText('1 个组件', { timeout: 30000 });
  await page.locator('#native-input').setInputFiles({ name: 'other.data', mimeType: 'application/json', buffer: Buffer.from(JSON.stringify(native)) });
  await expect(page.locator('#native-import-btn')).toBeDisabled();
  await expect(page.locator('#native-summary')).toContainText('请同时选择一份 .data 和一份 .meta 文件');
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

test('topology tools create nodes and a beam in the viewport', async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
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
  expect(Object.keys(saved.topology.nodes[0]).sort()).toEqual(['id', 'position']);
  await canvas.click({ position: { x: 680, y: 450 } });
  await page.keyboard.press('Delete');
  await expect(page.locator('#topology-count')).toHaveText('0 节点 · 0 梁 · 0 面板');
  await page.locator('#undo-btn').click();
  await expect(page.locator('#topology-count')).toHaveText('1 节点 · 0 梁 · 0 面板');
});

async function saveProject(page) {
  const download = page.waitForEvent('download');
  await page.locator('#save-btn').click();
  const stream = await (await download).createReadStream(); let content = '';
  for await (const chunk of stream) content += chunk;
  return JSON.parse(content);
}

test('catalog uses compact square cards and category icons with accessible labels', async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  await expect(page.locator('#catalog-count')).toHaveText('598 / 598');
  const cards = page.locator('#component-list .component');
  await expect(cards.locator('svg.category-icon')).toHaveCount(598);
  const first = await cards.nth(0).boundingBox(); const second = await cards.nth(1).boundingBox();
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
  await expect(engine.locator('.component-id')).toHaveText('engine');
  await engine.click(); await expect(page.locator('[data-id="engine"]')).toHaveAttribute('aria-pressed', 'true');
  await page.locator('#component-search').fill('no-such-component-xyz');
  await expect(page.locator('.catalog-empty')).toContainText('没有匹配组件');
});

test('camera-plane beam creation previews, cancels and commits both endpoints atomically', async ({ page }) => {
  const errors = []; page.on('pageerror', error => errors.push(error.message));
  await page.goto('./');
  await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  await expect(page.locator('#catalog-count')).toContainText('598 / 598');
  const canvas = page.locator('canvas');
  await page.locator('[data-tool="beam"]').click();
  await canvas.click({ position: { x: 450, y: 400 } });
  await canvas.hover({ position: { x: 740, y: 330 } });
  await expect(page.locator('#build-status')).toContainText('整格端点');
  await expect(page.locator('#beam-ruler')).toBeVisible();
  await expect(page.locator('#beam-ruler output')).toHaveCount(3);
  await expect(page.locator('#beam-ruler-mode')).toHaveText('自由建梁');
  const dimensions = await page.locator('#beam-ruler output').evaluateAll(elements => elements.map(e => Number(e.dataset.cells)));
  expect(dimensions.filter(cells => cells > 0).length).toBeGreaterThan(1);
  expect(dimensions.every(Number.isInteger)).toBe(true);
  expect((await saveProject(page)).topology.nodes).toHaveLength(0);
  await expect(page.locator('#beam-ruler')).toBeHidden();
  await expect(page.locator('#undo-btn')).toBeDisabled();
  await page.keyboard.press('Escape');
  await expect(page.locator('#build-status')).toBeHidden();
  await page.locator('[data-tool="beam"]').click();
  await canvas.click({ position: { x: 450, y: 400 } });
  await canvas.click({ position: { x: 740, y: 330 } });
  await expect(page.locator('#topology-count')).toHaveText('2 节点 · 1 梁 · 0 面板');
  await expect(page.locator('#object-count')).toHaveText('0 个组件');
  const built = await saveProject(page);
  expect(built.topology.nodes.some(node => Math.abs(node.position.y) > .01)).toBe(true);
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
  await page.screenshot({ path: 'test-results/beam-builder.png' });
  await page.locator('#file-input').setInputFiles({ name: 'old.json', mimeType: 'application/json', buffer: Buffer.from(JSON.stringify({ format: 'anymaker-web-project', version: 1, objects: [] })) });
  await expect(page.locator('#topology-count')).toHaveText('0 节点 · 0 梁 · 0 面板');
  expect(errors).toEqual([]);
});

test('front-view solid beams are pickable off the centerline and split with hidden nodes', async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  await page.locator('[data-view="front"]').click();
  await page.locator('#nodes-btn').click();
  await page.locator('[data-tool="beam"]').click();
  const canvas = page.locator('canvas');
  await canvas.click({ position: { x: 430, y: 420 } });
  await canvas.click({ position: { x: 770, y: 420 } });
  await expect(page.locator('#topology-count')).toHaveText('2 节点 · 1 梁 · 0 面板');
  const built = await saveProject(page);
  for (const node of built.topology.nodes) expect(node.position.z).toBeCloseTo(0, 5);
  await page.locator('[data-tool="erase"]').click();
  await canvas.click({ position: { x: 600, y: 425 } });
  await expect(page.locator('#topology-count')).toHaveText('2 节点 · 0 梁 · 0 面板');
  await page.locator('#undo-btn').click();
  await expect(page.locator('#topology-count')).toHaveText('2 节点 · 1 梁 · 0 面板');
  await page.locator('[data-tool="beam"]').click();
  await canvas.click({ position: { x: 600, y: 420 }, modifiers: ['Alt'] });
  await expect(page.locator('#topology-count')).toHaveText('3 节点 · 2 梁 · 0 面板');
  const split = await saveProject(page);
  for (const node of split.topology.nodes) {
    expect(node.position.y).toBeCloseTo(built.topology.nodes[0].position.y, 5);
    expect(node.position.z).toBeCloseTo(0, 5);
  }
});

test('XYZ rulers follow axis snapping, language, cancellation and committed endpoints', async ({ page }) => {
  const errors = []; page.on('pageerror', error => errors.push(error.message));
  await page.goto('./');
  await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  await page.locator('[data-view="front"]').click();
  await page.locator('[data-tool="beam"]').click();
  const canvas = page.locator('canvas'); const ruler = page.locator('#beam-ruler');
  await canvas.click({ position: { x: 430, y: 420 } });
  await canvas.hover({ position: { x: 750, y: 340 } });
  await expect(ruler).toBeVisible();
  await page.keyboard.press('a');
  await expect(page.locator('#axis-snap-btn')).toHaveAttribute('aria-pressed', 'true');
  await expect(ruler).toHaveAttribute('data-axis', 'x');
  await expect(page.locator('#beam-ruler-mode')).toHaveText('吸附 X 轴');
  const dimensions = await ruler.locator('output').evaluateAll(elements => elements.map(e => Number(e.dataset.cells)));
  expect(dimensions[0]).toBeGreaterThan(0); expect(dimensions.slice(1)).toEqual([0, 0]); expect(dimensions.every(Number.isInteger)).toBe(true);
  await canvas.hover({ position: { x: 440, y: 240 } });
  await expect(ruler).toHaveAttribute('data-axis', 'y');
  await canvas.hover({ position: { x: 750, y: 340 } });
  await page.screenshot({ path: 'test-results/beam-axis-ruler.png' });
  await page.locator('#language-select').selectOption('en');
  await canvas.hover({ position: { x: 750, y: 340 } });
  await expect(page.locator('#beam-ruler-mode')).toHaveText('Snap to X axis');
  await expect(ruler.locator('output').first()).toContainText('cells');
  await canvas.click({ position: { x: 750, y: 340 } });
  await expect(ruler).toBeHidden();
  const built = await saveProject(page);
  const [a, b] = built.topology.nodes.map(node => node.position);
  expect(b.y).toBe(a.y); expect(b.z).toBe(a.z); expect(Math.abs(b.x - a.x) / .08).toBe(dimensions[0]);
  expect(Object.keys(built).sort()).toEqual(['format', 'objects', 'topology', 'version']);
  await page.locator('#undo-btn').click();
  await expect(page.locator('#topology-count')).toHaveText('0 nodes · 0 beams · 0 plates');
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
  await page.locator('[data-tool="beam"]').click();
  await canvas.click({ position: { x: 600, y: 500 } });
  await page.locator('[data-tool="select"]').click();
  await expect(ruler).toBeHidden();
  expect(await saveProject(page)).toEqual(built);
  expect(errors).toEqual([]);
});

test('sidebars resize, collapse with scoped Tab shortcut, and keep editor controls on the right', async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  await expect(page.locator('#catalog-count')).toContainText('598 / 598');
  await expect(page.locator('#left-sidebar')).toBeVisible();
  await expect(page.locator('#right-sidebar')).toBeHidden();
  const catalogBounds = await page.locator('#catalog-drawer').boundingBox(); const sidebarBounds = await page.locator('#left-sidebar').boundingBox();
  expect(Math.abs(catalogBounds.height - sidebarBounds.height)).toBeLessThanOrEqual(1);
  await expect.poll(() => page.locator('#component-list').evaluate(element => element.scrollHeight > element.clientHeight)).toBe(true);
  expect(await page.locator('#component-list').evaluate(element => { element.scrollTop = 120; return element.scrollTop > 0 && getComputedStyle(element).overflowY === 'scroll'; })).toBe(true);
  expect(await page.locator('#grid-settings').evaluate(element => element.closest('#right-sidebar')?.id)).toBe('right-sidebar');
  expect(await page.locator('#inspector-content').evaluate(element => element.closest('#right-sidebar')?.id)).toBe('right-sidebar');

  const left = page.locator('#left-sidebar'); const resizer = page.locator('#left-sidebar-resizer');
  const before = await left.boundingBox(); const separator = await resizer.boundingBox();
  await page.mouse.move(separator.x + separator.width / 2, separator.y + 80);
  await page.mouse.down(); await page.mouse.move(separator.x + 108, separator.y + 80); await page.mouse.up();
  const widened = await left.boundingBox();
  expect(widened.width).toBeGreaterThan(before.width + 80); expect(widened.width).toBeLessThanOrEqual(480);
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
  await expect(page.locator('#grid-settings')).toContainText(/1 (格|cell) = 8 cm/); await expect(page.locator('#grid-btn')).toBeVisible();
  await page.locator('#right-sidebar-toggle').click();
  await expect(page.locator('#right-sidebar')).toBeHidden();
});
