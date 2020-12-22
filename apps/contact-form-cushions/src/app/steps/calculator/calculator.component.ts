import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AnalyticsService } from '@jl-clean/analytics';
import { DataService } from '@jl-clean/order';
import { StepService } from '../step.service';

@Component({
  selector: 'pl-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
})
export class CalculatorComponent implements AfterViewInit, OnInit {
  partnername = 'Freud1P';
  sourceApp = 'contactForm';

  constructor(
    public s: StepService,
    public d: DataService,
    private a: AnalyticsService
  ) {
    this.s.step = 3;
    this.a.setStep('Kalkulator', 3);
  }

  ngAfterViewInit(): void {
    this.validate();
  }

  ngOnInit(): void {}

  validate() {
    let orderData = this.d.orderCushionsDTO;
    console.log(orderData);
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
    console.log('OrderDTO: ', orderDTO);
    this.validate();
  }
}
