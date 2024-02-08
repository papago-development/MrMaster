import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IntroducereFacturiPage } from './introducere-facturi.page';

const routes: Routes = [
  {
    path: '',
    component: IntroducereFacturiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IntroducereFacturiPageRoutingModule {}
