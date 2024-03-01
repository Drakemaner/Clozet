import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeuPerfilRoutingModule } from './meu-perfil-routing.module';
import { MeuPerfilComponent } from './meu-perfil.component';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [
    MeuPerfilComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    MeuPerfilRoutingModule
  ]
})
export class MeuPerfilModule { }
