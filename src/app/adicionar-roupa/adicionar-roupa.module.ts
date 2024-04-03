import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdicionarRoupaPageRoutingModule } from './adicionar-roupa-routing.module';

import { AdicionarRoupaPage } from './adicionar-roupa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdicionarRoupaPageRoutingModule
  ],
  declarations: [AdicionarRoupaPage]
})
export class AdicionarRoupaPageModule {}
