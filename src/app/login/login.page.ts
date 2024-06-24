import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage/storage.service';
import { Platform } from '@ionic/angular';
import { HttpService } from '../services/http/http.service';
import IUser from '../interfaces/IUser';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { LoadingService } from '../services/loading/loading.service';

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
  incorreto : boolean = false

  constructor(private formBuilder : FormBuilder, private http : HttpService, private platform : Platform, private storageService : StorageService, private router : Router, private loading : LoadingService) { }


  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      email : [this.user.email, Validators.compose([Validators.required, Validators.email])],
      senha : [this.user.senha, Validators.compose([Validators.required, Validators.minLength(5)])]
    })
  }

  logar() {

    if(this.formGroup.valid){
      this.loading.showLoadingIndicator("Carregando")
      this.http.Login(this.formGroup.value).pipe(
        catchError((e) => {
          this.loading.dismissLoadingIndicator()
          if(e.error = 'E-mail ou Senha Incorretos'){
            this.incorreto = true
          } 
          return throwError(e)
        })
      ).subscribe(a =>
        {
          this.loading.dismissLoadingIndicator()
          this.storageService.setObject('logado', a.nomeUsuario!)
          localStorage.setItem('logado',a.nomeUsuario!)
          window.location.reload()
          this.router.navigate(['/home'])
        })
    }
  }
}
