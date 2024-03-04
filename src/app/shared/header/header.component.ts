import { Component, OnInit } from '@angular/core';
import { CameraService } from 'src/app/services/camera/camera.service';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage/storage.service';
import { Platform } from '@ionic/angular';
import { Roupas } from 'src/app/pseudoBanco/roupas';
import { HttpService } from 'src/app/services/http/http.service';
import IUser from 'src/app/interfaces/IUser';
import { catchError, throwError, timeout } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit  {

  constructor(private httpService : HttpService, private platform : Platform, private cameraService : CameraService, private storageService : StorageService , private actionSheet : ActionSheetController, private router : Router) { }
  
  
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
          text: 'Head',
          handler: () => this.tirarFoto('head')
        },
        {
          text: 'Tee',
          handler: () => this.tirarFoto('tee')
        },
        {
          text: 'Calça',
          handler: () => this.tirarFoto('pants')  
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
        console.log(nomeUsuariov)
        this.user.nomeUsuario = nomeUsuariov!

        this.httpService.GetFor("Usuario", this.user.nomeUsuario!).pipe(
          timeout(5000),
          catchError((error)=> {
            console.log('Error')
            return throwError(error);
          })
        ).subscribe((data : IUser)=>{
          this.user = data
          console.log(this.user)       
        })
      })
    }
    else{
      this.user.nomeUsuario = localStorage.getItem('logado')!

      this.httpService.GetFor("Usuario", this.user.nomeUsuario!).pipe(
        timeout(5000),
        catchError((error)=> {
          console.log('Error')
          return throwError(error);
        })
      ).subscribe((data : IUser)=>{
        this.user = data
        console.log(this.user)       
      })
    }
  }

  tirarFoto(tipo : string){

    this.tipoRoupa = tipo
     
    this.cameraService.takePicture(this.roupas, this.tipoRoupa, this.user.id!)
  }
  
}
