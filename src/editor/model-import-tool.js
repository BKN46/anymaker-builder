import { addMessages, applyTranslations, setText, t as translate } from '../i18n.js';
import { modelImportMessages } from '../locales/model-import-en.js';
import { MODEL_VERTEX_TARGETS, DEFAULT_MODEL_LEVEL } from './model-import-settings.js';

export function mountModelImportTool(host, { generate }) {
  addMessages(modelImportMessages);
  const section = document.createElement('section');
  section.className = 'section model-import-tool';
  section.innerHTML = `
    <h2 data-i18n="3D 模型解析"></h2>
    <p class="status" data-i18n="将本地模型转换为节点、梁和面板。支持 GLB、OBJ、STL，仅在浏览器处理。"></p>
    <input id="model-file-input" type="file" accept=".glb,.obj,.stl" hidden>
    <button id="model-file-btn" class="full" type="button" data-i18n="选择 3D 模型"></button>
    <p id="model-file-name" class="status"></p>
    <p id="model-source-stats" class="status"></p>
    <fieldset id="model-controls" disabled>
      <p class="status" data-i18n="提取外壳，过滤内部结构与小细节，优先生成四边面。"></p>
      <label for="model-simplification" data-i18n="外壳简化程度"></label>
      <input id="model-simplification" type="range" min="0" max="${MODEL_VERTEX_TARGETS.length - 1}" step="1" value="${DEFAULT_MODEL_LEVEL}">
      <output id="model-level" for="model-simplification"></output>
      <p id="model-simplified-stats" class="status"></p>
      <label class="model-checkbox"><input id="model-symmetry" type="checkbox"><span data-i18n="对称模式"></span></label>
      <label for="model-symmetry-axis" data-i18n="对称方向"></label>
      <select id="model-symmetry-axis" disabled aria-describedby="model-symmetry-hint">
        <option value="x" data-i18n="X 方向（YZ 中心平面）"></option>
        <option value="y" data-i18n="Y 方向（XZ 中心平面）"></option>
        <option value="z" data-i18n="Z 方向（XY 中心平面）"></option>
      </select>
      <p id="model-symmetry-hint" class="status" data-i18n="按模型中心配对两侧顶点，可能调整轮廓和节点数。"></p>
      <label for="model-scale" data-i18n="整体等比缩放"></label>
      <input id="model-scale" type="range" min="-2" max="2" step="0.05" value="0">
      <output id="model-scale-value" for="model-scale">1.00×</output>
      <p class="status" data-i18n="1× = 原模型最长边 4 m。生成时吸附到 8 cm 格点。"></p>
      <p id="model-dimensions" class="status"></p>
      <label class="model-checkbox"><input id="model-panels" type="checkbox" checked><span data-i18n="按模型法向自动生成面板"></span></label>
      <label class="model-checkbox"><input id="model-reverse-normals" type="checkbox"><span data-i18n="翻转面板法向"></span></label>
    </fieldset>
    <svg id="model-preview" viewBox="0 0 320 210" role="img" tabindex="0" data-i18n-aria-label="生成结构预览，拖动或按方向键旋转" hidden><path fill="none" stroke="currentColor" stroke-width="0.65"/></svg>
    <p id="model-result-stats" class="status"></p>
    <p id="model-face-stats" class="status"></p>
    <p id="model-import-status" class="status" role="status" aria-live="polite" data-i18n="选择模型后可调整简化程度和大小。"></p>
    <p class="status" data-i18n="确认后替换当前载具，可撤销。模型材质与动画不导入。"></p>
    <div class="model-actions"><button id="model-generate-btn" type="button" class="primary" disabled data-i18n="确定并新建载具"></button><button id="model-cancel-btn" type="button" data-i18n="取消"></button></div>`;
  host.prepend(section);
  applyTranslations(section);
  const $ = selector => section.querySelector(selector);
  const controls = $('#model-controls'), status = $('#model-import-status'), confirm = $('#model-generate-btn');
  const svg = $('#model-preview');
  let worker = null, serial = 0, revision = 0, inFlight = false, timer = null, result = null, filename = '', loaded = false, generating = false;
  let yaw = -.65, pitch = .35, drag = null;
  const options = () => ({ level: Number($('#model-simplification').value), scale: 10 ** Number($('#model-scale').value), panels: $('#model-panels').checked, reverseNormals: $('#model-reverse-normals').checked, symmetryAxis: $('#model-symmetry').checked ? $('#model-symmetry-axis').value : null });

  function drawPreview() {
    svg.toggleAttribute('hidden', !result?.topology);
    if (svg.hasAttribute('hidden')) return;
    const { positions, polygons } = result.preview;
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    const points = [];
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i] * Math.cos(yaw) + positions[i + 2] * Math.sin(yaw);
      const z = -positions[i] * Math.sin(yaw) + positions[i + 2] * Math.cos(yaw);
      const y = positions[i + 1] * Math.cos(pitch) - z * Math.sin(pitch);
      points.push([x, y]); minX = Math.min(minX, x); maxX = Math.max(maxX, x); minY = Math.min(minY, y); maxY = Math.max(maxY, y);
    }
    const factor = Math.min(290 / Math.max(.01, maxX - minX), 180 / Math.max(.01, maxY - minY));
    const projected = points.map(([x, y]) => [160 + (x - (minX + maxX) / 2) * factor, 105 - (y - (minY + maxY) / 2) * factor].map(value => value.toFixed(1)).join(','));
    const paths = [], edges = new Set();
    for (const face of polygons) for (let j = 0; j < face.length; j++) {
      const a = face[j], b = face[(j + 1) % face.length], key = [Math.min(a, b), Math.max(a, b)].join(',');
      if (!edges.has(key)) { paths.push(`M${projected[a]}L${projected[b]}`); edges.add(key); }
    }
    svg.querySelector('path').setAttribute('d', paths.join(''));
  }

  function reset() {
    worker?.terminate(); worker = null; clearTimeout(timer);
    serial++; revision++; inFlight = false; loaded = false; result = null;
    controls.disabled = true; confirm.disabled = true; svg.setAttribute('hidden', '');
    for (const id of ['#model-file-name', '#model-source-stats', '#model-simplified-stats', '#model-dimensions', '#model-result-stats', '#model-face-stats']) setText($(id), '');
    section.dataset.state = 'empty';
  }
  function fail(message) {
    result = null; confirm.disabled = true; svg.setAttribute('hidden', '');
    section.dataset.state = 'error'; setText(status, '模型处理失败：{error}', () => ({ error: translate(message) }));
  }
  function refreshOptions() {
    const value = options();
    setText($('#model-level'), '目标约 {target} 顶点 · 生成数量以格点结果为准', { target: MODEL_VERTEX_TARGETS[value.level] });
    $('#model-scale-value').textContent = `${value.scale.toFixed(2)}×`;
    $('#model-reverse-normals').disabled = !value.panels;
    $('#model-symmetry-axis').disabled = value.symmetryAxis === null;
  }
  function update() {
    if (!loaded || inFlight || generating) return;
    inFlight = true;
    worker.postMessage({ id: revision, type: 'update', options: options() });
  }
  function scheduleUpdate() {
    revision++; result = null; confirm.disabled = true; svg.setAttribute('hidden', '');
    refreshOptions(); section.dataset.state = 'processing';
    setText(status, '正在计算简化与格点结构…');
    // Old counts are not a preview of the newly selected settings.
    for (const id of ['#model-simplified-stats', '#model-dimensions', '#model-result-stats', '#model-face-stats']) setText($(id), '');
    clearTimeout(timer); timer = setTimeout(update, 100);
  }

  $('#model-file-btn').onclick = () => $('#model-file-input').click();
  $('#model-file-input').onchange = async event => {
    const file = event.target.files[0]; event.target.value = '';
    if (!file || generating) return;
    reset(); filename = file.name;
    const request = serial;
    $('#model-file-name').textContent = filename;
    delete $('#model-file-name').dataset.i18n;
    if (file.size > 32 * 1024 * 1024) { fail('模型过大：最多 32 MB、50 万顶点和 50 万三角面'); return; }
    section.dataset.state = 'loading'; setText(status, '正在解析本地模型…');
    try {
      const buffer = await file.arrayBuffer();
      if (request !== serial) return;
      worker = new Worker(new URL('./model-import-worker.js', import.meta.url), { type: 'module' });
      worker.onerror = () => { if (request === serial) { worker.terminate(); loaded = false; controls.disabled = true; fail('模型解析线程意外停止，请重新选择文件'); } };
      worker.onmessage = ({ data }) => {
        if (request !== serial) return;
        if (data.type === 'update') {
          inFlight = false;
          if (data.id !== revision) { update(); return; }
        }
        if (data.error) { fail(data.error); return; }
        if (data.type === 'load') {
          loaded = true; controls.disabled = false;
          setText($('#model-source-stats'), '源模型：{vertices} 顶点记录 / {faces} 三角面', data.stats);
          scheduleUpdate();
        } else {
          result = data.result;
          setText($('#model-simplified-stats'), '外壳简化后：{vertices} 顶点', { vertices: result.simplifiedVertices });
          const dims = result.dimensions;
          if (dims) setText($('#model-dimensions'), '占地 X × Z：{x} × {z} m（{cx} × {cz} 格）；高度 Y：{y} m（{cy} 格）。含梁厚度。', { x: dims[0].meters.toFixed(2), y: dims[1].meters.toFixed(2), z: dims[2].meters.toFixed(2), cx: dims[0].cells, cy: dims[1].cells, cz: dims[2].cells });
          setText($('#model-result-stats'), '生成：{nodes} 节点 / {edges} 梁 / {plates} 面板；清理 {dropped} 个塌缩或重复面。', { ...result.counts, dropped: result.droppedFaces });
          setText($('#model-face-stats'), '外壳分面：{quads} 四边面 / {triangles} 三角面', result.counts);
          setText(status, result.error || '预览已更新。拖动线框可旋转查看。');
          confirm.disabled = !result.topology;
          section.dataset.state = result.topology ? 'ready' : 'error';
          drawPreview();
        }
      };
      worker.postMessage({ id: revision, type: 'load', name: filename, buffer }, [buffer]);
    } catch (error) { if (request === serial) fail(error.message); }
  };
  controls.addEventListener('input', scheduleUpdate);
  confirm.onclick = async () => {
    if (!result?.topology || generating) return;
    generating = true; confirm.disabled = true; controls.disabled = true;
    $('#model-file-btn').disabled = true; $('#model-cancel-btn').disabled = true;
    setText(status, '正在生成载具…');
    try {
      const completed = await generate(result.topology, filename.replace(/\.[^.]+$/, ''));
      if (completed) { reset(); setText(status, '已新建模型载具，可使用撤销恢复原载具。'); }
      else setText(status, '载具未生成，请等待当前操作完成后重试。');
    } catch (error) { setText(status, '模型处理失败：{error}', () => ({ error: translate(error.message) })); }
    finally {
      generating = false; controls.disabled = !loaded; confirm.disabled = !result?.topology;
      $('#model-file-btn').disabled = false; $('#model-cancel-btn').disabled = false;
    }
  };
  $('#model-cancel-btn').onclick = () => { reset(); setText(status, '已取消模型解析，当前载具未修改。'); };
  svg.onpointerdown = event => { drag = { x: event.clientX, y: event.clientY }; svg.setPointerCapture(event.pointerId); };
  svg.onpointermove = event => {
    if (!drag) return;
    yaw += (event.clientX - drag.x) / 120; pitch = Math.max(-1.5, Math.min(1.5, pitch + (event.clientY - drag.y) / 120));
    drag = { x: event.clientX, y: event.clientY }; drawPreview();
  };
  svg.onpointerup = svg.onpointercancel = () => { drag = null; };
  svg.onkeydown = event => {
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) return;
    event.preventDefault(); event.stopPropagation();
    yaw += event.key === 'ArrowLeft' ? -.15 : event.key === 'ArrowRight' ? .15 : 0;
    pitch = Math.max(-1.5, Math.min(1.5, pitch + (event.key === 'ArrowUp' ? -.15 : event.key === 'ArrowDown' ? .15 : 0)));
    drawPreview();
  };
  window.addEventListener('pagehide', () => { reset(); setText(status, '选择模型后可调整简化程度和大小。'); });
  refreshOptions();
  return section;
}
