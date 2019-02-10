import {AfterViewInit, Component, OnInit} from '@angular/core';
import {StepService} from '../step.service';
import {DataService} from '../data.service';
import * as moment from 'moment';
import {Moment} from 'moment';

@Component({
  selector: 'pl-step4',
  templateUrl: './step4.component.html',
  styleUrls: ['./step4.component.scss']
})
export class Step4Component implements OnInit, AfterViewInit {

  public tour: any;
  public futureDates: any[];

  constructor(public s: StepService, public d: DataService) {
    this.s.step = 4;
  }

  ngOnInit() {
    this.loadTour();
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
    let day = moment(this.d.pickupDate.date).add(6, 'days');

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
    this.s.stepValid = (
      this.d.returnDate &&
      this.d.returnDate.date &&
      moment(this.d.returnDate.date).isAfter(moment().endOf('day')) &&
      moment(this.d.returnDate.date).isAfter(moment(this.d.pickupDate.date).add(6, 'days'))
    );
  }
}
