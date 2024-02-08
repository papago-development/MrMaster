import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificariPageRoutingModule } from './modificari-routing.module';

import { ModificariPage } from './modificari.page';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxPaginationModule,
    ModificariPageRoutingModule
  ],
  declarations: [ModificariPage]
})
export class ModificariPageModule {}
