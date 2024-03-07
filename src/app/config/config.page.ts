import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { StorageService } from '../services/storage/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
})
export class ConfigPage {

  constructor(private platform : Platform, private storageService : StorageService, private router : Router) { }

 

  deslogar(){
    if(this.platform.is('mobile')){
      this.storageService.removeObject('logado')
      window.location.reload()
      this.router.navigate(['/login'])
    }
    else{
      localStorage.removeItem('logado')
      this.router.navigate(['/login'])
    }
  }

}
