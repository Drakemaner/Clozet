import { Component, Input, OnInit } from '@angular/core';
import { CameraService } from 'src/app/services/camera/camera.service';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage/storage.service';
import { Platform } from '@ionic/angular';
import { Roupas } from 'src/app/Roupas/roupas';
import { HttpService } from 'src/app/services/http/http.service';
import IUser from 'src/app/interfaces/IUser';
import { catchError, throwError, timeout } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit  {

  @Input()
  title : string = ''

  @Input()
  buttons : string[] = []

  constructor(private httpService : HttpService, private platform : Platform, private cameraService : CameraService, private storageService : StorageService , private actionSheet : ActionSheetController) { }
  
  
  ngOnInit(): void {
    this.verificarLogin()
  }

  tipoRoupa = ''
  roupas = Roupas
  user : IUser = {
    email: '',
    senha: ''
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
