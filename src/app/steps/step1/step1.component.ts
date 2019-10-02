import {AfterViewInit, Component, OnInit} from '@angular/core';
import {StepService} from '../step.service';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {DataService} from '../data.service';
import {AnalyticsService} from '../../analytics.service';
import {ActivatedRoute} from '@angular/router';
import {TourService} from '../../tour.service';

@Component({
  selector: 'pl-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.scss']
})
export class Step1Component implements OnInit, AfterViewInit {

  public zipCodes: string[] = [];

  constructor(public s: StepService, public d: DataService, private a: AnalyticsService, private route: ActivatedRoute, public tourService: TourService) {
    this.s.step = 1;
  }

  ngOnInit() {
    this.a.setStep('Ort', 1);

    this.tourService.loadZipCodes().subscribe(
      (res: string[]) => {
        this.zipCodes = res;
      }
    );

    const queryZip = this.route.snapshot.queryParams.zip;
    if (queryZip) {
      this.d.zip = queryZip;
      this.s.nextStep();
    }
  }

  validate() {
    this.s.stepValid = this.d.zip ? this.d.zip.toString().length === 5 : false;
  }

  onEnter() {
    this.s.nextStep();
  }

  ngAfterViewInit() {
    this.validate();
  }

  resetSavedSelections() {
    this.d.city = undefined;
    this.d.pickupDate = undefined;
    this.d.returnDate = undefined;
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.zipCodes.filter(v => v.toString().toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );

}
