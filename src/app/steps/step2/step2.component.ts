import { Component, OnInit } from '@angular/core';
import {StepService} from '../step.service';
import {DataService} from '../data.service';

@Component({
  selector: 'pl-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.scss']
})
export class Step2Component implements OnInit {

  public cities = [];

  constructor(public s: StepService, public d: DataService) { }

  ngOnInit() {
    this.cities = this.s.tours.filter(b => {
      return b.zip == this.d.zip;
    });

    if (this.cities.length < 2) {
      this.s.nextStep();
    }
  }

}
