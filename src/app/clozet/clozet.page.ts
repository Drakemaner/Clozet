import { Component, OnInit, input } from '@angular/core';
import { HttpService } from '../services/http/http.service';
import IUser from '../interfaces/IUser';
import { ActionSheetController, AlertController, Platform } from '@ionic/angular';
import { StorageService } from '../services/storage/storage.service';
import { catchError, filter, throwError, timeout } from 'rxjs';
import { LoadingService } from '../services/loading/loading.service';
import { FileSystemService } from '../services/fileSystem/file-system.service';
import { Roupas } from '../Roupas/roupas';
import { CameraService } from '../services/camera/camera.service';

@Component({
  selector: 'app-clozet',
  templateUrl: './clozet.page.html',
  styleUrls: ['./clozet.page.scss'],
})
export class ClozetPage implements OnInit {

  user : IUser = {
    email: '',
    senha: ''
  }
  
  SearchInput = ''
  roupas = Roupas

  inputName = {
    show: false,
    id: 0,
    value: ''
  }
  
  inputOutfit =  {
    show: false,
    subject: '',
    value: ''
  }

  inputCloth = {
    tipo: '',
    show: false
  }

  select : any[] = []

  constructor(private fileSystemService : FileSystemService ,private loadingService : LoadingService, private http : HttpService, private alert : AlertController, private actionSheet : ActionSheetController, private cameraService : CameraService, private storage : StorageService) { }

  ngOnInit(): void {
    this.GetInfoUser()
  }

  GetInfoUser(){
    this.storage.getObject('logado').then(async (a)=> {
     this.http.GetFor("Usuario", a!).subscribe((user : IUser) => {
        this.user = user
      })
    })
  }

  searchClothes(){
    let roupas = this.roupas.filter(a=> a.nome.toUpperCase().includes(this.SearchInput.toUpperCase()) || this.SearchInput == '' ? true : false)

    return roupas
  }

  deletarRoupa(roupaID : number){
    this.loadingService.showLoadingIndicator('Deletando Roupa Selecionada')
    console.log(this.user.nomeUsuario)
    console.log(roupaID)

    this.http.Delete("Roupa", this.user.nomeUsuario!, roupaID).subscribe(async ()=> {
      this.fileSystemService.deleteFile(this.roupas.filter(a=> a.id == roupaID)[0].nome!)
      this.roupas.forEach((a,i)=> {
        if(a.id == roupaID){
          this.roupas.splice(i,1)
        }
      })
      this.loadingService.dismissLoadingIndicator()

      const alert = await this.alert.create({
        header: 'Roupa Deletada com Sucesso',
        buttons: ['Ok']
      })
      alert.present()

      
    }, async (e)=> {

      if(e.statusText.includes("Unknown Error")){
        this.loadingService.dismissLoadingIndicator()
        const alert = await this.alert.create({
          header: 'Falha ao Deletar a Roupa',
          message: 'Esta roupa já está salva em um outfit, não é possível deletá-la',
          buttons: ['Ok']
        })
        alert.present()
      }
      else {
        this.loadingService.dismissLoadingIndicator()
        const alert = await this.alert.create({
          header: 'Falha ao Deletar a Roupa',
          message: 'Por favor verifique sua conexão com a internet ou feche e abra o aplicativo novamente',
          buttons: ['Ok']
        })
        alert.present()
      }
      
      console.log('Oi' + e)
      console.error(e)
    })
  }

