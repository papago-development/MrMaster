import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SetariPageRoutingModule } from './setari-routing.module';

import { SetariPage } from './setari.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SetariPageRoutingModule,
ReactiveFormsModule

  ],
  declarations: [SetariPage]
})
export class SetariPageModule {}
