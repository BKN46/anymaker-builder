const STORE_NAME = 'projects';
const DB_VERSION = 1;

function requestValue(request) {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error('IndexedDB request failed'));
  });
}

function transactionDone(transaction) {
  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error || new Error('IndexedDB transaction failed'));
    transaction.onabort = () => reject(transaction.error || new Error('IndexedDB transaction aborted'));
  });
}

export function createArchiveStore(indexedDB = globalThis.indexedDB, scope = '/') {
  if (!indexedDB) throw new Error('IndexedDB is unavailable');
  const databaseName = `anymaker-builder-archives-v1:${scope}`;
  const database = new Promise((resolve, reject) => {
    const request = indexedDB.open(databaseName, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        store.createIndex('savedAt', 'savedAt');
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error('Could not open IndexedDB archive store'));
  });

  return {
    async get(id) {
      const db = await database;
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const done = transactionDone(transaction);
      const record = await requestValue(transaction.objectStore(STORE_NAME).get(id));
      await done;
      return record;
    },
    async ensureCloudId(id, createId) {
      const db = await database;
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const done = transactionDone(transaction);
      const store = transaction.objectStore(STORE_NAME);
      const record = await requestValue(store.get(id));
      if (record && !record.cloudArchiveId) {
        record.cloudArchiveId = record.kind === 'auto' ? createId() : record.id;
        store.put(record);
      }
      await done;
      return record;
    },
    async list() {
      const db = await database;
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const done = transactionDone(transaction);
      const records = await requestValue(transaction.objectStore(STORE_NAME).getAll());
      await done;
      return records.sort((a, b) => Number(b.savedAt) - Number(a.savedAt));
    },
    async put(record) {
      if (!record || typeof record.id !== 'string' || !record.id) throw new Error('Archive ID is invalid');
      const db = await database;
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const done = transactionDone(transaction);
      const store = transaction.objectStore(STORE_NAME);
      const previous = await requestValue(store.get(record.id));
      const next = structuredClone(record);
      // Preserve sync identity atomically, including saves racing an upload.
      if (previous?.cloudArchiveId) next.cloudArchiveId = previous.cloudArchiveId;
      store.put(next);
      await done;
      return next;
    },
    async remove(id) {
      const db = await database;
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      transaction.objectStore(STORE_NAME).delete(id);
      await transactionDone(transaction);
    },
  };
}
