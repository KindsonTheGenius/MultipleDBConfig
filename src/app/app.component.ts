import { Component } from '@angular/core';
import {StepService} from './steps/step.service';
import {DataService} from './steps/data.service';

@Component({
  selector: 'jlc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public avoidDoubleClick = false;
  constructor(public s: StepService, public d: DataService) {}
}
