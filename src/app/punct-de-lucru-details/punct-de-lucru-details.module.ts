import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PunctDeLucruDetailsPageRoutingModule } from './punct-de-lucru-details-routing.module';

import { PunctDeLucruDetailsPage } from './punct-de-lucru-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PunctDeLucruDetailsPageRoutingModule
  ],
  declarations: [PunctDeLucruDetailsPage]
})
export class PunctDeLucruDetailsPageModule {}
