import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TourService {

  constructor(private http: HttpClient) { }

  loadZipCodes() {
    return this.http.get('/api/tour/zip-codes');
  }

  loadCitiesForZipCode(zipCode: string) {
    return this.http.get(`/api/tour/zip/${zipCode}/locations`);
  }

  loadPickupDates(zipCode: string, city: string) {
    return this.http.get(`/api/tour/pickup-dates/${zipCode}/${city}`);
  }

  loadReturnDates(pickupDateId: number, zipCode: string, city: string) {
    return this.http.get(`/api/tour/return-dates/${pickupDateId}/${zipCode}/${city}`);
  }
}
