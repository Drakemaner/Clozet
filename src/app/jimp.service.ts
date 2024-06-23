import { Injectable } from '@angular/core';
import IRoupas from './interfaces/IRoupas';
import * as Jimp from 'jimp';
import { FileSystemService } from './services/fileSystem/file-system.service';

@Injectable({
  providedIn: 'root'
})
export class JimpService {

  constructor(private file : FileSystemService) { }

  async criarImagemCompartilharmento(roupas : IRoupas[]){
    const largura = 1080
    const altura = 1920

    const imagemPrincipal = new Jimp(largura, altura, "#ffffff")

    let roupasImagem : {
      imagem: any,
      x: number, 
      y: number
    }[] = []

    roupas.forEach(async (a) => {
      a.tipo == 'cap' ? roupasImagem.push({imagem: await Jimp.read(a.caminhoImagem), x: 200, y: 100}) : null
      a.tipo == 'tee' ? roupasImagem.push({imagem: await Jimp.read(a.caminhoImagem), x: 200, y: 400}) : null
      a.tipo == 'pants' ? roupasImagem.push({imagem: await Jimp.read(a.caminhoImagem), x: 200, y: 300}) : null
      a.tipo == 'body' ? roupasImagem.push({imagem: await Jimp.read(a.caminhoImagem), x: 200, y: 700}) : null
      a.tipo == 'shoes' ? roupasImagem.push({imagem: await Jimp.read(a.caminhoImagem), x: 200, y: 100}) : null
    })

    //Adicionar o Tamanho correto para cada roupa do outfit
    roupasImagem.forEach(a=> {
      a.imagem.resize(a.x, a.y)
    })

    //Adicionando as Roupas na Imagem Principal
    let altura1 = 10
    roupasImagem.forEach((a, i)=> {
      let largura = 0
      
      i > 0 ? altura1 = 10 + a.y : null
      
      imagemPrincipal.composite(a.imagem, largura, altura1)
    })

    //Adicionando Marca D´água
    const marcaDagua = await Jimp.read("/assets/Jenner1.png");
    marcaDagua.resize(200, Jimp.AUTO);
    imagemPrincipal.composite(marcaDagua, largura - marcaDagua.bitmap.width - 10, altura - marcaDagua.bitmap.height - 10,{
      mode: Jimp.BLEND_SOURCE_OVER,
      opacitySource: 0.5,
      opacityDest: 1
    });

    const base64Image = await imagemPrincipal.getBase64Async(Jimp.MIME_PNG)
    console.log(base64Image)
    return this.file.writeFile('share.png', base64Image)
  }
}
