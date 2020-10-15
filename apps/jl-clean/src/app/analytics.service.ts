import {Injectable} from '@angular/core';

declare let ga;

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor() {
  }

  addPageView(url: string) {
    ga('set', 'page', url);
    ga('send', 'pageview');
  }

  setStep(name: string, step: number) {
    ga('ec:setAction', 'checkout', {'step': step});
    ga('send', 'event', 'Checkout', name);
  }

  finish() {
    ga('set', 'currencyCode', 'EUR');
    ga('ec:setAction', 'purchase', {
      id: Date.now(),
      revenue: 0,
      shipping: 0,
      tax: 0
    });
    ga('send', 'event', 'UX', 'click', 'Order');
  }
}
