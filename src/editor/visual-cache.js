// Prepare changed visuals without touching the live scene. The caller swaps
// them in only after every new object has been built successfully.
export function visualSignature(value) {
  return JSON.stringify(value, (_key, item) => item && typeof item === 'object' && !Array.isArray(item)
    ? Object.fromEntries(Object.keys(item).sort().map(key => [key, item[key]])) : item);
}

export function planVisualUpdate(records, existing, keyOf, signatureOf) {
  const retained = new Map();
  const changed = [];
  const signatures = new Map();
  for (const record of records) {
    const key = keyOf(record);
    const signature = signatureOf(record);
    signatures.set(key, signature);
    const previous = existing.get(key);
    if (previous?.signature === signature) retained.set(key, previous.object);
    else changed.push(record);
  }
  return { retained, changed, signatures };
}

export function topologyVisualRecords(state, components, options = {}) {
  const nodes = new Map(state.nodes.map(node => [node.id, node]));
  const style = JSON.stringify(options);
  return ['nodes', 'edges', 'plates', 'links'].flatMap(collection => (state[collection] || []).map(item => {
    const kind = { nodes: 'node', edges: 'edge', plates: 'plate', links: 'link' }[collection];
    const dependencies = kind === 'edge' ? [nodes.get(item.a), nodes.get(item.b)]
      : kind === 'plate' ? item.nodeIds.map(id => nodes.get(id))
        : kind === 'link' ? [components.get(item.from?.componentId), components.get(item.to?.componentId)] : [];
    return { key: `${kind}:${item.id}`, signature: JSON.stringify([item, dependencies, style]) };
  }));
}

// Pointer devices can deliver many samples between two rendered frames.
// Keep the newest one; clicks and drag completion can flush synchronously.
export function createFrameTask(callback) {
  let pending = false;
  let value;
  return {
    schedule(next) { value = next; pending = true; },
    // Camera-only refreshes must not replace real input queued for this frame.
    scheduleIfIdle(next) { if (!pending) { value = next; pending = true; } },
    cancel() { pending = false; value = undefined; },
    flush() {
      if (!pending) return false;
      const next = value; pending = false; value = undefined;
      callback(next);
      return true;
    },
  };
}
