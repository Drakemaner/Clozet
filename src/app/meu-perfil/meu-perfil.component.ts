import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage/storage.service';
import { Platform } from '@ionic/angular';
import { HttpService } from '../services/http/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-meu-perfil',
  templateUrl: './meu-perfil.component.html',
  styleUrls: ['./meu-perfil.component.scss'],
})
export class MeuPerfilComponent {

  constructor(private router : Router ,private http : HttpService, private platform : Platform, private storageService : StorageService) { }

  deslogar(){
    if(this.platform.is('mobile')){
      this.storageService.removeObject('logado')
      this.router.navigate(['/login'])
    }
    else{
      localStorage.removeItem('logado')
      this.router.navigate(['/login'])
    }
  }

}
