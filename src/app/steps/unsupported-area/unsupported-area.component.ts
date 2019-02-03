import { Component, OnInit } from '@angular/core';
import {StepService} from '../step.service';

@Component({
  selector: 'pl-unsupported-area',
  templateUrl: './unsupported-area.component.html',
  styleUrls: ['./unsupported-area.component.scss']
})
export class UnsupportedAreaComponent implements OnInit {

  constructor(private s: StepService) { }

  ngOnInit() {
    this.s.step = 0;
  }

}
