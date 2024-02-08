import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditareFacturiPageRoutingModule } from './editare-facturi-routing.module';

import { EditareFacturiPage } from './editare-facturi.page';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditareFacturiPageRoutingModule,
     NgxPaginationModule
  ],
  declarations: [EditareFacturiPage]
})
export class EditareFacturiPageModule {}
