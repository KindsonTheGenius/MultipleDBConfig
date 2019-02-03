import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _zip: number;
  private _city: string;

  constructor() {
    this.load();
  }

  get zip(): number {
    return this._zip;
  }

  set zip(value: number) {
    this._zip = value;
    this.save();
  }

  get city(): string {
    return this._city;
  }

  set city(value: string) {
    this._city = value;
    this.save();
  }

  public save() {
    localStorage.setItem('data', JSON.stringify({
      zip: this.zip,
      city: this.city,
    }))
  }

  public load() {
    const data = JSON.parse(localStorage.getItem('data'));
    if (data) {
      this.zip = data.zip;
      this.city = data.city;
    }
  }
}
