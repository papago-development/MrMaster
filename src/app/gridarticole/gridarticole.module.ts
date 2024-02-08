import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GridarticolePageRoutingModule } from './gridarticole-routing.module';

import { GridarticolePage } from './gridarticole.page';
import { ChunkPipe } from '../chunk.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GridarticolePageRoutingModule
  ],
  declarations: [GridarticolePage,ChunkPipe],
})
export class GridarticolePageModule {}
