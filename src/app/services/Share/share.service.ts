import { Injectable } from '@angular/core';
import { Share } from '@capacitor/share';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  constructor() { }

   async Share(foto : string[]){
    const share = await Share.share({
      dialogTitle: 'Compartilhe seu Outfit',
      files: foto
    });
  }
}
