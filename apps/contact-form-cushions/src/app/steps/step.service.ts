import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class StepService {
  private _step: number = 1;

  public stepValid = false;
  public maxSteps = 8;
  public done = false;

  public skippedStep2 = false;

  constructor(private http: HttpClient, private router: Router) {}

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
        route = 'pickup';
        break;
      case 4:
        route = 'return';
        break;
      case 5:
        route = 'address';
        break;
      case 6:
        route = 'contact';
        break;
      case 7:
        route = 'pictures';
      case 8:
        route = 'send';
    }
    this.router.navigate([route]);
  }
}
