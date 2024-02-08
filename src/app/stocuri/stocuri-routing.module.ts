import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StocuriPage } from './stocuri.page';

const routes: Routes = [
  {
    path: '',
    component: StocuriPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StocuriPageRoutingModule {}
