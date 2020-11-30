import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CushionCalculatorModule } from '../../../../libs/cushion-calculator/src';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PickupComponent } from './help/pickup/pickup.component';
import { ReturnComponent } from './help/return/return.component';
import { AbholComponent } from './steps/abhol/abhol.component';
import { AdresseComponent } from './steps/adresse/adresse.component';
import { BilderComponent } from './steps/bilder/bilder.component';
import { CalculatorComponent } from './steps/calculator/calculator.component';
import { KontaktDatenComponent } from './steps/kontaktdaten/kontaktdaten.component';
import { OrtComponent } from './steps/ort/ort.component';
import { PlzComponent } from './steps/plz/plz.component';
import { RueckgabeComponent } from './steps/rueckgabe/rueckgabe.component';
import { SendenComponent } from './steps/senden/senden.component';
import { UnsupportedAreaComponent } from './steps/unsupported-area/unsupported-area.component';
import { ThankYouComponent } from './thank-you/thank-you.component';

registerLocaleData(localeDe, 'de', localeDeExtra);

@NgModule({
  declarations: [
    AppComponent,
    PlzComponent,
    OrtComponent,
    AbholComponent,
    RueckgabeComponent,
    UnsupportedAreaComponent,
    AdresseComponent,
    KontaktDatenComponent,
    SendenComponent,
    ThankYouComponent,
    PickupComponent,
    ReturnComponent,
    BilderComponent,
    CalculatorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    CushionCalculatorModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'de-DE' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
