import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private _zip: string;
  private _city: string;
  private _pickupDate: any;
  private _returnDate: any;
  private _pickupCall: boolean;
  private _street: string;
  private _streetNumber: string;

  private _gender: string = 'Frau';
  private _givenName: string;
  private _familyName: string;
  private _email: string;
  private _phone: string;

  private _comment: string;

  constructor(private router: Router, private http: HttpClient) {
    this.load();
  }

  get zip(): string {
    return this._zip;
  }

  set zip(value: string) {
    this._zip = value;
    this.save();
  }

  get city(): string {
    return this._city;
  }

  set city(value: string) {
    this._city = value;
    this.save();
  }

  get pickupDate(): any {
    return this._pickupDate;
  }

  set pickupDate(value: any) {
    this._pickupDate = value;
    this.save();
  }

  get pickupDateJson(): any {
    if (this.pickupDate) {
      return JSON.stringify(this.pickupDate);
    }
  }

  set pickupDateJson(value: any) {
    this.pickupDate = JSON.parse(value);
  }

  get returnDate(): any {
    return this._returnDate;
  }

  set returnDate(value: any) {
    this._returnDate = value;
    this.save();
  }

  get returnDateJson(): any {
    if (this.returnDate) {
      return JSON.stringify(this.returnDate);
    }
  }

  set returnDateJson(value: any) {
    this.returnDate = JSON.parse(value);
  }

  get pickupCall(): boolean {
    return this._pickupCall;
  }

  set pickupCall(value: boolean) {
    this._pickupCall = value;
    this.save();
  }

  get street(): string {
    return this._street;
  }

  set street(value: string) {
    this._street = value;
    this.save();
  }

  get streetNumber(): string {
    return this._streetNumber;
  }

  set streetNumber(value: string) {
    this._streetNumber = value;
    this.save();
  }

  get gender(): string {
    return this._gender;
  }

  set gender(value: string) {
    this._gender = value;
    this.save();
  }

  get givenName(): string {
    return this._givenName;
  }

  set givenName(value: string) {
    this._givenName = value;
    this.save();
  }

  get familyName(): string {
    return this._familyName;
  }

  set familyName(value: string) {
    this._familyName = value;
    this.save();
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
    this.save();
  }

  get phone(): string {
    return this._phone;
  }

  set phone(value: string) {
    this._phone = value;
    this.save();
  }

  get comment(): string {
    return this._comment;
  }

  set comment(value: string) {
    this._comment = value;
    this.save();
  }

  finish() {
    const data = JSON.parse(localStorage.getItem('data'));

    this.http.post('/api/send-request', data).subscribe(
      (res) => {
        this.router.navigate(['thank-you']);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  public save() {
    localStorage.setItem(
      'data',
      JSON.stringify({
        zip: this.zip,
        city: this.city,
        pickupDate: this.pickupDate,
        returnDate: this.returnDate,
        pickupCall: this.pickupCall,
        street: this.street,
        streetNumber: this.streetNumber,
        gender: this.gender,
        givenName: this.givenName,
        familyName: this.familyName,
        email: this.email,
        phone: this.phone,
        comment: this.comment,
      })
    );
  }

  public load() {
    const data = JSON.parse(localStorage.getItem('data'));
    if (data) {
      this.zip = data.zip;
      this.city = data.city;
      this.pickupDate = data.pickupDate;
      this.returnDate = data.returnDate;
      this.pickupCall = data.pickupCall;
      this.street = data.street;
      this.streetNumber = data.streetNumber;
      this.gender = data.gender;
      this.givenName = data.givenName;
      this.familyName = data.familyName;
      this.email = data.email;
      this.phone = data.phone;
      this.comment = data.comment;
    }
  }
}
