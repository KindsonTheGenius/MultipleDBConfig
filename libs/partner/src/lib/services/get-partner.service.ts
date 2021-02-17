import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GetPartnerService {
  constructor(private http: HttpClient) {}

  getPartnerNameByZipCode(zipCode: string) {
    return this.http.get<{ partner_number: string }>(
      `/api/tour/partner/${zipCode}`
    );
  }
}
