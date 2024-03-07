import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraPermissionType, CameraSource, Photo } from '@capacitor/camera';
import { AlertController } from '@ionic/angular';
import { HttpService } from '../http/http.service';
import IRoupas from 'src/app/interfaces/IRoupas';
import { StorageService } from '../storage/storage.service';
import { RemoveBGService } from '../remove-bg/remove-bg.service';
import { FileSystemService } from '../fileSystem/file-system.service';
import { GetUriResult } from '@capacitor/filesystem';

@Injectable({
  providedIn: 'root'
})
export class CameraService {


  constructor(private httpService : HttpService, private fileSystem : FileSystemService , private removeBg : RemoveBGService, private storage : StorageService, private alertController : AlertController) { }

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

  takePicture = async (fotos : IRoupas[], tipo : string, usuarioIdParameter : number) => {
    
    let size = this.sizeSelect(tipo)

    console.log(`Largura: ${size.largura}; Altura: ${size.altura}`)
    
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      width: size.largura,
      height: size.altura,
      resultType: CameraResultType.DataUrl,
      promptLabelPicture: 'Tirar Foto',
      promptLabelPhoto: 'Escolher Foto da Galeria'
    }).then((image : Photo)=> {
      fotos.forEach(a=> {
        if(a.tipo == tipo && a.display == 'display: flex'){
          a.display = 'display: none'
        }
      })
      console.log("Data URL: " + image.dataUrl)
      let base64String = image.dataUrl?.slice(23)
      let nomeFoto = base64String?.slice(0,20).replace(/\//g, '')

      this.warnUser()

      this.removeBackground(tipo, base64String!, nomeFoto!, fotos, usuarioIdParameter)
    
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

  private removeBackground(tipo : string, base64String : string, nomeFoto : string, fotos : IRoupas[], usuarioIdParameter : number){
    if(tipo == 'head'){
      this.removeBg.removeBackground(base64String!, 'person', nomeFoto!).finally(()=>
        {
          this.fileSystem.redPath(`${nomeFoto}.png`).then((a : GetUriResult)=> {

            let substring = a.uri.slice(7)
            let webPath = `capacitor://localhost/_capacitor_file_${substring}`
            fotos.push({
              nome: 'foto',
              tipo: tipo,
              caminhoImagem: webPath,
              display: 'display: flex',
              deleteable: false
            })
            this.roupa.usuarioId = usuarioIdParameter
            this.roupa.caminhoImagem = webPath
            this.roupa.tipo = tipo

            this.httpService.Post(this.roupa, "Roupa").subscribe(()=>{
              console.log("Foto Cadastrada com Sucesso")
            })
          })
        })
      }
    else{
      this.removeBg.removeBackground(base64String!, 'product',nomeFoto!).finally(()=> {
        this.fileSystem.redPath(`${nomeFoto}.png`).then((a : GetUriResult)=> {
        
          let substring = a.uri.slice(7)
          let webPath = `capacitor://localhost/_capacitor_file_${substring}`
      
          fotos.push({
            nome: 'foto',
            tipo: tipo,
            caminhoImagem: webPath,
            display: 'display: flex',
            deleteable: false
          })
          this.roupa.usuarioId = usuarioIdParameter
          this.roupa.caminhoImagem = webPath
          this.roupa.tipo = tipo
        
          this.httpService.Post(this.roupa, "Roupa").subscribe(()=>{
            console.log("Foto Cadastrada com Sucesso")
           })
        })
      })
    }
  }
}