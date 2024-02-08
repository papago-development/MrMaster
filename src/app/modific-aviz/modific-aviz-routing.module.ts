import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModificAvizPage } from './modific-aviz.page';

const routes: Routes = [
  {
    path: '',
    component: ModificAvizPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModificAvizPageRoutingModule {}
