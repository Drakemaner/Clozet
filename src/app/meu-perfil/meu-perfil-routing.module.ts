import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeuPerfilComponent } from './meu-perfil.component';
import { RouterModule, Routes } from '@angular/router';

const routes : Routes = [
  {
    path: '',
    component: MeuPerfilComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class MeuPerfilRoutingModule { }
