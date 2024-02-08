import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConsumuriPageRoutingModule } from './consumuri-routing.module';
import { ConsumuriPage } from './consumuri.page';

import { CunkiesiriPipe } from '../cunkiesiri.pipe';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConsumuriPageRoutingModule
  ],
  declarations: [ConsumuriPage,CunkiesiriPipe]
})
export class ConsumuriPageModule {}
