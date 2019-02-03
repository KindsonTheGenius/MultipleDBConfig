import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StepService {

  private _step: number = 1;

  private _tours = [];
  private _holidays = [];

  public stepValid = false;
  public maxSteps = 7;
  public done = false;

  public skippedStep2 = false;

  constructor(private http: HttpClient, private router: Router) {
    this.loadData();
  }

  private loadData() {
    this.http.get('/assets/data/tours.json')
      .subscribe(
        (res: any) => {
          this._tours = res;
        }
      );

    this.http.get('/assets/data/holidays.json')
      .subscribe(
        (res: any) => {
          this._holidays = res;
        }
      );
  }

  get tours() {
    return this._tours;
  }

  get zips() {
    const zips = this.tours.map(t => {
      return t.zip;
    });
    const unique = new Set(zips);
    return Array.from(unique.values());
  }

  get holidays() {
    return this._holidays;
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
        route = 'send';
    }
    this.router.navigate([route]);
  }
}
