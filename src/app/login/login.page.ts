import { Component } from '@angular/core';
import { StorageService } from '../services/storage/storage.service';
import { Platform } from '@ionic/angular';
import { HttpService } from '../services/http/http.service';
import IUser from '../interfaces/IUser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  user! : IUser

  constructor(private http : HttpService, private platform : Platform, private storageService : StorageService, private router : Router) { }


  logar() {
    this.user = {
      email: 'guilhermejenner10@gmail.com',
      senha: 'ClozetDev@'
    }
    this.http.Login(this.user).subscribe(a =>
      {
        
        console.log("Logado: " + a.nomeUsuario)
        if(this.platform.is('mobile')){
          this.storageService.setObject('logado', a.nomeUsuario!)
          this.router.navigate(['/home'])
        }
        else{
          localStorage.setItem('logado',a.nomeUsuario!)
          this.router.navigate(['/home'])
        }
      })

  }
}
