import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModificFacturaPage } from './modific-factura.page';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: ModificFacturaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),ReactiveFormsModule],
  exports: [RouterModule],
})
export class ModificFacturaPageRoutingModule {}
