import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from "./header/header.component";
import {IonicModule} from "@ionic/angular";
import {FooterComponent} from "./footer/footer.component";
import { RouterModule } from '@angular/router';
import { PopUpComponent } from './pop-up/pop-up.component';
import { OutfitInputComponent } from './outfit-input/outfit-input.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    PopUpComponent,
    OutfitInputComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    PopUpComponent,
    OutfitInputComponent
  ]
})
export class SharedModule { }
