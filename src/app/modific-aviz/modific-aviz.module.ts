import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificAvizPageRoutingModule } from './modific-aviz-routing.module';

import { ModificAvizPage } from './modific-aviz.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificAvizPageRoutingModule
  ],
  declarations: [ModificAvizPage]
})
export class ModificAvizPageModule {}
