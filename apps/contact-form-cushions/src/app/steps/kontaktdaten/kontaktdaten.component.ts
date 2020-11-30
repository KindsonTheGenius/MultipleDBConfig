import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AnalyticsService } from '@jl-clean/analytics';
import { DataService } from '@jl-clean/order';
import { StepService } from '../step.service';

@Component({
  selector: 'pl-kontaktdaten',
  templateUrl: './kontaktdaten.component.html',
  styleUrls: ['./kontaktdaten.component.scss'],
})
export class KontaktDatenComponent implements AfterViewInit {
  @ViewChild('contactForm', { static: true }) contactForm: NgForm;

  constructor(
    public s: StepService,
    public d: DataService,
    private a: AnalyticsService
  ) {
    this.s.step = 7;
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
