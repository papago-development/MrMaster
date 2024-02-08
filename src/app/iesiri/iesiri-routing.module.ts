import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IesiriPage } from './iesiri.page';

const routes: Routes = [
  {
    path: '',
    component: IesiriPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IesiriPageRoutingModule {}
