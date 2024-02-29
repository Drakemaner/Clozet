import { Component } from '@angular/core';
import { CameraService } from '../services/camera/camera.service';
import { CameraPluginPermissions } from '@capacitor/camera';
import { ActionSheetController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  tipoRoupa = ''

  takePhoto = false

  roupas = [
    {
      nome: 'camisa Branca',
      tipo:'tee',
      imagem:'/assets/tee.png',
      display: 'display: flex'
    },
    {
      nome: 'Jenner',
      tipo: 'tee',
      imagem: '/assets/Jenner1.jpg',
      display: 'display: none'
    },
    {
      nome: 'calça soho_club',
      tipo:'pants',
      imagem:'/assets/calca.png',
      display: 'display: flex'
    },
    {
      nome: 'tenis allStar',
      tipo:'shoes',
      imagem:'/assets/tenis.png',
      display: 'display: flex'
    }
  ]

  constructor(public cameraService : CameraService, private actionSheet : ActionSheetController) {}

  showActions = async () => {
    const result = await this.actionSheet.create({
      header: 'Tipo da Roupa',
      buttons: [
        {
          text: 'Tee',
          handler: () => this.tirarFoto('tee')
            
          
        },
        {
          text: 'Calça',
          handler: () => this.tirarFoto('pants')
            
        },
        {
          text: 'Tênis',
          handler: () => this.tirarFoto('shoes')
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ],

    
    })
    
    await result.present();

    console.log('Action Sheet result:', result);
  }

  tirarFoto(tipo : string){
    this.tipoRoupa = tipo
    
    this.cameraService.takePicture(this.roupas, this.tipoRoupa)
  }

  mudarRoupa(tipo : string){
    console.log(tipo)
    if(tipo == 'tee'){
      console.log("Oiee")
      let tees = this.roupas.filter(roupa => roupa.tipo == 'tee')
      for(let i = 0; i < tees.length; i++){
        if(tees[i].display == 'display: flex'){
          if(i + 1 < tees.length){
            tees[i].display = 'display: none'
            tees[i + 1].display = 'display: flex'
            return
          }
          else{
            tees[i].display = 'display: none'
            tees[0].display = 'display: flex'
            return 
          }
        }
      }
    }
    else if(tipo == 'pants'){
      let tees = this.roupas.filter(roupa => roupa.tipo == 'pants')
      for(let i = 0; i < tees.length; i++){
        if(tees[i].display == 'display: flex'){
          if(i + 1 < tees.length){
            tees[i].display = 'display: none'
            tees[i + 1].display = 'display: flex'
            return
          }
          else{
            tees[i].display = 'display: none'
            tees[0].display = 'display: flex'
            return
          }
        }
      }
    }
    else {
      let tees = this.roupas.filter(roupa => roupa.tipo == 'shoes')
      for(let i = 0; i < tees.length; i++){
        if(tees[i].display == 'display: flex'){
          if(i + 1 < tees.length){
            tees[i].display = 'display: none'
            tees[i + 1].display = 'display: flex'
            return
          }
          else{
            tees[i].display = 'display: none'
            tees[0].display = 'display: flex'
            return
          }
        }
      }
    }
  }

}
