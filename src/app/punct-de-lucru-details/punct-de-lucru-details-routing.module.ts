import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PunctDeLucruDetailsPage } from './punct-de-lucru-details.page';

const routes: Routes = [
  {
    path: '',
    component: PunctDeLucruDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PunctDeLucruDetailsPageRoutingModule {}
