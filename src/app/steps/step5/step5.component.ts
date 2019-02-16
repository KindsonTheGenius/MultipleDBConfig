import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {StepService} from '../step.service';
import {DataService} from '../data.service';
import {Form, NgForm} from '@angular/forms';
import {AnalyticsService} from '../../analytics.service';

@Component({
  selector: 'pl-step5',
  templateUrl: './step5.component.html',
  styleUrls: ['./step5.component.scss']
})
export class Step5Component implements AfterViewInit {

  @ViewChild('addressForm') addressForm: NgForm;

  constructor(public s: StepService, public d: DataService, private a: AnalyticsService) {
    this.s.step = 5;
    this.a.setStep('Adresse', 4);
  }

  validate() {
    this.s.stepValid = this.addressForm.valid && this.d.street !== undefined && this.d.streetNumber !== undefined;
  }

  ngAfterViewInit() {
    this.validate();
  }
}
