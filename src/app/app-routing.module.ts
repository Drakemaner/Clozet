import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {MainModule} from "./main/main.module";

function returnMain(){
  return MainModule
}

const routes : Routes = [
  {
    path: '',
    loadChildren: returnMain
  }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
