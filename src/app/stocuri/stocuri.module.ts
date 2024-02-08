import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StocuriPageRoutingModule } from './stocuri-routing.module';

import { StocuriPage } from './stocuri.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StocuriPageRoutingModule,
    NgxDatatableModule
  ],
  declarations: [StocuriPage]
})
export class StocuriPageModule {}
