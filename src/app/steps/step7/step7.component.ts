import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {StepService} from '../step.service';
import {DataService} from '../data.service';

@Component({
  selector: 'pl-step7',
  templateUrl: './step7.component.html',
  styleUrls: ['./step7.component.scss']
})
export class Step7Component implements AfterViewInit {

  @ViewChild('confirmationForm') confirmationForm: NgForm;

  privacy = false;
  pricing = false;

  constructor(public s: StepService, public d: DataService) {
    this.s.step = 7;
  }

  validate() {
    this.s.stepValid = this.confirmationForm.valid && this.privacy && this.pricing;
  }

  ngAfterViewInit() {
    this.validate();
  }
}
