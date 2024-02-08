import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IntroducereFacturiPageRoutingModule } from './introducere-facturi-routing.module';

import { IntroducereFacturiPage } from './introducere-facturi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IntroducereFacturiPageRoutingModule
  ],
  declarations: [IntroducereFacturiPage]
})
export class IntroducereFacturiPageModule {}
