import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SituatiePage } from './situatie.page';

const routes: Routes = [
  {
    path: '',
    component: SituatiePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SituatiePageRoutingModule {}
