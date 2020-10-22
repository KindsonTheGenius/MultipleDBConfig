import {AfterViewInit, Component, OnInit} from '@angular/core';
import {StepService} from '../step.service';
import {DataService} from '../data.service';

import * as moment from 'moment';
import {AnalyticsService} from '../../analytics.service';
import {TourService} from '../../tour.service';

moment.locale('de');

@Component({
  selector: 'pl-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.scss']
})
export class Step3Component implements OnInit, AfterViewInit {

  public futureDates: any[];

  constructor(public s: StepService, public d: DataService, private a: AnalyticsService, public tourService: TourService) {
    this.s.step = 3;
  }

  ngOnInit() {
    this.a.setStep('Abholung', 2);

    this.tourService.loadPickupDates(this.d.zip, this.d.city)
      .subscribe(
        (pickupDates: any[]) => {
          this.futureDates = pickupDates;
        }
      )
  }

  ngAfterViewInit() {
    this.validate();
  }

  get futureDatesJson() {
    return this.futureDates.map(f => JSON.stringify(f));
  }

  validate() {
    this.s.stepValid = (this.d.pickupDate && this.d.pickupDate.start && moment(this.d.pickupDate.start).isAfter(moment()));
  }
}
