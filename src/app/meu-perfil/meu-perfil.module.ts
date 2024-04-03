import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeuPerfilRoutingModule } from './meu-perfil-routing.module';
import { MeuPerfilComponent } from './meu-perfil.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [
    MeuPerfilComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    MeuPerfilRoutingModule,
    SharedModule
  ]
})
export class MeuPerfilModule { }
