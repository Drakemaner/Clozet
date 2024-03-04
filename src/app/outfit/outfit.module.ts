import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OutfitPageRoutingModule } from './outfit-routing.module';

import { OutfitPage } from './outfit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OutfitPageRoutingModule
  ],
  declarations: [OutfitPage]
})
export class OutfitPageModule {}
