import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificFacturaPageRoutingModule } from './modific-factura-routing.module';

import { ModificFacturaPage } from './modific-factura.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ModificFacturaPageRoutingModule
  ],
  declarations: [ModificFacturaPage]
})
export class ModificFacturaPageModule {}
