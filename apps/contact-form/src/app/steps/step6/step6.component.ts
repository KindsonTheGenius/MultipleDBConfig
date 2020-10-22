import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {StepService} from '../step.service';
import {DataService} from '../data.service';
import {AnalyticsService} from '../../analytics.service';

@Component({
  selector: 'pl-step6',
  templateUrl: './step6.component.html',
  styleUrls: ['./step6.component.scss']
})
export class Step6Component implements AfterViewInit {

  @ViewChild('contactForm', { static: true }) contactForm: NgForm;

  constructor(public s: StepService, public d: DataService, private a: AnalyticsService) {
    this.s.step = 6;
    this.a.setStep('Kontaktdaten', 5);
  }

  validate() {
    this.s.stepValid =
      this.contactForm.valid &&
      this.d.gender !== undefined &&
      this.d.givenName !== undefined &&
      this.d.familyName !== undefined &&
      this.d.email !== undefined &&
      this.d.phone !== undefined;
  }

  ngAfterViewInit() {
    this.validate();
  }
}
