import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {StepService} from '../step.service';
import {DataService} from '../data.service';

@Component({
  selector: 'pl-step6',
  templateUrl: './step6.component.html',
  styleUrls: ['./step6.component.scss']
})
export class Step6Component implements AfterViewInit {

  @ViewChild('contactForm') contactForm: NgForm;

  constructor(public s: StepService, public d: DataService) {
    this.s.step = 6;
  }

  validate() {
    this.s.stepValid =
      this.contactForm.valid &&
      this.d.gender !== undefined &&
      this.d.name !== undefined &&
      this.d.email !== undefined &&
      this.d.phone !== undefined;
  }

  ngAfterViewInit() {
    this.validate();
  }
}
