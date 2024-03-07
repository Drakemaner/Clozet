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

  constructor(private storageService : StorageService, private router : Router) { }

 

  deslogar(){
    this.storageService.removeObject('logado')
    window.location.reload()
    this.router.navigate(['/login'])
  }

}
