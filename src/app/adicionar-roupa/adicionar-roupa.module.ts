import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdicionarRoupaPageRoutingModule } from './adicionar-roupa-routing.module';

import { AdicionarRoupaPage } from './adicionar-roupa.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdicionarRoupaPageRoutingModule,
    SharedModule
  ],
  declarations: [AdicionarRoupaPage]
})
export class AdicionarRoupaPageModule {}
