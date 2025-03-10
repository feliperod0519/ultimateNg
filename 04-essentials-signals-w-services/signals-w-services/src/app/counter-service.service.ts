import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CounterServiceService {

  private _counter = signal(0);

  constructor() { }

  get counter() {
    return this._counter;
  }

  increment() {
    this._counter.update(count => count + 1);
  }

  decrement() {
    this._counter.update(count => count - 1);
  }
}
