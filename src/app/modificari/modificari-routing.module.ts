import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModificariPage } from './modificari.page';

const routes: Routes = [
  {
    path: '',
    component: ModificariPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModificariPageRoutingModule {}
