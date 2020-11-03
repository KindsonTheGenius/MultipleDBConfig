import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnalyticsService } from '@jl-clean/analytics';
import { DataService } from '@jl-clean/order';
import { TourService } from '@jl-clean/tour';
import { StepService } from '../step.service';

@Component({
  selector: 'jl-clean-bilder',
  templateUrl: './bilder.component.html',
  styleUrls: ['./bilder.component.scss'],
})
export class BilderComponent implements OnInit, AfterViewInit {
  constructor(
    public s: StepService,
    public d: DataService,
    private router: Router,
    private a: AnalyticsService,
    public tourService: TourService
  ) {
    this.s.step = 7;
  }
  ngAfterViewInit(): void {}

  ngOnInit(): void {
    this.a.setStep('Pictures', 7);
  }
}
