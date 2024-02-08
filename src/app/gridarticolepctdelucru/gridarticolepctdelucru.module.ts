import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GridarticolepctdelucruPageRoutingModule } from './gridarticolepctdelucru-routing.module';

import { GridarticolepctdelucruPage } from './gridarticolepctdelucru.page';

import { ChunkPipe } from '../chunk.pipe';
import { ChunkpctPipe } from '../chunkpct.pipe';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GridarticolepctdelucruPageRoutingModule
  ],
  declarations: [GridarticolepctdelucruPage,ChunkpctPipe]
})
export class GridarticolepctdelucruPageModule {}
