export class StorageManagerCustom<T> {
    private storage: Storage;
  
    constructor(storageType: 'local' | 'session') {
      this.storage = storageType === 'local' ? localStorage : sessionStorage;
    }
  
    public setItem(key: string, value: T): void {
      this.storage.setItem(key, JSON.stringify(value));
    }
  
    public getItem(key: string): T | null {
      const item = this.storage.getItem(key);
      return item ? JSON.parse(item) : null;
    }
  
    public removeItem(key: string): void {
      this.storage.removeItem(key);
    }
  
    public clear(): void {
      this.storage.clear();
    }
  }
  