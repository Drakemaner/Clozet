import { Component, OnInit } from '@angular/core';
import { Roupas } from '../pseudoBanco/roupas';
import { StorageService } from '../services/storage/storage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  roupas = Roupas
  logado : string | null = ''

  constructor() {}

  mudarRoupa(tipo : string){
    
    if(tipo == 'tee'){
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
      let pants = this.roupas.filter(roupa => roupa.tipo == 'pants')
      for(let i = 0; i < pants.length; i++){
        if(pants[i].display == 'display: flex'){
          if(i + 1 < pants.length){
            pants[i].display = 'display: none'
            pants[i + 1].display = 'display: flex'
            return
          }
          else{
            pants[i].display = 'display: none'
            pants[0].display = 'display: flex'
            return
          }
        }
      }
    }
    else if(tipo == 'shoes'){
      let shoes = this.roupas.filter(roupa => roupa.tipo == 'shoes')
      for(let i = 0; i < shoes.length; i++){
        if(shoes[i].display == 'display: flex'){
          if(i + 1 < shoes.length){
            shoes[i].display = 'display: none'
            shoes[i + 1].display = 'display: flex'
            return
          }
          else{
            shoes[i].display = 'display: none'
            shoes[0].display = 'display: flex'
            return
          }
        }
      }
    }
    else{
      let head = this.roupas.filter(roupa => roupa.tipo == 'head')
      for(let i = 0; i < head.length; i++){
        if(head[i].display == 'display: flex'){
          if(i + 1 < head.length){
            head[i].display = 'display: none'
            head[i + 1].display = 'display: flex'
            return
          }
          else{
            head[i].display = 'display: none'
            head[0].display = 'display: flex'
            return
          }
        }
      }
    }
  }

}
