import { Injectable } from '@angular/core';
import axios from 'axios';
import { FileSystemService } from '../fileSystem/file-system.service';
import { WriteFileResult } from '@capacitor/filesystem';
import { LoadingService } from 'src/app/loading.service';



@Injectable({
  providedIn: 'root'
})
export class RemoveBGService {

  constructor(private fileSystem : FileSystemService, private loadingService : LoadingService) { 
    
  }

  async removeBackground(file64: string, tipo : string, nomeFoto : string) {
    this.loadingService.showLoadingIndicator('Removendo o Fundo da sua Foto')
    axios.post('https://api.remove.bg/v1.0/removebg', {
      image_file_b64: file64,
      type: tipo,
      format: 'png',
      crop: true
    }, {
      headers: {
        'X-Api-Key': 'UXKJDjJEwKqftKN3VEiDB9zz'
      },
      responseType: 'blob'
    }).then((a)=> {
      console.log("Deu Certo: " + a.data)
      const url = URL.createObjectURL(a.data)
      
      fetch(url)
        .then((response)=> response.arrayBuffer())
        .then((arrayBuffer : ArrayBuffer)=> {
          const base64String = btoa(
            [...new Uint8Array(arrayBuffer)].map((num => String.fromCharCode(num))).join('')
          );
   
          this.fileSystem.writeFile(`${nomeFoto}.png`, base64String)
          this.loadingService.dismissLoadingIndicator()
        })
    }).catch((error)=> {
      this.loadingService.dismissLoadingIndicator()
      return console.error('Request failed:', error);
    })

  }

  private createURLandSave(data : any){

  }
}
