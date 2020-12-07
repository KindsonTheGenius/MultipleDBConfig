import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AnalyticsService } from '@jl-clean/analytics';
import { DataService } from '@jl-clean/order';
import { StepService } from '../step.service';

@Component({
  selector: 'pl-senden',
  templateUrl: './senden.component.html',
  styleUrls: ['./senden.component.scss'],
})
export class SendenComponent implements AfterViewInit {
  @ViewChild('confirmationForm', { static: true }) confirmationForm: NgForm;

  privacy = false;

  constructor(
    public s: StepService,
    public d: DataService,
    private a: AnalyticsService
  ) {
    this.s.step = 9;
    this.a.setStep('Erfolg', 9);
    this.a.finish();
  }

  validate() {
    this.s.stepValid = this.privacy;
  }

  ngAfterViewInit() {
    this.validate();
    this.d.spinner = false;
  }
}
