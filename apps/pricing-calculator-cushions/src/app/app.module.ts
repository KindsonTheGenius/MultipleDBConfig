import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { Injector, LOCALE_ID, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CushionCalculatorModule } from '../../../../libs/cushion-calculator/src';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';

registerLocaleData(localeDe, 'de');

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], { initialNavigation: 'enabled' }),
    CushionCalculatorModule,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'de-DE',
    },
  ],
  bootstrap: environment.production ? [] : [AppComponent],
  entryComponents: [AppComponent],
})
export class AppModule {
  constructor(private injector: Injector) {
    const el = createCustomElement(AppComponent, { injector });
    customElements.define('cushions', el);
  }

  ngDoBootstrap() {}
}
