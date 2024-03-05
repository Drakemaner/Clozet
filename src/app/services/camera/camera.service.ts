import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraPermissionType, CameraSource, Photo } from '@capacitor/camera';
import { AlertController } from '@ionic/angular';
import { HttpService } from '../http/http.service';
import IRoupas from 'src/app/interfaces/IRoupas';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class CameraService {


  constructor(private storage : StorageService, private alertController : AlertController, private httpService : HttpService) { }

  private roupa : IRoupas = {
    nome: '',
    tipo: '',
    caminhoImagem: ''
  }

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

  takePicture = async (fotos : Fotos[], tipo : string, usuarioIdParameter : number) => {
    let largura
    let altura;

    switch(tipo){
      case 'head':
        largura = 250;
        altura = 200;
        break;
      case 'tee':
        largura = 300;
        altura = 400;
        break;
      case 'pants':
        largura = 300;
        altura = 400;
        break;
      default:
        largura = 200;
        altura = 100;
        break;
    }
    
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      width: largura,
      height: altura,
      resultType: CameraResultType.Uri,
      promptLabelPicture: 'Tirar Foto',
      promptLabelPhoto: 'Escolher Foto da Galeria'
    }).then((image : Photo)=> {

      fotos.forEach(a=> {
        if(a.tipo == tipo && a.display == 'display: flex'){
          a.display = 'display: none'
        }
      })

      fotos.push({
        nome: 'foto',
        tipo: tipo,
        caminhoImagem: image.webPath,
        display: 'display: flex'
      })

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

      this.roupa.usuarioId = usuarioIdParameter
      this.roupa.caminhoImagem = image.webPath!
      this.roupa.tipo = tipo

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
    }).finally(()=> {
      this.httpService.Post(this.roupa, "Roupa").subscribe(()=>{
        console.log("Foto Cadastrada com Sucesso")
      })
    })


    

    

  }
}

export interface Fotos {
  nome?: string,
  tipo?: string,
  caminhoImagem?: string,
  base64?: string,
  display?: string
}
