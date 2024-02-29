import { Component } from '@angular/core';
import { Roupas } from '../pseudoBanco/roupas';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  roupas = Roupas


  constructor() {}


  mudarRoupa(tipo : string){
    console.log(tipo)
    if(tipo == 'tee'){
      console.log("Oiee")
      let tees = this.roupas.filter(roupa => roupa.tipo == 'tee')
      for(let i = 0; i < tees.length; i++){
        if(tees[i].display == 'display: flex'){
          if(i + 1 < tees.length){
            tees[i].display = 'display: none'
            tees[i + 1].display = 'display: flex'
            return
          }
          else{
            tees[i].display = 'display: none'
            tees[0].display = 'display: flex'
            return 
          }
        }
      }
    }
    else if(tipo == 'pants'){
      let tees = this.roupas.filter(roupa => roupa.tipo == 'pants')
      for(let i = 0; i < tees.length; i++){
        if(tees[i].display == 'display: flex'){
          if(i + 1 < tees.length){
            tees[i].display = 'display: none'
            tees[i + 1].display = 'display: flex'
            return
          }
          else{
            tees[i].display = 'display: none'
            tees[0].display = 'display: flex'
            return
          }
        }
      }
    }
    else {
      let tees = this.roupas.filter(roupa => roupa.tipo == 'shoes')
      for(let i = 0; i < tees.length; i++){
        if(tees[i].display == 'display: flex'){
          if(i + 1 < tees.length){
            tees[i].display = 'display: none'
            tees[i + 1].display = 'display: flex'
            return
          }
          else{
            tees[i].display = 'display: none'
            tees[0].display = 'display: flex'
            return
          }
        }
      }
    }
  }

}
