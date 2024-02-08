import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GridarticolepctdelucruPage } from './gridarticolepctdelucru.page';

const routes: Routes = [
  {
    path: '',
    component: GridarticolepctdelucruPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GridarticolepctdelucruPageRoutingModule {}
