import { Injectable } from '@angular/core';
import axios from 'axios';
import { FileSystemService } from '../fileSystem/file-system.service';
import { LoadingService } from 'src/app/services/loading/loading.service';
import IRoupas from 'src/app/interfaces/IRoupas';
import { HttpService } from '../http/http.service';
import { catchError, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RemoveBGService {

  private roupa : IRoupas = {
    nome: '',
    tipo: '',
    caminhoImagem: ''
  }

  constructor(private fileSystem : FileSystemService, private loadingService : LoadingService, private httpService : HttpService) { 
    
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
          const webPath = await this.saveFileReceived(fotos, nomeFoto, base64String, tipoRoupa)
          
          this.saveOnSQLServer(nomeFoto, usuarioIdParameter, webPath, tipoRoupa)
        })
    }).catch((error)=> {
      this.loadingService.dismissLoadingIndicator()
      return console.error('Request failed:', error);
    })

  }

  private async saveFileReceived(fotos : IRoupas[], nomeFoto : string, base64String : string, tipoRoupa : string){
    const savedFile = await this.fileSystem.writeFile(`${nomeFoto}.png`, base64String)
    fotos.forEach(a=> {
      if(a.tipo == tipoRoupa && a.display == 'display: flex'){
        a.display = 'display: none'
      }
    })

    let substring = savedFile.uri.slice(7)
    console.log("Tipo : " + tipoRoupa)
    let webPath = `capacitor://localhost/_capacitor_file_${substring}`
    fotos.push({
      nome: 'foto',
      tipo: tipoRoupa,
      caminhoImagem: webPath,
      display: 'display: flex',
      deleteable: false
    })
    return webPath
  }

  private saveOnSQLServer(nomeFoto : string, usuarioIdParameter : number, webPath : string, tipoRoupa : string){
    this.roupa.nome = nomeFoto!
      this.roupa.usuarioId = usuarioIdParameter
      this.roupa.caminhoImagem = webPath
      this.roupa.tipo = tipoRoupa
       this.httpService.Post(this.roupa, "Roupa").pipe(
        catchError((error : any) => {
          if(error.status == 500){
            console.log("Servidor Caiu")
          }
          return throwError(error)
        })
      ).subscribe((a)=>{
        console.log("Foto Cadastrada com Sucesso")
        this.loadingService.dismissLoadingIndicator()
      })
  }
}
