import { Component, OnInit } from '@angular/core';
import { Roupas } from '../Roupas/roupas';
import { StorageService } from '../services/storage/storage.service';
import { Router } from '@angular/router';
import { HttpService } from '../services/http/http.service';
import IRoupas from '../interfaces/IRoupas';
import IUser from '../interfaces/IUser';
import { LoadingService } from '../loading.service';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  roupas : IRoupas[] = Roupas
  logado : string | null = ''

  constructor(private storage : StorageService, private httpService : HttpService, private loadingService : LoadingService) {}
 
  ngOnInit(): void { 
    this.storage.getObject('logado').then(async (a)=> {
      this.loadingService.showLoadingIndicator('Pegando Roupas do Banco')
      this.httpService.GetFor("Usuario", a!).subscribe(async (user : IUser) => {
        if(user.roupas?.length != 0){
          this.verifyStaticClothes(user)
          this.organizeClothes(user)
          this.loadingService.dismissLoadingIndicator()
        }
        else{
          this.loadingService.dismissLoadingIndicator()
        }
      })
    })
  }

  verifyStaticClothes(user :IUser){
    if(user.roupas?.filter(a => a.tipo == "head").length != 0){
      this.roupas.forEach(a=> {
        if(a.tipo == 'head'){
          a.deleteable = true
          a.display = 'display: none'
        }
      })
    }
    if(user.roupas?.filter(a => a.tipo == "tee").length != 0){
      this.roupas.forEach(a=> {
        if(a.tipo == 'tee'){
          a.deleteable = true
          a.display = 'display: none'
        }
      })
    }
    if(user.roupas?.filter(a => a.tipo == "pants").length != 0){
      this.roupas.forEach(a=> {
        if(a.tipo == 'pants'){
          a.deleteable = true
          a.display = 'display: none'
        }
      })
    }
    if(user.roupas?.filter(a => a.tipo == "shoes").length != 0){
      this.roupas.forEach(a=> {
        if(a.tipo == 'shoes'){
          a.deleteable = true
          a.display = 'display: none'
        }
      })
    }
  }

  organizeClothes(user : IUser){
    let head = 0
    let tee = 0
    let pants = 0
    let shoes = 0

    user.roupas?.forEach(a => {
      if(a.tipo == 'head'){
        a.display = 'display: flex'
        a.deleteable = false
        if(head == 1){
          a.display = 'display: none'
          a.deleteable = false
        }
        head = 1
      }
      else if(a.tipo == 'tee'){
        a.display = 'display: flex'
        a.deleteable = false
        if(tee == 1){
          a.display = 'display: none'
          a.deleteable = false
        }
        tee = 1
      }
      else if(a.tipo == 'pants'){
        a.display = 'display: flex'
        a.deleteable = false
        if(pants == 1){
          a.display = 'display: none'
          a.deleteable = false
        }
        pants = 1
      }
      else if(a.tipo == 'shoes'){
        a.display = 'display: flex'
        a.deleteable = false
        if(shoes == 1){
          a.display = 'display: none'
          a.deleteable = false
        }
        shoes = 1
      }
      this.roupas.push(a)
    })
  }

  mudarRoupa(tipo : string){
    
    if(tipo == 'tee'){
      let tees = this.roupas.filter(roupa => roupa.tipo == 'tee' && !roupa.deleteable)
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
      let pants = this.roupas.filter(roupa => roupa.tipo == 'pants' && !roupa.deleteable)
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
      let shoes = this.roupas.filter(roupa => roupa.tipo == 'shoes' && !roupa.deleteable)
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
      let head = this.roupas.filter(roupa => roupa.tipo == 'head' && !roupa.deleteable)
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
