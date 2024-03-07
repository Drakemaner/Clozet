import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(private loadingController : LoadingController) { }

  async showLoadingIndicator(message : string){
    const loading =  await this.loadingController.create({
      message: message,
      spinner: 'crescent',
      translucent: true,
      mode: 'ios'
    })
    return await loading.present()
  }

  async dismissLoadingIndicator(){
    return this.loadingController.dismiss()
  }
}
