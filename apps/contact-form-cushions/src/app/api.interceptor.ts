import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (environment.production) {
      const apiReq = request.clone({url: `https://contact.jl-clean.de${request.url}`});
      return next.handle(apiReq);
    } else {
      return next.handle(request);
    }
  }
}
