import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AnalyticsService } from '@jl-clean/analytics';
import { DataService } from '@jl-clean/order';
import { StepService } from '../step.service';

@Component({
  selector: 'pl-bilder',
  templateUrl: './bilder.component.html',
  styleUrls: ['./bilder.component.scss'],
})
export class BilderComponent implements AfterViewInit {
  @ViewChild('pictureForm', { static: true }) contactForm: NgForm;

  constructor(
    public s: StepService,
    public d: DataService,
    private a: AnalyticsService
  ) {
    this.s.step = 7;
    this.a.setStep('Kontaktdaten', 6);
  }

  validate() {
    this.s.stepValid = true;
  }

  ngAfterViewInit() {
    this.validate();
  }
}
