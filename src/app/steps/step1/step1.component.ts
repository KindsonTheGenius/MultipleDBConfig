import {AfterViewInit, Component, OnInit} from '@angular/core';
import {StepService} from '../step.service';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {DataService} from '../data.service';

@Component({
  selector: 'pl-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.scss']
})
export class Step1Component implements OnInit, AfterViewInit {

  constructor(public s: StepService, public d: DataService) {
    this.s.step = 1;
  }

  ngOnInit() {

  }

  validate() {
    this.s.stepValid = this.d.zip.toString().length === 5;
  }

  ngAfterViewInit() {
    this.validate();
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.s.zips.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

}
