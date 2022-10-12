import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

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


  storeObject(key: string, value: any): any {
    localStorage.setItem(key, JSON.stringify(value));
  }

  private _listener = new Subject();

  listen() {
    return this._listener.asObservable();
  }

  notify(notification: string) {
    this._listener.next(notification);
  }
}
