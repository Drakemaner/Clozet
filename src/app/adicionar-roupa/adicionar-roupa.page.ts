import { Component, OnInit } from '@angular/core';
import { CameraService } from 'src/app/services/camera/camera.service';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage/storage.service';
import { Platform } from '@ionic/angular';
import { HttpService } from 'src/app/services/http/http.service';
import IUser from 'src/app/interfaces/IUser';
import { catchError, throwError, timeout } from 'rxjs';
import IRoupas from '../interfaces/IRoupas';
import { Roupas } from '../Roupas/roupas';

@Component({
  selector: 'app-adicionar-roupa',
  templateUrl: './adicionar-roupa.page.html',
  styleUrls: ['./adicionar-roupa.page.scss'],
})
export class AdicionarRoupaPage implements OnInit {

  tipoRoupa = ''
  roupas : IRoupas[] = Roupas
  user : IUser = {
    email: '',
    senha: ''
  }

  constructor(private httpService : HttpService, private platform : Platform, private cameraService : CameraService, private storageService : StorageService , private actionSheet : ActionSheetController, private alert : AlertController) { }

  ngOnInit() {
    this.verificarLogin()
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

  verificarLogin(){
    if(this.platform.is("mobile")){
      this.storageService.getObject('logado').then(nomeUsuariov=> {
        if(typeof(nomeUsuariov) == 'string'){
  
          this.user.nomeUsuario = nomeUsuariov!

          this.httpService.GetFor("Usuario", this.user.nomeUsuario!)
            .subscribe((data : IUser)=>{
              this.user = data     
            }, async (e)=> {
              const alert = await this.alert.create({
                header: 'Falha ao Receber suas Roupas Salvas',
                message: 'Por favor verifique sua conexão com a internet ou feche e abra o aplicativo novamente',
                buttons: ['Ok']
              })
              alert.present()
            })
        }
        else{
          console.log("Usuário não Logado")
        }
      })
    }
    else{
      this.user.nomeUsuario = localStorage.getItem('logado')!

      this.httpService.GetFor("Usuario", this.user.nomeUsuario!).pipe(
        timeout(15000),
        catchError((error)=> {
          console.log('Error')
          return throwError(error);
        })
      ).subscribe((data : IUser)=>{
        this.user = data      
      })
    }
  }

  tirarFoto(tipo : string){
    this.tipoRoupa = tipo
    this.cameraService.takePicture(this.roupas, this.tipoRoupa, this.user.id!)
  }

}
