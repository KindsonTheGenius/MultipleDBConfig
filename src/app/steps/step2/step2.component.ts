import {AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {StepService} from '../step.service';
import {DataService} from '../data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'pl-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.scss']
})
export class Step2Component implements OnInit, AfterViewInit {

  public cities = [];

  constructor(public s: StepService, public d: DataService, private router: Router) {
    this.s.step = 2;
  }

  ngOnInit() {
    this.loadCities();
  }

  loadCities() {
    if (this.s.tours.length > 0) {
      this.cities = this.s.tours.filter(b => {
        return b.zip === this.d.zip;
      });

      if (this.cities.length < 2 && this.cities.length > 0) {
        this.s.skippedStep2 = true;
        this.d.city = this.cities[0].city;
        this.s.nextStep();
      } else if (this.cities.length === 0) {
        this.router.navigate(['/unsupported-area']);
      }
    } else {
      setTimeout(() => {
        this.loadCities();
      }, 200);
    }
  }

  ngAfterViewInit() {
    this.validate();
  }

  validate() {
    this.s.stepValid = this.d.city !== undefined;
  }
}
