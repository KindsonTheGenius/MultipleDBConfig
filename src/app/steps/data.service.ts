import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public zip: number;
  public city: string;

  constructor() { }
}
