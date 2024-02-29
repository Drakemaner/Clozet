import { Component } from '@angular/core';
import { Roupas } from 'src/app/pseudoBanco/roupas';
import { CameraService } from 'src/app/services/camera/camera.service';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent   {

  tipoRoupa = ''
  roupas = Roupas

  constructor(private cameraService : CameraService, private actionSheet : ActionSheetController) { }

  showActions = async () => {
    const result = await this.actionSheet.create({
      header: 'Tipo da Roupa',
      buttons: [
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
