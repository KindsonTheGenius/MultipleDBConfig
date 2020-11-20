import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { CalculatorComponent } from './calculator/calculator.component';

// import { environment } from '../environments/environment';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    MatSlideToggleModule,
    NgbTooltipModule,
    NgbModule,
  ],
  declarations: [CalculatorComponent],
  exports: [CalculatorComponent],
})
export class CushionCalculatorModule {}
