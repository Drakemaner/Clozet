import { Component } from '@angular/core';
import { CameraService } from 'src/app/services/camera/camera.service';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage/storage.service';
import { Platform } from '@ionic/angular';
import { Roupas } from 'src/app/pseudoBanco/roupas';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  {

  constructor(private platform : Platform, private cameraService : CameraService, private storageService : StorageService , private actionSheet : ActionSheetController, private router : Router) { }

  tipoRoupa = ''
  roupas = Roupas

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

}
