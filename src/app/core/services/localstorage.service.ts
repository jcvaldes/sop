import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

  set(key: string, data: any): void {
    try {
      const [err, result] = this.safeJsonParse(data);
      localStorage.setItem(key, JSON.stringify(result));
    } catch (e) {
      console.error('Error saving', e);
    }
  }

  get(key: string): any {
    try {
      const [err, result] = this.safeJsonParse(localStorage.getItem(key));
      return result;
    } catch (e) {
      console.error('Error getting data', e);
      return null;
    }
  }

  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error('Error removing key', e);
    }
  }

  clear(): void {
    try {
      localStorage.clear();
    } catch (e) {
      console.error('Error cleaning localstorage', e);
    }
  }
  safeJsonParse(str) {
    try {
      return [null, JSON.parse(str)];
    } catch (err) {
      return [err, str === 'undefined' ? '' : str];
    }
  }
}
