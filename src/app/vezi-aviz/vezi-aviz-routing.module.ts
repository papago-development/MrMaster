import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VeziAvizPage } from './vezi-aviz.page';

const routes: Routes = [
  {
    path: '',
    component: VeziAvizPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VeziAvizPageRoutingModule {}
