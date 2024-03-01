import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage/storage.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {


  constructor(private platform : Platform, private storageService : StorageService) { }


  logar() {
    if(this.platform.is('mobile')){
      this.storageService.setObject()
    }
    else{
      localStorage.setItem('logado','voceEstaLogado')
    }
  }
}
