import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClozetPageRoutingModule } from './clozet-routing.module';

import { ClozetPage } from './clozet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClozetPageRoutingModule
  ],
  declarations: [ClozetPage]
})
export class ClozetPageModule {}
