import { Injectable } from '@angular/core';
import { Filesystem, Directory, Encoding, WriteFileResult } from '@capacitor/filesystem';

@Injectable({
  providedIn: 'root'
})
export class FileSystemService {

  constructor() { }

   writeFile = async (caminho : string, foto : string ) : Promise<WriteFileResult> => {
   
    const file = await Filesystem.writeFile({
       path: caminho,
       data: foto,
       directory: Directory.Documents
     }).catch((err : any) => {console.log("Erro WriteFile: " + err)});

    return file!;
  };
  
   readFile = async () => {
    const contents = await Filesystem.readFile({
      path: 'secrets/text.txt',
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
    });
  
    return contents!
  };
  
   deleteFile = async (nome : string) => {
    await Filesystem.deleteFile({
      path: `${nome}.png`,
      directory: Directory.Documents,
    });
  };

  redPath = async (path: string) => {
    const content = await Filesystem.getUri({
      path: path,
      directory : Directory.Documents
    })

    return content
  }

  downloadFile = async (url : string, nome : string) => {
    const content = await Filesystem.downloadFile({
      path: `/noBackground/${nome}.png`,
      directory: Directory.Documents,
      url: url,
    })

    return content;
  }
}
