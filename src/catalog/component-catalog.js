const safeRelativePath = value => {
  if (typeof value !== 'string' || !value.startsWith('data/') || value.includes('..') || !value.endsWith('.json')) throw new Error('Invalid component data path');
  return value;
};

export class ComponentCatalog {
  constructor(baseUrl) {
    this.baseUrl = baseUrl.endsWith('/') ? baseUrl : baseUrl + '/';
    this.index = new Map();
    this.details = new Map();
    this.bindings = new Map();
  }

  async load() {
    const response = await fetch(this.baseUrl + 'data/index.json');
    if (!response.ok) throw new Error('组件索引加载失败 HTTP ' + response.status);
    const payload = await response.json();
    if (payload.format !== 'anymaker-component-index' || payload.version !== 1 || payload.schema !== 'anymaker-component-index/1' || !Number.isInteger(payload.resourceVersion) || !Array.isArray(payload.definitions)) throw new Error('不支持的组件索引格式');
    for (const entry of payload.definitions) {
      if (!entry || typeof entry.id !== 'string' || !entry.id || this.index.has(entry.id)) throw new Error('组件索引 ID 无效或重复');
      this.index.set(entry.id, { ...entry, detail: safeRelativePath(entry.detail), binding: safeRelativePath(entry.binding) });
    }
    if (this.index.size !== payload.count) throw new Error('组件索引数量不匹配');
    return payload;
  }

  has(id) { return this.index.has(id); }
  entry(id) { return this.index.get(id); }
  entries() { return this.index.values(); }

  async definition(id) {
    if (this.details.has(id)) return this.details.get(id);
    const entry = this.entry(id);
    if (!entry) throw new Error('未知组件：' + id);
    const [detailResponse, bindingResponse] = await Promise.all([fetch(this.baseUrl + entry.detail), fetch(this.baseUrl + entry.binding)]);
    if (!detailResponse.ok || !bindingResponse.ok) throw new Error('组件详情或 Mesh 绑定加载失败：' + id);
    const [detail, binding] = await Promise.all([detailResponse.json(), bindingResponse.json()]);
    if (detail.id !== id || binding.id !== id) throw new Error('组件数据 ID 不匹配：' + id);
    const result = { ...detail, meshBinding: binding };
    this.details.set(id, result); this.bindings.set(id, binding);
    return result;
  }
}