  showActions = async () => {
    const result = await this.actionSheet.create({
      header: 'Tipo da Roupa',
      buttons: [
        {
          text: 'Cap',
          handler: () => {this.inputCloth.show = true ; this.inputOutfit.subject = 'Cloth'; this.inputCloth.tipo = 'cap'}
        },
        {
          text: 'Head',
          handler: () => {this.inputCloth.show = true ; this.inputOutfit.subject = 'Cloth'; this.inputCloth.tipo = 'head'}
        },
        {
          text: 'Tee',
          handler: () => {this.inputCloth.show = true ; this.inputOutfit.subject = 'Cloth'; this.inputCloth.tipo = 'tee'}
        },
        {
          text: 'Dress',
          handler: () => {this.inputCloth.show = true ; this.inputOutfit.subject = 'Cloth'; this.inputCloth.tipo = 'dress'}
        },
        {
          text: 'Calça',
          handler: () => {this.inputCloth.show = true ; this.inputOutfit.subject = 'Cloth'; this.inputCloth.tipo = 'pants'}
        },
        {
          text: 'Short',
          handler: () => {this.inputCloth.show = true ; this.inputOutfit.subject = 'Cloth'; this.inputCloth.tipo = 'short'} 
        },
        {
          text: 'Tênis',
          handler: () => {this.inputCloth.show = true ; this.inputOutfit.subject = 'Cloth'; this.inputCloth.tipo = 'shoes'}
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ],
    })
    
    await result.present();
  }

  ShowInputOutfit(event : any){
    this.inputOutfit.show = event
    this.inputOutfit.subject = 'Outfit'
  }

  closeInputOutfit(event : any){
    this.inputOutfit.show = event
    this.inputCloth.show = event
  }

  SelectRoupas(event : any){
    if(event.target.checked == true){
      this.select.push(event.target.value)
    }
    else {
      this.select =  this.select.filter(a => a!= event.target.value)
    }
  }

  deletarRoupasSelecionadas(){
    this.loadingService.showLoadingIndicator('Deletando Roupas Selecionadas')
    this.select.forEach((a)=> {
      this.http.Delete("Roupa", this.user.nomeUsuario!, a).subscribe(async ()=> {
        this.fileSystemService.deleteFile(this.roupas.filter(b=> b.id == a)[0].nome!)
        this.roupas.forEach((x,i)=> {
          if(x.id == a){
            this.roupas.splice(i,1)
          }
        })
        this.loadingService.dismissLoadingIndicator()

        const alert = await this.alert.create({
          header: 'Roupas Deletadas com Sucesso',
          buttons: ['Ok']
        })
        alert.present()

        
      }, async (e)=> {
        if(e.statusText.includes("Unknown Error")){
          this.loadingService.dismissLoadingIndicator()
          const alert = await this.alert.create({
            header: 'Falha ao Deletar as Roupas',
            message: 'Alguma das roupas já estão salvas em um outfit, não é possível deletá-las',
            buttons: ['Ok']
          })
          alert.present()
        }
        else {
          this.loadingService.dismissLoadingIndicator()
          const alert = await this.alert.create({
            header: 'Falha ao Deletar as Roupas',
            message: 'Por favor verifique sua conexão com a internet ou feche e abra o aplicativo novamente',
            buttons: ['Ok']
          })
          alert.present()
        }
      })
    })
  }

  showInputName(id : number){
    !this.inputName.show && this.inputName.id != 0 ? this.inputName.show = true : this.inputName.show = false
    this.inputName.id = id
  }

  createCloth(event : any){
    this.cameraService.takePicture(this.roupas, this.inputCloth.tipo, this.user.id!, event)
  }

  changeClothName(id : number | void, nome? : string){
   if(nome == undefined){
    let roupaEditada = this.roupas.filter(a=> a.id == id)

    roupaEditada[0].nome = this.inputName.value

    this.http.Put(roupaEditada[0],"Roupa").subscribe(async ()=> {
      this.roupas.forEach(a=> {
        a.id == id ? a.nome = this.inputName.value : null
      })

      this.inputName.id = 0
      const alert = await this.alert.create({
        header: 'Nome da Roupa Alterado com Sucesso',
        buttons: ['Ok']
      })

      alert.present()
    }, async (e)=> {

      this.inputName.id = 0

      const alert = await this.alert.create({
        header: 'Erro ao Alterar o Nome da Roupa',
        buttons: ['Ok']
      })

      alert.present()
      console.error(e)
    })
   }
  
   else {
    let roupaCriada = this.roupas.filter(a=> a.id == id)

    roupaCriada[0].nome = this.inputName.value

    this.http.Put(roupaCriada[0],"Roupa").subscribe(async ()=> {
      this.roupas.forEach(a=> {
        a.id == id ? a.nome = nome : null
      })

    }, async (e)=> {

      this.inputName.id = 0

      console.error(e)
    })
   }

   this.inputName.value = ''
  }

}
