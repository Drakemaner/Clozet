import { Injectable } from '@angular/core';
import axios from 'axios';
import { FileSystemService } from '../fileSystem/file-system.service';
import { LoadingService } from 'src/app/services/loading/loading.service';
import IRoupas from 'src/app/interfaces/IRoupas';
import { HttpService } from '../http/http.service';
import { catchError, throwError } from 'rxjs';
import { AlertController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class RemoveBGService {

  private roupa : IRoupas = {
    nome: '',
    tipo: '',
    caminhoImagem: ''
  }

  constructor(private fileSystem : FileSystemService, private loadingService : LoadingService, private httpService : HttpService, private alert : AlertController) { 
    
  }

  async removeBackground(file64: string, tipoIA : string, nomeFoto : string, fotos : IRoupas[], usuarioIdParameter : number, tipoRoupa : string) {
    this.loadingService.showLoadingIndicator('Removendo o Fundo da sua Foto')
    axios.post('https://api.remove.bg/v1.0/removebg', {
      image_file_b64: file64,
      type: tipoIA,
      format: 'png',
      crop: true
    }, {
      headers: {
        'X-Api-Key': 'UXKJDjJEwKqftKN3VEiDB9zz'
      },
      responseType: 'blob'
    }).then((a)=> {
      const url = URL.createObjectURL(a.data)
      
      fetch(url)
        .then((response)=> response.arrayBuffer())
        .then(async (arrayBuffer : ArrayBuffer)=> {
          const base64String = btoa(
            [...new Uint8Array(arrayBuffer)].map((num => String.fromCharCode(num))).join('')
          );
          const webPath = await this.saveFileReceived(nomeFoto, base64String, tipoRoupa)
          
          this.saveOnSQLServer(fotos, nomeFoto, usuarioIdParameter, webPath, tipoRoupa)
        })
    }).catch(async (error)=> {
      this.loadingService.dismissLoadingIndicator()
      const alert = await this.alert.create({
        header: 'Erro ao Remover Fundo da Foto',
        buttons: ['Ok']
      })

      alert.present()
      return console.error('Request failed:', error);
    })

  }

  private async saveFileReceived(nomeFoto : string, base64String : string, tipoRoupa : string){
    const savedFile = await this.fileSystem.writeFile(`${nomeFoto}.png`, base64String)
    
    let substring = savedFile.uri.slice(7)
    console.log("Tipo : " + tipoRoupa)
    let webPath = `capacitor://localhost/_capacitor_file_${substring}`

    return webPath
  }

  private saveOnSQLServer(fotos : IRoupas[], nomeFoto : string, usuarioIdParameter : number, webPath : string, tipoRoupa : string){

    this.roupa.nome = nomeFoto!
    this.roupa.usuarioId = usuarioIdParameter
    this.roupa.caminhoImagem = webPath
    this.roupa.tipo = tipoRoupa
    console.log(usuarioIdParameter)
    console.log(this.roupa)
     this.httpService.Post(this.roupa, "Roupa")
    .subscribe(async (a)=>{

      fotos.push({
        id: a.id,
        nome: 'foto',
        tipo: tipoRoupa,
        caminhoImagem: webPath,
        display: 'display: none',
        deleteable: false
      })

      console.log("Foto Cadastrada com Sucesso")
      this.loadingService.dismissLoadingIndicator()

      const alert = await this.alert.create({
        header: 'Foto Cadastrada com Sucesso',
        buttons: ['Ok']
      })
      alert.present()
    }, async (error) => {
      this.loadingService.dismissLoadingIndicator()
      
      const alert = await this.alert.create({
        header: 'Não foi Possível salvar a roupa no banco',
        message: 'Por favor verifique sua conexão com a internet ou feche e abra o aplicativo novamente',
        buttons: ['Ok']
      })
      alert.present()
      console.error('Request failed:', error);
    })
  }
}
