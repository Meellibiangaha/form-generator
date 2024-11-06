import { Injectable } from '@angular/core';

/** Простая обёртка над локалстореджем */

@Injectable({
  providedIn: 'root',
})
export class AppStorageService {
  saveItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  }
}
