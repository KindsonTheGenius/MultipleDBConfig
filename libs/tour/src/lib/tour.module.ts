import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiInterceptor } from '../../../../apps/contact-form-cushions/src/app/api.interceptor';

@NgModule({
  imports: [CommonModule],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true},
  ]
})
export class TourModule {}
