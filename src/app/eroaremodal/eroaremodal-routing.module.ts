import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EroaremodalPage } from './eroaremodal.page';

const routes: Routes = [
  {
    path: '',
    component: EroaremodalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EroaremodalPageRoutingModule {}
