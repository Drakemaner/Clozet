import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClozetPage } from './clozet.page';

const routes: Routes = [
  {
    path: '',
    component: ClozetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClozetPageRoutingModule {}
