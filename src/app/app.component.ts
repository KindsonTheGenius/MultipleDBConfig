import { Component } from '@angular/core';
import {StepService} from './steps/step.service';
import {DataService} from './steps/data.service';

@Component({
  selector: 'lnk-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public s: StepService, public d: DataService) {}
}
