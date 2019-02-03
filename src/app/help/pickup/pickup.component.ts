import {Component, OnInit} from '@angular/core';
import {StepService} from '../../steps/step.service';

@Component({
  selector: 'pl-pickup',
  templateUrl: './pickup.component.html',
  styleUrls: ['./pickup.component.scss']
})
export class PickupComponent implements OnInit {

  constructor(private s: StepService) { }

  ngOnInit() {
    this.s.step = 0;
  }
}
