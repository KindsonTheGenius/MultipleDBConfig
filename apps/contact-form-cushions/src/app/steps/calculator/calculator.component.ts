import { AfterViewInit, Component, OnChanges, OnInit } from '@angular/core';
import { AnalyticsService } from '@jl-clean/analytics';
import { DataService } from '@jl-clean/order';
import { GetPartnerService } from '@jl-clean/partner';
import { Observable } from 'rxjs';
import { StepService } from '../step.service';

interface IPartner {
  partner_number: string;
}

@Component({
  selector: 'pl-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
})
export class CalculatorComponent implements AfterViewInit, OnInit, OnChanges {
  partnerName: Observable<IPartner>;
  sourceApp = 'contactForm';

  constructor(
    public s: StepService,
    public d: DataService,
    private a: AnalyticsService,
    private getpartner: GetPartnerService
  ) {
    this.s.step = 3;
    this.a.setStep('Kalkulator', 3);
  }

  ngAfterViewInit(): void {
    this.validate();
  }

  ngOnChanges(): void {}

  ngOnInit(): void {
    this.partnerName = this.getpartner.getPartnerNameByZipCode(this.d.zip);
    console.log(this.partnerName.subscribe((res) => console.log(res)));
  }

  validate() {
    let orderData = this.d.orderCushionsDTO;
    let controlAmount = 0;
    orderData.cushions.map((cushion) => {
      controlAmount += cushion.amount;
    });

    if (controlAmount === 0 && !orderData.specialOrderOption) {
      this.s.stepValid = false;
    }

    if (controlAmount > 0 || orderData.specialOrderOption) {
      this.s.stepValid = true;
    }
  }

  saveCalculatorOutput(orderDTO) {
    this.d.orderCushionsDTO = orderDTO;
    this.validate();
  }
}
