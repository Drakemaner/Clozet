import { Component, OnInit } from '@angular/core';
import { Roupas } from '../Roupas/roupas';
import { StorageService } from '../services/storage/storage.service';
import { Router } from '@angular/router';
import { HttpService } from '../services/http/http.service';
import IRoupas from '../interfaces/IRoupas';
import IUser from '../interfaces/IUser';
import { LoadingService } from '../services/loading/loading.service';
import { IOutfits } from '../interfaces/IOutfits';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  roupas : IRoupas[] = Roupas
  user : IUser = {
    email: '',
    senha: ''
  }
  calcaId = 0

  outfit : IOutfits = {
    usuarioId: this.user.id!,
    roupasRequest: [{
      id: 0
    }]
  }

  constructor(private storage : StorageService, private httpService : HttpService, private loadingService : LoadingService) {}
 
  ngOnInit(): void { 
    this.storage.getObject('logado').then(async (a)=> {

      //this.loadingService.showLoadingIndicator('Pegando Roupas do Banco')
      this.httpService.GetFor("Usuario", a!).subscribe(async (user : IUser) => {
        this.user = user
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
    let cap = 0
    let head = 0
    let tee = 0
    let dress = 0
    let short = 0
    let pants = 0
    let shoes = 0

    user.roupas?.forEach(a => {
      if(a.tipo == 'cap'){
        cap == 0 ? a.display = 'display: flex' : a.display = 'display: none'
        cap = 1
      }
      if(a.tipo == 'head'){
        head == 0 ? a.display = 'display: flex' : a.display = 'display: none'
        head = 1
      }
      else if(a.tipo == 'tee'){
        tee == 0 ? a.display = 'display: flex' : a.display = 'display: none'
        tee = 1
      }
      else if(a.tipo == 'dress'){
        tee == 0 ? a.display = 'display: flex' : a.display = 'display: none'
        dress = 1
      }
      else if(a.tipo == 'short'){
        tee == 0 ? a.display = 'display: flex' : a.display = 'display: none'
        short = 1
      }
      else if(a.tipo == 'pants'){
        pants == 0 ? a.display = 'display: flex' : a.display = 'display: none'
        pants = 1
      }
      else if(a.tipo == 'shoes'){
        shoes == 0 ? a.display = 'display: flex' : a.display = 'display: none'
        shoes = 1
      }
      this.roupas.push(a)
    })
  }

  mudarRoupa(tipo : string){
    let roupasTipo
    
    if(tipo == 'pants' ||  tipo == 'short'){
      roupasTipo = this.roupas.filter(roupa => (roupa.tipo == 'pants' || 'short') && !roupa.deleteable)
    }
    else{
      roupasTipo = this.roupas.filter(roupa => roupa.tipo == tipo && !roupa.deleteable)
    }

    for(let i = 0; i < roupasTipo.length; i++){
      if(tipo == 'dress'){
        if(roupasTipo[i].display == 'display: flex'){
          if(i + 1 < roupasTipo.length){
            roupasTipo[i].display = 'display: none'
            roupasTipo[i + 1].display = 'display: flex'

            this.calcaId = this.roupas.filter(a=> (a.tipo == 'pants' || 'short') && a.display == 'display: flex')[0].id!
            this.roupas.filter(a=> (a.tipo == 'pants' || 'short') && a.display == 'display: flex')[0].display = 'display: none'
            return
          }
          else{
            roupasTipo[i].display = 'display: none'
            roupasTipo[0].display = 'display: flex'

            this.calcaId = this.roupas.filter(a=> a.tipo == 'pants' || 'short' && a.display == 'display: flex')[0].id!
            this.roupas.filter(a=> (a.tipo == 'pants' || 'short') && a.display == 'display: flex')[0].display = 'display: none'
            return 
          }
        }
      }
      else {
        if(this.roupas.filter(a=> a.tipo == 'pants' && a.display == 'display: flex').length == 0){
          if(roupasTipo[i].display == 'display: flex'){
            if(i + 1 < roupasTipo.length){
              this.roupas.filter(a=> a.id == this.calcaId).length > 0 ? this.roupas.filter(a=> a.id == this.calcaId)[0].display == 'display: flex' : this.roupas.filter(a=> a.tipo == 'pants')[0].display == 'display: flex'

              roupasTipo[i].display = 'display: none'
              roupasTipo[i + 1].display = 'display: flex'
              return
            }
            else{
              this.roupas.filter(a=> a.id == this.calcaId).length > 0 ? this.roupas.filter(a=> a.id == this.calcaId)[0].display == 'display: flex' : this.roupas.filter(a=> a.tipo == 'pants')[0].display == 'display: flex'

              roupasTipo[i].display = 'display: none'
              roupasTipo[0].display = 'display: flex'
              return 
            }
          }
        }
        else {
          if(roupasTipo[i].display == 'display: flex'){
            if(i + 1 < roupasTipo.length){
              roupasTipo[i].display = 'display: none'
              roupasTipo[i + 1].display = 'display: flex'
              return
            }
            else{
              roupasTipo[i].display = 'display: none'
              roupasTipo[0].display = 'display: flex'
              return 
            }
          }
        }
      }
    }
  }

  saveOutfit(){
    this.loadingService.showLoadingIndicator('Salvando Outfit')
    let roupasId = this.roupas.forEach((a)=> {
      if(a.display == 'display: flex'){
        let idRoupas = {
          id : a.id!
        }
        this.outfit.roupasRequest?.push(idRoupas)
      }
    })

    this.outfit.usuarioId = this.user.id!
    //Requisição Comentada até confirmação e realização de todos os ajustes e mudanças em relação a home page e suas funções
    //this.httpService.Post(this.outfit, "Outfit").subscribe(()=> this.loadingService.dismissLoadingIndicator())
  }
}
