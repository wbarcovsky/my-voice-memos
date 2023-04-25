import { IMemo } from '../types/IMemo';
import { uniqueId } from './uniqueId';
import Emittery from 'emittery';

export class DbApi extends Emittery {
  protected dbName: string;
  protected storeName: string;
  protected version: number;

  protected db: IDBDatabase;
  protected store: IDBObjectStore;

  constructor() {
    super();
    this.dbName = 'my-voices-memo-db';
    this.storeName = 'memos';
    this.version = 1;
  }

  async init() {
    return new Promise((resolve, reject) => {
      if (!('indexedDB' in window)) {
        this.emit('error', "This browser doesn't support IndexedDB.");
        reject("This browser doesn't support IndexedDB.");
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
      };
      request.onerror = (e) => {
        this.emit('error', e);
        return reject(e);
      };
    });
  }

  async loadMemos(): Promise<IMemo[]> {
    if (!this.db) throw new Error('Db is not init yet');
    const t = this.db.transaction(this.storeName);
    const store = t.objectStore(this.storeName);
    return new Promise<IMemo[]>((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => {
        const res = request.result;
        res.sort((a, b) => b.createDate - a.createDate);
        resolve(res);
      };
      request.onerror = (e) => {
        this.emit('error', e);
        reject(e);
      };
    });
  }

  async saveMemo(memo: IMemo): Promise<void> {
    if (!this.db) throw new Error('Db is not init yet');
    return new Promise<void>((resolve, reject) => {
      const memoToSave = {
        ...memo
      };
      if (!memoToSave.id) memoToSave.id = uniqueId();
      if (!memoToSave.createDate) memoToSave.createDate = Date.now();
      const t = this.db.transaction(this.storeName, 'readwrite');
      const store = t.objectStore(this.storeName);
      store.put(memoToSave);
      t.oncomplete = () => resolve();
      t.onerror = (e) => {
        this.emit('error', e);
        reject(e);
      };
      t.commit();
    });
  }

  async removeMemo(memo: IMemo): Promise<void> {
    if (!this.db) throw new Error('Db is not init yet');
    return new Promise<void>((resolve, reject) => {
      const t = this.db.transaction(this.storeName, 'readwrite');
      const store = t.objectStore(this.storeName);
      store.delete(memo.id);
      t.oncomplete = () => resolve();
      t.onerror = (e) => {
        this.emit('error', e);
        reject(e);
      };
      t.commit();
    });
  }
}

export const dbApi = new DbApi();
