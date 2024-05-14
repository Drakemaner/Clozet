import { Component, OnInit } from '@angular/core';
import { Roupas } from '../Roupas/roupas';
import { StorageService } from '../services/storage/storage.service';
import { HttpService } from '../services/http/http.service';
import IRoupas from '../interfaces/IRoupas';
import IUser from '../interfaces/IUser';
import { LoadingService } from '../services/loading/loading.service';
import { IOutfits } from '../interfaces/IOutfits';
import { AlertController } from '@ionic/angular';
import { Outfit } from '../shared/outfit/outfit';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  roupas : IRoupas[] = Roupas

  outfit = Outfit
  
  user : IUser = {
    email: '',
    senha: ''
  }

  showInputOutfit = false

  PopUp = {
    openModal: false,
    show: false,
    type: '',
    roupaType: ''
  }

  constructor(private storage : StorageService, private httpService : HttpService, private loadingService : LoadingService, private alert : AlertController) {}
 
  ngOnInit(): void { 
    console.log(this.outfit)
    this.storage.getObject('logado').then(async (a)=> {

      this.loadingService.showLoadingIndicator('Pegando Roupas do Banco')
     this.httpService.GetFor("Usuario", a!).subscribe((user : IUser) => {
        this.user = user
        if(user.roupas?.length != 0){
          this.verifyStaticClothes(user)
          this.organizeClothes(user)
          this.loadingService.dismissLoadingIndicator()
        }
        else{
          this.loadingService.dismissLoadingIndicator()
        }
      }, async (e)=> {
        this.loadingService.dismissLoadingIndicator()
        const alert = await this.alert.create({
          header: 'Falha ao Receber suas Roupas Salvas',
          message: 'Por favor verifique sua conexão com a internet ou feche e abra o aplicativo novamente',
          buttons: ['Ok']
        })
        alert.present()
      })
    })
  }

  closeModal(event : any){
    return event
  }

  verifyRoupas() : boolean{
    return this.roupas.filter(a=> a.display == 'display: flex').length != 0
  }

  receivePopUp(event : any){
    this.PopUp.show = event.show;
    this.PopUp.openModal = event.openModal;
  }

  translate(value : string, type : string){
    if(type == 'upper'){
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
    else {
      return value.slice(0,20)
    }
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

  addPopUp(tipo : string, roupaTipo : string){
    this.verificacaoDress(tipo, roupaTipo).then(a=> this.PopUp.show = a)
    this.PopUp.type = tipo
    this.PopUp.roupaType = roupaTipo
    return this.PopUp
  }

  async verificacaoDress(tipo : string, roupaTipo : string) : Promise<boolean> {

    let calca = this.roupas.filter(a=> a.tipo == 'pants' && a.display == 'display: flex')[0]
    let dress = this.roupas.filter(a=> a.tipo == 'fem' && a.display == 'display: flex')[0]
    let tee = this.roupas.filter(a=> a.tipo == 'tee' && a.display == 'display: flex')[0]

    if(dress != null){
      if(roupaTipo == 'tee' || roupaTipo == 'pants'){
        console.log('Oie')
        const alert = await this.alert.create({
          header: 'Ação Não Permitida',
          message: 'Não é  permitido adicionar Camisa ou Calça, enquanto o vestido está sendo utilizado',
          buttons: ['Ok']
        })
        alert.present()
        return false
      }
    }
    else if(tipo == 'add' && roupaTipo == 'fem'){
      if(calca != null || tee != null){
        console.log('Oie')
        const alert = await this.alert.create({
          header: 'Ação Não Permitida',
          message: 'Não é  permitido adicionar vestido enquanto há camisa ou calça',
          buttons: ['Ok']
        })
        alert.present()
        return false
      }
    }
    
    return true
  }

  modalList(){
    let roupas = [
      {tipo: 'cap', nome: ''},
      {tipo: 'head', nome: ''},
      {tipo: 'glasses', nome: ''},
      {tipo: 'jaqueta', nome: ''},
      {tipo: 'clock', nome: ''},
      {tipo: 'bag', nome: ''},
      {tipo: 'tee', nome: ''},
      {tipo: 'fem', nome: ''},
      {tipo: 'pants', nome: ''},
      {tipo: 'shoes', nome: ''}
    ]

    this.roupas.forEach(a=> {
      roupas.forEach(b=> {
        if(a.tipo == b.tipo){
          if(a.display == 'display: flex'){
            b.nome = a.nome
          }
        }
      })
    })

    return roupas
  }

  saveOutfit(event : boolean){

    if(this.outfit.nome != ''){
      this.loadingService.showLoadingIndicator('Salvando Outfit')
      let roupasId = this.roupas.forEach((a)=> {
        if(a.display == 'display: flex'){
          let idRoupas = {
            id : a.id!
          }
          this.outfit.roupasId?.push(idRoupas)
        }
      })
      this.outfit.usuarioID = this.user.id!
      if(this.outfit.existente){
        this.httpService.Put(this.outfit, "Outfit").subscribe(async ()=> {
          
          this.loadingService.dismissLoadingIndicator()
          const alert = await this.alert.create({
            header: 'Outfit criado com Sucesso',
            buttons: ['Ok']
          })
        }, async (e)=> {
          this.loadingService.dismissLoadingIndicator()
          const alert = await this.alert.create({
            header: 'Ação Não Permitida',
            message: 'Não foi possível salvar o outfit, verifique sua conexão com a internet ou tente novamente',
            buttons: ['Ok']
          })
          alert.present()
          console.log(e)
        })
      }
      else{

        this.httpService.Post(this.outfit, "Outfit").subscribe(async ()=> {
          this.loadingService.dismissLoadingIndicator()
          const alert = await this.alert.create({
            header: 'Outfit criado com Sucesso',
            buttons: ['Ok']
          })
          alert.present()
        }, async (e)=> {
          this.loadingService.dismissLoadingIndicator()
          const alert = await this.alert.create({
            header: 'Ação Não Permitida',
            message: 'Não foi possível salvar o outfit, verifique sua conexão com a internet ou tente novamente',
            buttons: ['Ok']
          })
          alert.present()
          console.log(e)
        })
      } 
    }
    else {
      this.showInputOutfit = true
    }
  }

  verificacaoSalvarOutfit(){
    let roupasSelecionadas = this.roupas.filter(a=> a.display == 'display: flex')

    roupasSelecionadas.length == 0 ? this.alert.create({
      header: 'Ação Não Permitida',
      message: 'Não é possível salvar um Outfit sem nenhuma roupa',
      buttons: ['Ok']
    }) : undefined
  }

  closeInputOutfit(event : any){
    this.showInputOutfit = event
  }
}
