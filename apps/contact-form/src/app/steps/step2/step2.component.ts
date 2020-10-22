import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '@jl-clean/order';
import { TourService } from '@jl-clean/tour';
import { StepService } from '../step.service';

@Component({
  selector: 'pl-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.scss'],
})
export class Step2Component implements OnInit, AfterViewInit {
  public cities = [];

  constructor(
    public s: StepService,
    public d: DataService,
    private router: Router,
    public tourService: TourService
  ) {
    this.s.step = 2;
  }

  ngOnInit() {
    this.loadCities();
  }

  loadCities() {
    this.tourService
      .loadCitiesForZipCode(this.d.zip)
      .subscribe((cities: string[]) => {
        this.cities = cities;
        if (cities.length < 2 && cities.length > 0) {
          this.s.skippedStep2 = true;
          this.d.city = this.cities[0].city;
          this.s.nextStep();
        } else if (this.cities.length === 0) {
          this.router.navigate(['/unsupported-area']);
        }
      });
  }

  ngAfterViewInit() {
    this.validate();
  }

  validate() {
    this.s.stepValid = this.d.city !== undefined;
  }
}
