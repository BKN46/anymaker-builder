import { addMessages, applyTranslations, setText } from '../i18n.js';
import { normalizeRenderQuality, RENDER_QUALITY_PRESETS, renderQualityPreset } from './render-quality.js';

addMessages({
  '{ms} ms · {calls} 次绘制 · {triangles} 三角面 · {ratio}×': '{ms} ms · {calls} draws · {triangles} tris · {ratio}×',
  '渲染质量': 'Rendering quality', '质量预设': 'Quality preset', '流畅': 'Performance', '均衡': 'Balanced', '高质量': 'High quality', '自定义': 'Custom',
  '渲染比例': 'Resolution scale', '像素比上限': 'Maximum pixel ratio', '交互渲染比例': 'Interaction resolution',
  '帧率上限': 'Frame rate limit', '跟随屏幕': 'Display refresh rate', '多重采样抗锯齿': 'Multisample antialiasing',
  '启用阴影': 'Enable shadows', '阴影贴图尺寸': 'Shadow map size', '阴影过滤': 'Shadow filtering',
  '基础': 'Basic', 'PCF 柔化': 'PCF', '柔和 PCF': 'Soft PCF', '阴影更新': 'Shadow updates',
  '场景变化时': 'When the scene changes', '每帧': 'Every frame', '交互时更新阴影': 'Update shadows during interaction',
  '色调映射': 'Tone mapping', '无': 'None', '线性': 'Linear', '曝光': 'Exposure', '显示渲染统计': 'Show render statistics',
  '抗锯齿修改将在刷新页面后生效；请先保存工程。': 'Antialiasing changes apply after reloading; save your project first.',
  '像素比受屏幕像素比限制。交互比例用于拖动和相机操作，结束后恢复；关闭交互阴影会暂用上次阴影。': 'Pixel ratio is capped by the display. Interaction resolution applies while dragging or moving the camera and restores afterwards. Disabling interaction shadow updates reuses the last shadow.',
  '柔和 PCF 使用固定滤波；光照柔和度仅在 PCF 过滤下控制阴影半径。': 'Soft PCF uses fixed filtering; Light softness controls the shadow radius with PCF filtering.',
});

export function mountRenderQualitySettings(host, initial, onChange, needsReload) {
  let quality = normalizeRenderQuality(initial);
  const root = document.createElement('section'); root.id = 'render-quality-settings';
  const heading = document.createElement('h2'); heading.dataset.i18n = '渲染质量'; root.append(heading);
  const inputs = new Map();
  function field(key, label, type, options = []) {
    const row = document.createElement('div'); row.className = 'property';
    const name = document.createElement('label'); name.htmlFor = `render-${key}`; name.dataset.i18n = label;
    const input = document.createElement(type === 'select' ? 'select' : 'input'); input.id = name.htmlFor;
    if (type === 'select') for (const [value, text] of options) {
      const option = document.createElement('option'); option.value = String(value); option.dataset.i18n = text; input.append(option);
    } else {
      input.type = type;
      if (type === 'range') [input.min, input.max, input.step] = options.map(String);
    }
    row.append(name, input);
    let output;
    if (type === 'range') { output = document.createElement('output'); output.htmlFor = input.id; row.append(output); }
    root.append(row); inputs.set(key, { input, output });
    input.addEventListener(type === 'range' ? 'input' : 'change', () => {
      if (key === 'preset') {
        if (!RENDER_QUALITY_PRESETS[input.value]) return;
        quality = { ...RENDER_QUALITY_PRESETS[input.value], showStats: quality.showStats };
      } else quality = normalizeRenderQuality({ ...quality, [key]: type === 'checkbox' ? input.checked : typeof quality[key] === 'number' ? Number(input.value) : input.value });
      onChange(quality); sync();
    });
  }
  field('preset', '质量预设', 'select', [['performance', '流畅'], ['balanced', '均衡'], ['quality', '高质量'], ['custom', '自定义']]);
  field('resolutionScale', '渲染比例', 'range', [.5, 1.5, .05]);
  field('maxPixelRatio', '像素比上限', 'range', [1, 3, .25]);
  field('interactionScale', '交互渲染比例', 'range', [.35, 1, .05]);
  field('maxFps', '帧率上限', 'select', [[30, '30 FPS'], [60, '60 FPS'], [120, '120 FPS'], [0, '跟随屏幕']]);
  field('antialias', '多重采样抗锯齿', 'checkbox');
  field('shadows', '启用阴影', 'checkbox');
  field('shadowMapSize', '阴影贴图尺寸', 'select', [512, 1024, 2048, 4096].map(size => [size, `${size} × ${size}`]));
  field('shadowType', '阴影过滤', 'select', [['basic', '基础'], ['pcf', 'PCF 柔化'], ['soft', '柔和 PCF']]);
  field('shadowUpdate', '阴影更新', 'select', [['on-change', '场景变化时'], ['continuous', '每帧']]);
  field('interactionShadows', '交互时更新阴影', 'checkbox');
  field('toneMapping', '色调映射', 'select', [['none', '无'], ['linear', '线性'], ['reinhard', 'Reinhard'], ['aces', 'ACES Filmic']]);
  field('exposure', '曝光', 'range', [.1, 3, .05]);
  field('showStats', '显示渲染统计', 'checkbox');
  const notice = document.createElement('p'); notice.className = 'status'; notice.id = 'render-reload-notice'; notice.setAttribute('role', 'status');
  setText(notice, '抗锯齿修改将在刷新页面后生效；请先保存工程。'); root.append(notice);
  for (const text of ['像素比受屏幕像素比限制。交互比例用于拖动和相机操作，结束后恢复；关闭交互阴影会暂用上次阴影。', '柔和 PCF 使用固定滤波；光照柔和度仅在 PCF 过滤下控制阴影半径。']) {
    const hint = document.createElement('p'); hint.className = 'status'; setText(hint, text); root.append(hint);
  }
  function sync() {
    for (const [key, { input, output }] of inputs) {
      if (input.type === 'checkbox') input.checked = quality[key];
      else input.value = String(key === 'preset' ? renderQualityPreset(quality) : quality[key]);
      if (output) output.textContent = key.endsWith('Scale') ? `${Math.round(quality[key] * 100)}%` : `${quality[key].toFixed(2)}×`;
      input.disabled = key.startsWith('shadow') && key !== 'shadows' && !quality.shadows
        || key === 'interactionShadows' && !quality.shadows || key === 'exposure' && quality.toneMapping === 'none';
    }
    notice.hidden = !needsReload();
  }
  host.append(root); sync(); applyTranslations(root);
  return root;
}
