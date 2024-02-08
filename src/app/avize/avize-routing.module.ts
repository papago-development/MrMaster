import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AvizePage } from './avize.page';

const routes: Routes = [
  {
    path: '',
    component: AvizePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AvizePageRoutingModule {}
