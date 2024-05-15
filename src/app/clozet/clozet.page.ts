import { Component, OnInit } from '@angular/core';
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

  roupas = Roupas
  
  showInputOutfit = false

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
          handler: () => this.tirarFoto('cap')
        },
        {
          text: 'Head',
          handler: () => this.tirarFoto('head')
        },
        {
          text: 'Tee',
          handler: () => this.tirarFoto('tee')
        },
        {
          text: 'Dress',
          handler: () => this.tirarFoto('dress')
        },
        {
          text: 'Calça',
          handler: () => this.tirarFoto('pants')  
        },
        {
          text: 'Short',
          handler: () => this.tirarFoto('short')  
        },
        {
          text: 'Tênis',
          handler: () => this.tirarFoto('shoes')
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
    this.showInputOutfit = event
  }

  closeInputOutfit(event : any){
    this.showInputOutfit = event
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

  tirarFoto(tipo : string){
    console.log(this.user)
    this.cameraService.takePicture(this.roupas, tipo, this.user.id!)
  }

}
