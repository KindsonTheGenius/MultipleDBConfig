import {AfterViewInit, Component, OnInit} from '@angular/core';
import {StepService} from '../step.service';
import {DataService} from '../data.service';

import * as moment from 'moment';
import {Moment} from 'moment';
import {AnalyticsService} from '../../analytics.service';

moment.locale('de');

@Component({
  selector: 'pl-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.scss']
})
export class Step3Component implements OnInit, AfterViewInit {

  public tour: any;
  public futureDates: any[];

  constructor(public s: StepService, public d: DataService, private a: AnalyticsService) {
    this.s.step = 3;
  }

  ngOnInit() {
    this.loadTour();
    this.a.setStep('Abholung', 2);
  }

  ngAfterViewInit() {
    this.validate();
  }

  loadTour() {
    if (this.s.tours.length > 0) {
      this.tour = this.s.tours.filter(b => {
        return (b.zip === this.d.zip && b.city === this.d.city);
      })[0];
      this.generateTourDates();
    } else {
      setTimeout(() => {
        this.loadTour();
      }, 200);
    }
  }

  get futureDatesJson() {
    return this.futureDates.map(f => JSON.stringify(f));
  }

  generateTourDates() {
    const dates = this.tour.dates;
    let day = moment().endOf('day');

    const futureDates = [];

    while (futureDates.length < 4) {
      day = day.add(1, 'day');
      for (const date of dates) {
        if (date.isoDay === day.isoWeekday() && !this.isHoliday(day)) {
          futureDates.push({
            isoDay: date.isoDay,
            time: date.time,
            date: day.toDate(),
            text: `${day.format('dd, DD.MM.')} ${date.time}`
          });
        }
      }
    }

    this.futureDates = futureDates;
  }

  isHoliday(date: Moment) {
    const holidays = this.s.holidays
      .filter(h => h.publicHolidayCode === this.tour.publicHolidayCode)
      .map(h => {
        return moment(h.date).endOf('day');
      });

    return holidays.includes(date);
  }

  validate() {
    this.s.stepValid = (this.d.pickupDate && this.d.pickupDate.date && moment(this.d.pickupDate.date).isAfter(moment()));
  }

  getWeekDay(isoWeekDay: number): string {
    return moment().isoWeekday(isoWeekDay).format('dddd');
  }
}
