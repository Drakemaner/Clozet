import { Component, OnInit } from '@angular/core';
import { Roupas } from '../pseudoBanco/roupas';
import { StorageService } from '../services/storage/storage.service';
import { Router } from '@angular/router';
import { HttpService } from '../services/http/http.service';
import IRoupas from '../interfaces/IRoupas';
import IUser from '../interfaces/IUser';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  roupas : IRoupas[] = Roupas
  logado : string | null = ''

  constructor(private storage : StorageService, private httpService : HttpService) {}

  ngOnInit(): void {
    this.storage.getObject('logado').then((a)=> {
      this.httpService.GetFor("Usuario", a!).subscribe((user : IUser) => {
        if(user.roupas?.length != 0){
          let head = 0
          let tee = 0
          let pants = 0
          let shoes = 0
          if(user.roupas?.filter(a => a.tipo == "head").length != 0){
            this.roupas = this.roupas.filter(a => a.tipo != 'head')
          }
          if(user.roupas?.filter(a => a.tipo == "tee").length != 0){
            this.roupas = this.roupas.filter(a => a.tipo != 'tee')
          }
          if(user.roupas?.filter(a => a.tipo == "pants").length != 0){
            this.roupas = this.roupas.filter(a => a.tipo != 'pants')
          }
          if(user.roupas?.filter(a => a.tipo == "shoes").length != 0){
            this.roupas = this.roupas.filter(a => a.tipo != 'shoes')
          }
          user.roupas?.forEach(a => {
            if(a.tipo == 'head'){
              a.display = 'display: flex'
              if(head == 1){
                a.display = 'display: none'
              }
              head = 1
            }
            else if(a.tipo == 'tee'){
              a.display = 'display: flex'
              if(tee == 1){
                a.display = 'display: none'
              }
              tee = 1
            }
            else if(a.tipo == 'pants'){
              a.display = 'display: flex'
              if(pants == 1){
                a.display = 'display: none'
              }
              pants = 1
            }
            else if(a.tipo == 'shoes'){
              a.display = 'display: flex'
              if(shoes == 1){
                a.display = 'display: none'
              }
              shoes = 1
            }
            this.roupas.push(a)
          })
        }
        
      })
    })
  }

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
