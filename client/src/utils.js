import { getDocument } from "pdfjs-dist";

export async function extractPagesText(pdfUrl) {
  const loadingTask = getDocument(pdfUrl);
  const pdf = await loadingTask.promise;
  const numPages = pdf.numPages;
  const pagesText = [];

  for (let i = 1; i <= numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items.map(item => item.str).join(" ");
    pagesText.push(pageText);
  }
  return pagesText; // Array of strings, each representing a page's text
}

export function findPageForSection(pagesText, sectionText) {
  for (let i = 0; i < pagesText.length; i++) {
    if (pagesText[i].includes(sectionText)) {
      return i + 1; // Page numbers start at 1
    }
  }
  return -1; // Not found
}

let dbPromise = null;

function openDB(dbName = 'fileStorageDB', storeName = 'files') {
  if (dbPromise) return dbPromise; // reuse existing open promise

  dbPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);

    request.onerror = () => reject(request.error);

    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: 'id' });
      }
    };
  });

  return dbPromise;
}

export async function saveBlob(id, blob, dbName = 'fileStorageDB', storeName = 'files') {
  const db = await openDB(dbName, storeName);
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    const request = store.put({ id, blob });

    request.onsuccess = () => resolve(true);
    request.onerror = () => reject(request.error);
  });
}

export async function getBlob(id, dbName = 'fileStorageDB', storeName = 'files') {
  const db = await openDB(dbName, storeName);
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readonly');
    const store = tx.objectStore(storeName);
    const request = store.get(id);

    request.onsuccess = () => {
      if (request.result) resolve(request.result.blob);
      else resolve(null);
    };
    request.onerror = () => reject(request.error);
  });
}

export async function deleteBlob(id, dbName = 'fileStorageDB', storeName = 'files') {
  const db = await openDB(dbName, storeName);
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    const request = store.delete(id);

    request.onsuccess = () => resolve(true);
    request.onerror = () => reject(request.error);
  });
}


