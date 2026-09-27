export const THUMBNAIL_CACHE_VERSION = 1;

const STORE_NAME = 'thumbnails';
const DB_VERSION = 1;

function requestValue(request) {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error('IndexedDB thumbnail request failed'));
  });
}

function transactionDone(transaction) {
  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error || new Error('IndexedDB thumbnail transaction failed'));
    transaction.onabort = () => reject(transaction.error || new Error('IndexedDB thumbnail transaction aborted'));
  });
}

function recordKey(id, resolution) {
  return `${id}:${resolution}`;
}

export function createThumbnailStore(indexedDB = globalThis.indexedDB, scope = '/', version = THUMBNAIL_CACHE_VERSION) {
  if (!indexedDB) throw new Error('IndexedDB is unavailable');
  if (!Number.isInteger(version) || version < 1) throw new Error('Thumbnail cache version is invalid');
  const databaseName = `anymaker-builder-thumbnails-v1:${scope}`;
  const database = new Promise((resolve, reject) => {
    const request = indexedDB.open(databaseName, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) db.createObjectStore(STORE_NAME, { keyPath: 'key' });
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error('Could not open IndexedDB thumbnail store'));
  });
  const ready = database.then(async db => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const records = await requestValue(store.getAll());
    for (const record of records) if (record?.version !== version) store.delete(record.key);
    await transactionDone(transaction);
    return db;
  });

  return {
    async get(id, resolution) {
      const db = await ready;
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const record = await requestValue(transaction.objectStore(STORE_NAME).get(recordKey(id, resolution)));
      await transactionDone(transaction);
      return record?.version === version && typeof record.dataUrl === 'string' ? record.dataUrl : null;
    },
    async put(id, resolution, dataUrl) {
      if (typeof id !== 'string' || !id || !Number.isInteger(resolution) || resolution <= 0 || typeof dataUrl !== 'string' || !dataUrl.startsWith('data:image/')) return false;
      const db = await ready;
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      transaction.objectStore(STORE_NAME).put({ key: recordKey(id, resolution), id, resolution, version, dataUrl, savedAt: Date.now() });
      await transactionDone(transaction);
      return true;
    },
  };
}
