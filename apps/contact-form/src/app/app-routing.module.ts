import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {Step1Component} from './steps/step1/step1.component';
import {Step2Component} from './steps/step2/step2.component';
import {Step3Component} from './steps/step3/step3.component';
import {Step4Component} from './steps/step4/step4.component';
import {Step5Component} from './steps/step5/step5.component';
import {Step6Component} from './steps/step6/step6.component';
import {Step7Component} from './steps/step7/step7.component';
import {ThankYouComponent} from './thank-you/thank-you.component';
import {UnsupportedAreaComponent} from './steps/unsupported-area/unsupported-area.component';
import {PickupComponent} from './help/pickup/pickup.component';
import {ReturnComponent} from './help/return/return.component';

const routes: Routes = [
  {path: '', redirectTo: 'zip', pathMatch: 'full'},
  {path: 'zip', component: Step1Component},
  {path: 'city', component: Step2Component},
  {path: 'pickup', component: Step3Component},
  {path: 'return', component: Step4Component},
  {path: 'address', component: Step5Component},
  {path: 'contact', component: Step6Component},
  {path: 'send', component: Step7Component},

  {path: 'thank-you', component: ThankYouComponent},
  {path: 'unsupported-area', component: UnsupportedAreaComponent},

  {path: 'pickup/help', component: PickupComponent},
  {path: 'return/help', component: ReturnComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}