import { IMemo } from "../types/IMemo";
import { uniqueId } from "./uniqueId";

export class DbApi {

  protected dbName: string;
  protected storeName: string;
  protected version: number;

  protected db: IDBDatabase;
  protected store: IDBObjectStore;

  constructor() {
    this.dbName = 'my-voices-memo-db';
    this.storeName = 'memos';
    this.version = 1;
  }


  async init() {

    return new Promise((resolve, reject) => {
      if (!('indexedDB' in window)) {
        reject('This browser doesn\'t support IndexedDB.');
        return;
      }

      const request = window.indexedDB.open(this.dbName, this.version);
      request.onsuccess = () => {
        this.db = request.result;
        resolve(this.db);
      };
      request.onupgradeneeded = () => {
        if (!request.result.objectStoreNames.contains(this.storeName)) {
          request.result.createObjectStore(this.storeName, { keyPath: 'id' });
        }
      }
      request.onerror = (e) => reject(e);
    });
  }

  async loadMemos(): Promise<IMemo[]> {
    if (!this.db) throw new Error('Db is not init yet');
    const t = this.db.transaction(this.storeName);
    const store = t.objectStore(this.storeName);
    return new Promise<IMemo[]>((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = (e) => reject(e);
    })
  }

  async saveMemo(memo: IMemo): Promise<boolean> {
    if (!this.db) throw new Error('Db is not init yet');
    return new Promise<boolean>((resolve, reject) => {
      const memoToSave = {
        ...memo
      };
      if (!memoToSave.id) memoToSave.id = uniqueId();
      const t = this.db.transaction(this.storeName, 'readwrite');
      const store = t.objectStore(this.storeName);
      store.add(memoToSave);
      t.oncomplete = () => resolve(true);
      t.onerror = (e) => reject(e);
      t.commit();
    });
  }
}

export const dbApi = new DbApi();
