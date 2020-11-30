import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PickupComponent } from './help/pickup/pickup.component';
import { ReturnComponent } from './help/return/return.component';
import { AbholComponent } from './steps/abhol/abhol.component';
import { AdresseComponent } from './steps/adresse/adresse.component';
import { BilderComponent } from './steps/bilder/bilder.component';
import { CalculatorComponent } from './steps/calculator/calculator.component';
import { KontaktDatenComponent } from './steps/kontaktdaten/kontaktdaten.component';
import { OrtComponent } from './steps/ort/ort.component';
import { PlzComponent } from './steps/plz/plz.component';
import { RueckgabeComponent } from './steps/rueckgabe/rueckgabe.component';
import { SendenComponent } from './steps/senden/senden.component';
import { UnsupportedAreaComponent } from './steps/unsupported-area/unsupported-area.component';
import { ThankYouComponent } from './thank-you/thank-you.component';

const routes: Routes = [
  { path: '', redirectTo: 'zip', pathMatch: 'full' },
  { path: 'zip', component: PlzComponent },
  { path: 'city', component: OrtComponent },
  { path: 'calculator', component: CalculatorComponent },
  { path: 'pickup', component: AbholComponent },
  { path: 'return', component: RueckgabeComponent },
  { path: 'address', component: AdresseComponent },
  { path: 'contact', component: KontaktDatenComponent },
  { path: 'pictures', component: BilderComponent },

  { path: 'send', component: SendenComponent },

  { path: 'thank-you', component: ThankYouComponent },
  { path: 'unsupported-area', component: UnsupportedAreaComponent },

  { path: 'pickup/help', component: PickupComponent },
  { path: 'return/help', component: ReturnComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
