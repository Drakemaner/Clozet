import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from "./header/header.component";
import {IonicModule} from "@ionic/angular";
import {FooterComponent} from "./footer/footer.component";
import { RouterModule } from '@angular/router';
import { PopUpComponent } from './pop-up/pop-up.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    PopUpComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    PopUpComponent
  ]
})
export class SharedModule { }
