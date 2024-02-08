import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EroaremodalPageRoutingModule } from './eroaremodal-routing.module';

import { EroaremodalPage } from './eroaremodal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EroaremodalPageRoutingModule
  ],
  declarations: [EroaremodalPage]
})
export class EroaremodalPageModule {}
