import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SituatiePageRoutingModule } from './situatie-routing.module';

import { SituatiePage } from './situatie.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxDatatableModule, 
    IonicModule,
    SituatiePageRoutingModule
  ],
  declarations: [SituatiePage]
})
export class SituatiePageModule {}
