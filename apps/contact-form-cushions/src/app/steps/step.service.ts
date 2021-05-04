import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class StepService {
  private _step: number = 1;

  private _imageArray: [];

  public stepValid = false;
  public maxSteps = 9;
  public done = false;

  public skippedStep2 = false;

  constructor(private http: HttpClient, private router: Router) {}

  get imageArray(){
    return this._imageArray;
  }

  set imageArray(imageArray: []){
    this._imageArray = imageArray;
  }

  get step() {
    return this._step;
  }

  set step(step: number) {
    this._step = step;
  }

  nextStep() {
    if (this.step < this.maxSteps) {
      this.step++;
      this.stepValid = false;
      this.routeStep();
    }
  }

  previousStep() {
    if (this.step > 0) {
      this.step--;
      if (this.skippedStep2 && this.step === 2) {
        this.step--;
        this.skippedStep2 = false;
      }
      this.stepValid = true;
      this.routeStep();
    }
  }

  routeStep() {
    let route = '';
    switch (this.step) {
      case 1:
        route = 'zip';
        break;
      case 2:
        route = 'city';
        break;
      case 3:
        route = 'calculator';
        break;
      case 4:
        route = 'pickup';
        break;
      case 5:
        route = 'return';
        break;
      case 6:
        route = 'address';
        break;
      case 7:
        route = 'contact';
        break;
      case 8:
        route = 'pictures';
        break;
      case 9:
        route = 'send';
    }
    this.router.navigate([route]);
  }
}
