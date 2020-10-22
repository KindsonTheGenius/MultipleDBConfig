import {AfterViewInit, Component, OnInit} from '@angular/core';
import {StepService} from '../steps/step.service';

@Component({
  selector: 'pl-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.scss']
})
export class ThankYouComponent implements OnInit, AfterViewInit {

  constructor(private s: StepService) {
    this.s.step = 0;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

}
