import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage/storage.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-meu-perfil',
  templateUrl: './meu-perfil.component.html',
  styleUrls: ['./meu-perfil.component.scss'],
})
export class MeuPerfilComponent {

  constructor(private platform : Platform, private storageService : StorageService) { }

  deslogar(){
    if(this.platform.is('mobile')){
      this.storageService.removeObject('logado')
    }
    else{
      localStorage.removeItem('logado')
    }
  }

}
