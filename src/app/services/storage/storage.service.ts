import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setObject = async () => {
    await Preferences.set({
      key: 'logado',
      value: 'voceEstaLogado'
    });
  }
  
  // JSON "get" example
  getObject = async (key : string) => {
    const { value } = await Preferences.get({ key: key });
    
    return value
  }

   removeObject = async (key : string) => {
    await Preferences.remove({ key: key });
  };

}
