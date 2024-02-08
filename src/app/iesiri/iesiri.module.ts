import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IesiriPageRoutingModule } from './iesiri-routing.module';

import { IesiriPage } from './iesiri.page';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IesiriPageRoutingModule
  ],
  declarations: [IesiriPage]
})
export class IesiriPageModule {}
