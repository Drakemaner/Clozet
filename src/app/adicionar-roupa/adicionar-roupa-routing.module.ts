import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdicionarRoupaPage } from './adicionar-roupa.page';

const routes: Routes = [
  {
    path: '',
    component: AdicionarRoupaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdicionarRoupaPageRoutingModule {}
