import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraPermissionType, CameraSource } from '@capacitor/camera';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CameraService {


  constructor(private alertController : AlertController) { }


  checarPermissao = async () => {
    const permissoes = await Camera.checkPermissions();
  }

  solicitarPermissao = async (tipo : CameraPermissionType[]) => {
    const permissao = await Camera.requestPermissions({
      permissions: tipo
    })
  }


  pegarFoto = async () => {
     
    const galeria = await Camera.pickImages({
      quality: 100,
      width: 250,
      height: 400
    })
  }

  takePicture = async (fotos : Fotos[], tipo : string) => {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      saveToGallery: true,
      resultType: CameraResultType.Uri,
      promptLabelPicture: 'Tirar Foto',
      promptLabelPhoto: 'Escolher Foto da Galeria'
    }).then((image)=> {
      fotos.forEach(a=> {
        if(a.tipo == tipo && a.display == 'display: flex'){
          a.display = 'display: none'
        }
      })
      fotos.push({
        nome: image.dataUrl,
        tipo: tipo,
        imagem: image.webPath,
        base64: image.base64String,
        display: 'display: flex'
      })
    }).catch(async (error) => {
       if(error.errorMessage.includes('denied access to photos')){
        const alert = await this.alertController.create({
          header: 'Acesso a Galeria Não Permitida',
          message: 'Para permitir acesso vá a Ajustes > Privacidade e Segurança > Fotos',
          buttons: ['Continuar']
        })
        
        await alert.present()
       }
       else if(error.errorMessage.includes('denied access to camera')){
        const alert = await this.alertController.create({
          header: 'Acesso a Câmera Não Permitida',
          message: 'Para permitir acesso vá a Ajustes > Privacidade e Segurança > Câmera',
          buttons: ['Continuar']
        })
        
        await alert.present()
       }
    })


    

    

  }
}

export interface Fotos {
  nome?: string,
  tipo?: string,
  imagem?: string,
  base64?: string,
  display?: string
}
