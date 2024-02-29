import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraPluginPermissions, CameraPermissionState, GalleryImageOptions, CameraPermissionType } from '@capacitor/camera';
import { ActionSheetController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CameraService {


  constructor() { }


  checarPermissao = async () => {
    const checarPermissao = await Camera.checkPermissions();
  }

  solicitarPermissao = async (tipo : CameraPermissionType) => {
    const permissao = await Camera.requestPermissions({
      permissions: [tipo]
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
      resultType: CameraResultType.Uri,
      
    });

    fotos.push({
      nome: 'Foto Qualquer',
      tipo: tipo,
      imagem: image.webPath,
      base64: image.base64String,
      display: 'display: none'
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
