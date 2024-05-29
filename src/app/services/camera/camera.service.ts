import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraPermissionType, CameraSource, Photo } from '@capacitor/camera';
import { AlertController } from '@ionic/angular';
import { HttpService } from '../http/http.service';
import IRoupas from 'src/app/interfaces/IRoupas';
import { StorageService } from '../storage/storage.service';
import { RemoveBGService } from '../remove-bg/remove-bg.service';
import { FileSystemService } from '../fileSystem/file-system.service';
import { GetUriResult } from '@capacitor/filesystem';
import IUser from 'src/app/interfaces/IUser';
import { catchError, interval, throwError, timeout } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CameraService {


  constructor(private fileSystem : FileSystemService , private removeBg : RemoveBGService, private storage : StorageService, private alertController : AlertController) { }

  

  checarPermissao = async () => {
    const permissoes = await Camera.checkPermissions();
  }

  solicitarPermissao = async (tipo : CameraPermissionType[]) => {
    const permissao = await Camera.requestPermissions({
      permissions: tipo
    })
  }


  pegarFoto = async (limit : number) => {
     
    const galeria = await Camera.pickImages({
      quality: 100,
      width: 250,
      height: 400,
      limit: limit
    })

    return galeria.photos;
  }

  takePicture = async (fotos : IRoupas[], tipo : string, usuarioIdParameter : number, nome : string) => {
    
    let size = this.sizeSelect(tipo)
    
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      width: size.largura,
      height: size.altura,
      resultType: CameraResultType.DataUrl,
      promptLabelPicture: 'Tirar Foto',
      promptLabelPhoto: 'Escolher Foto da Galeria'
    }).then((image : Photo)=> {
      
      let base64String = image.dataUrl?.slice(23)

      this.warnUser()

      this.removeBg.removeBackground(base64String!, tipo == 'head' ? 'person' : 'product', nome, fotos, usuarioIdParameter, tipo)
    
    }).catch((error : any) => {
       this.warnCameraPermission(error)
    })
  }

  private sizeSelect(tipo : string){
    let size = {
      largura : 0,
      altura : 0
    }
    switch(tipo){
      case 'cap':
        size.largura = 200;
        size.altura = 150;
        break;
      case 'head':
        size.largura = 250;
        size.altura = 200;
        break;
      case 'tee':
        size.largura = 300;
        size.altura = 400;
        break;
      case 'pants':
        size.largura = 300;
        size.altura = 400;
        break;
      case 'short':
        size.largura = 300;
        size.altura = 400;
        break;
      case 'dress':
        size.largura = 100;
        size.altura = 100;
        break;
      default:
        size.largura = 200;
        size.altura = 100;
        break;
    }

    return size
  }

  private async warnCameraPermission(error : any){
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
  }

  private warnUser(){
    this.storage.getObject('warned').then(async (a)=>{
      if(a != 'true'){
        const alert = await  this.alertController.create({
          header: 'Aviso',
          message: 'As Fotos são salvas localmente neste dispositivo',
          buttons: ['Ok']
        })
        this.storage.setObject('warned', 'true')

        await alert.present()
      }
    }).catch(error => console.log("Erro: " + error))
  }
}