import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VanzariPage } from './vanzari.page';

const routes: Routes = [
  {
    path: '',
    component: VanzariPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VanzariPageRoutingModule {}
