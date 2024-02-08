import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AvizePageRoutingModule } from './avize-routing.module';

import { AvizePage } from './avize.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AvizePageRoutingModule
  ],
  declarations: [AvizePage]
})
export class AvizePageModule {}
