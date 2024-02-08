import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VanzariPageRoutingModule } from './vanzari-routing.module';

import { VanzariPage } from './vanzari.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VanzariPageRoutingModule
  ],
  declarations: [VanzariPage]
})
export class VanzariPageModule {}
