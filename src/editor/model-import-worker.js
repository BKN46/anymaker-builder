import { parseModel } from '../assets/model-import.js';
import { prepareModelShell } from '../assets/model-shell.js';
import { convertModel, modelBounds, simplifyModel } from './model-conversion.js';

let model = null;
const levels = new Map();
self.onmessage = ({ data }) => {
  const { id, type } = data;
  try {
    if (type === 'load') {
      model = null; levels.clear();
      const parsed = parseModel(data.buffer, data.name);
      model = prepareModelShell(parsed);
      self.postMessage({ id, type, stats: { vertices: parsed.rawVertices, faces: parsed.rawFaces, bounds: modelBounds(parsed.positions), ...model.shellStats } });
    } else {
      if (!model) throw new Error('请先选择模型文件');
      const level = data.options.level;
      if (!levels.has(level)) {
        if (levels.size >= 3) levels.delete(levels.keys().next().value);
        levels.set(level, simplifyModel(model, level));
      }
      const result = convertModel(levels.get(level), data.options);
      self.postMessage({ id, type, result }, [result.preview.positions.buffer, result.preview.indices.buffer]);
    }
  } catch (error) {
    self.postMessage({ id, type, error: error instanceof Error ? error.message : String(error) });
  }
};
