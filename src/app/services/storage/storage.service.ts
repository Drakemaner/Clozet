import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setObject = async (key : string, valor : string) => {
    await Preferences.set({
      key: key,
      value: valor
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
