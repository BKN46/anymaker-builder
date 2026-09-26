export function isSaveCancelled(error) {
  return error?.name === 'AbortError';
}

async function writeFile(handle, content) {
  const writable = await handle.createWritable();
  try {
    await writable.write(content);
    await writable.close();
  } catch (error) {
    try { await writable.abort?.(); } catch { /* Preserve the original write error. */ }
    throw error;
  }
}

export async function saveSingleFile(file, { pickFile, download }) {
  if (typeof pickFile !== 'function') {
    download(file);
    return 'downloaded';
  }
  const extension = file.name.slice(file.name.lastIndexOf('.'));
  const handle = await pickFile({
    suggestedName: file.name,
    types: [{ description: file.description, accept: { [file.type]: [extension] } }],
  });
  await writeFile(handle, file.content);
  return 'saved';
}

export async function saveFilePair(files, { download }) {
  files.forEach(download);
  return 'downloaded';
}
