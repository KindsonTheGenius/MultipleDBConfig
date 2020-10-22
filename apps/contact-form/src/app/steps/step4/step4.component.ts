import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AnalyticsService } from '@jl-clean/analytics';
import { DataService } from '@jl-clean/order';
import { TourService } from '@jl-clean/tour';
import * as moment from 'moment';
import { StepService } from '../step.service';

@Component({
  selector: 'pl-step4',
  templateUrl: './step4.component.html',
  styleUrls: ['./step4.component.scss'],
})
export class Step4Component implements OnInit, AfterViewInit {
  public tour: any;
  public futureDates: any[];

  constructor(
    public s: StepService,
    public d: DataService,
    private a: AnalyticsService,
    private tourService: TourService
  ) {
    this.s.step = 4;
  }

  ngOnInit() {
    this.a.setStep('Rückgabe', 3);

    this.tourService
      .loadReturnDates(this.d.pickupDate.id, this.d.zip, this.d.city)
      .subscribe((returnDate: any[]) => {
        this.futureDates = returnDate;
      });
  }

  ngAfterViewInit() {
    this.validate();
  }

  get futureDatesJson() {
    return this.futureDates.map((f) => JSON.stringify(f));
  }

  validate() {
    this.s.stepValid =
      this.d.returnDate &&
      this.d.returnDate.start &&
      moment(this.d.returnDate.start).isAfter(moment().endOf('day')) &&
      moment(this.d.returnDate.start).isAfter(
        moment(this.d.pickupDate.start).add(6, 'days')
      );
  }
}
