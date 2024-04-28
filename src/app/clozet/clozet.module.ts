import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClozetPageRoutingModule } from './clozet-routing.module';

import { ClozetPage } from './clozet.page';
import { SharedModule } from '../shared/shared.module';
import { OutfitInputComponent } from './outfit-input/outfit-input.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClozetPageRoutingModule,
    SharedModule,
    FormsModule
  ],
  declarations: [ClozetPage,OutfitInputComponent]
})
export class ClozetPageModule {}
