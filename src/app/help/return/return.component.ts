import { Component, OnInit } from '@angular/core';
import {StepService} from '../../steps/step.service';

@Component({
  selector: 'pl-return',
  templateUrl: './return.component.html',
  styleUrls: ['./return.component.scss']
})
export class ReturnComponent implements OnInit {

  constructor(private s: StepService) { }

  ngOnInit() {
    this.s.step = 0;
  }

}
