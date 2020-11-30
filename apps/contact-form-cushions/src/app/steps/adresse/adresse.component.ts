import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AnalyticsService } from '@jl-clean/analytics';
import { DataService } from '@jl-clean/order';
import { StepService } from '../step.service';

@Component({
  selector: 'pl-adresse',
  templateUrl: './adresse.component.html',
  styleUrls: ['./adresse.component.scss'],
})
export class AdresseComponent implements AfterViewInit {
  @ViewChild('addressForm', { static: true }) addressForm: NgForm;

  constructor(
    public s: StepService,
    public d: DataService,
    private a: AnalyticsService
  ) {
    this.s.step = 6;
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
