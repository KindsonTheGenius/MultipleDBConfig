import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AnalyticsService } from '@jl-clean/analytics';
import { DataService } from '@jl-clean/order';
import { StepService } from '../step.service';

@Component({
  selector: 'pl-step7',
  templateUrl: './step7.component.html',
  styleUrls: ['./step7.component.scss'],
})
export class Step7Component implements AfterViewInit {
  @ViewChild('confirmationForm', { static: true }) confirmationForm: NgForm;

  privacy = false;

  constructor(
    public s: StepService,
    public d: DataService,
    private a: AnalyticsService
  ) {
    this.s.step = 7;
    this.a.setStep('Erfolg', 6);
    this.a.finish();
  }

  validate() {
    this.s.stepValid = this.privacy;
  }

  ngAfterViewInit() {
    this.validate();
  }
}
