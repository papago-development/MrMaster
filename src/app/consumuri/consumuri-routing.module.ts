import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConsumuriPage } from './consumuri.page';

const routes: Routes = [
  {
    path: '',
    component: ConsumuriPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsumuriPageRoutingModule {}
