import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditareFacturiPage } from './editare-facturi.page';

const routes: Routes = [
  {
    path: '',
    component: EditareFacturiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditareFacturiPageRoutingModule {}
