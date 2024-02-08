import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SetariPage } from './setari.page';

const routes: Routes = [
  {
    path: '',
    component: SetariPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SetariPageRoutingModule {}
