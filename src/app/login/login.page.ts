import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage/storage.service';
import { Platform } from '@ionic/angular';
import { HttpService } from '../services/http/http.service';
import IUser from '../interfaces/IUser';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit{

  user: IUser = {
    email: '',
    senha: ''
  }

  formGroup! : FormGroup

  constructor(private formBuilder : FormBuilder, private http : HttpService, private platform : Platform, private storageService : StorageService, private router : Router) { }


  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      email : [this.user.email, Validators.compose([Validators.required, Validators.email])],
      senha : [this.user.senha, Validators.compose([Validators.required, Validators.minLength(5)])]
    })
  }

  logar() {

    if(this.formGroup.valid){
      this.http.Login(this.formGroup.value).pipe(
        catchError((error) => {
          return throwError(error)
        })
      ).subscribe(a =>
        {
          console.log("Logado: " + a.nomeUsuario)
          if(this.platform.is('mobile')){
            this.storageService.setObject('logado', a.nomeUsuario!)
            window.location.reload()
            this.router.navigate(['/home'])
          }
          else{
            localStorage.setItem('logado',a.nomeUsuario!)
            this.router.navigate(['/home'])
          }
        })
    }
  }
}
