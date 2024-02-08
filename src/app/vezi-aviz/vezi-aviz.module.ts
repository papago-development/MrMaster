import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VeziAvizPageRoutingModule } from './vezi-aviz-routing.module';

import { VeziAvizPage } from './vezi-aviz.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VeziAvizPageRoutingModule
  ],
  declarations: [VeziAvizPage]
})
export class VeziAvizPageModule {}
