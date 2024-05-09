import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClozetPageRoutingModule } from './clozet-routing.module';

import { ClozetPage } from './clozet.page';
import { SharedModule } from '../shared/shared.module';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClozetPageRoutingModule,
    SharedModule
  ],
  declarations: [ClozetPage]
})
export class ClozetPageModule {}
