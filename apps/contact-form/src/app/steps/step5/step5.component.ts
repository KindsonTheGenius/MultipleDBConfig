import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from '@jl-clean/order';
import { AnalyticsService } from '../../analytics.service';
import { StepService } from '../step.service';

@Component({
  selector: 'pl-step5',
  templateUrl: './step5.component.html',
  styleUrls: ['./step5.component.scss'],
})
export class Step5Component implements AfterViewInit {
  @ViewChild('addressForm', { static: true }) addressForm: NgForm;

  constructor(
    public s: StepService,
    public d: DataService,
    private a: AnalyticsService
  ) {
    this.s.step = 5;
    this.a.setStep('Adresse', 4);
  }

  validate() {
    this.s.stepValid =
      this.addressForm.valid &&
      this.d.street !== undefined &&
      this.d.streetNumber !== undefined;
  }

  ngAfterViewInit() {
    this.validate();
  }
}