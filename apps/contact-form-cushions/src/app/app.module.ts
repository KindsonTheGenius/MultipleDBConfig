import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {Step1Component} from './steps/step1/step1.component';
import {Step2Component} from './steps/step2/step2.component';
import {Step3Component} from './steps/step3/step3.component';
import {Step4Component} from './steps/step4/step4.component';
import {UnsupportedAreaComponent} from './steps/unsupported-area/unsupported-area.component';
import {Step5Component} from './steps/step5/step5.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {Step6Component} from './steps/step6/step6.component';
import {Step7Component} from './steps/step7/step7.component';
import {ThankYouComponent} from './thank-you/thank-you.component';
import {PickupComponent} from './help/pickup/pickup.component';
import {ReturnComponent} from './help/return/return.component';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';

registerLocaleData(localeDe, 'de', localeDeExtra);

@NgModule({
  declarations: [
    AppComponent,
    Step1Component,
    Step2Component,
    Step3Component,
    Step4Component,
    UnsupportedAreaComponent,
    Step5Component,
    Step6Component,
    Step7Component,
    ThankYouComponent,
    PickupComponent,
    ReturnComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "de-DE" },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
