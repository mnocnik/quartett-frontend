import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class LocalStoreService {

  load(key: string): string | null {
    return localStorage.getItem(key);
  }

  store(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  loadObject(key: string): any {
    let stored: string | null = this.load(key);
    if (stored) {
      return JSON.parse(stored);
    }
    return undefined;
  }


  storeObject(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
