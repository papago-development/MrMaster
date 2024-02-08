import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GridarticolePage } from './gridarticole.page';


const routes: Routes = [
  {
    path: '',
    component: GridarticolePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule],
})

export class GridarticolePageRoutingModule {}
