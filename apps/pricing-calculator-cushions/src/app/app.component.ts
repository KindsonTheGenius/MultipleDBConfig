import { Component } from '@angular/core';

@Component({
  selector: 'jl-clean-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  sourceApp: string = 'calculator';
  partnerName: string = 'Freud1';

  title = 'pricing-calculator-cushions';
}
