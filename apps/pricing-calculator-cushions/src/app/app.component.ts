import { Component } from '@angular/core';

@Component({
  selector: 'jl-clean-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  sourceApp: string = 'calculator';
  partnername: string = 'Freud1P';

  title = 'pricing-calculator-cushions';
}
