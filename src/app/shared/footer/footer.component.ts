import { Component, OnInit } from '@angular/core';
import { Roupas } from 'src/app/pseudoBanco/roupas';
import { CameraService } from 'src/app/services/camera/camera.service';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage/storage.service';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit  {


  logado = false
  tipoRoupa = ''
  roupas = Roupas

  constructor(private platform : Platform, private cameraService : CameraService, private storageService : StorageService , private actionSheet : ActionSheetController, private router : Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('logado')){
      this.logado = true
    }
    if(this.storageService.getObject('logado') != null){
      this.logado = true
    }
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

  tirarFoto(tipo : string){
     
    this.tipoRoupa = tipo
    
    this.cameraService.takePicture(this.roupas, this.tipoRoupa)
  }

  navigate() {
    if(this.platform.is('mobile')){
      this.storageService.getObject('logado').then(value => {
        if(typeof(value) == 'string'){
          this.router.navigate(['/meuPerfil'])
        }
        else {
          this.router.navigate(["/login"])
        }
      })
    }
    else {
      if(localStorage.getItem('logado')){
        this.router.navigate(['/meuPerfil'])
      }
      else{
        
        this.router.navigate(['/login'])
      }
    }
  }

}
