import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
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
  private _name: string;
  private _email: string;
  private _phone: string;
  private _smsNotification: boolean;

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

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
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

  get smsNotification(): boolean {
    return this._smsNotification;
  }

  set smsNotification(value: boolean) {
    this._smsNotification = value;
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

    this.http.post('/api/send-request', data)
      .subscribe(
        res => {
          this.router.navigate(['thank-you']);
        },
        err => {
          console.log(err);
        }
      );
  }

  public save() {
    localStorage.setItem('data', JSON.stringify({
      zip: this.zip,
      city: this.city,
      pickupDate: this.pickupDate,
      returnDate: this.returnDate,
      pickupCall: this.pickupCall,
      street: this.street,
      streetNumber: this.streetNumber,
      gender: this.gender,
      name: this.name,
      email: this.email,
      phone: this.phone,
      smsNotification: this.smsNotification,
      comment: this.comment
    }));
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
      this.name = data.name;
      this.email = data.email;
      this.phone = data.phone;
      this.smsNotification = data.smsNotification;
      this.comment = data.comment;
    }
  }
}
