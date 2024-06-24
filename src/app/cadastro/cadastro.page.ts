
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http/http.service';
import IUser from '../interfaces/IUser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage/storage.service';
import { LoadingService } from '../services/loading/loading.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit{


  formGroup! : FormGroup

  constructor(private storage : StorageService , private formBuilder : FormBuilder, private http : HttpService, private router : Router, private loading : LoadingService) { }


  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      nomeCompleto : ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      nomeUsuario : ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(16)])],
      email : ['', Validators.compose([Validators.required, Validators.email])],
      senha : ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(16)])]
    })
  }

  Cadastrar(){
    if(this.formGroup.valid){
      this.loading.showLoadingIndicator("Carregando")
      this.http.Post(this.formGroup.value, "Usuario").pipe(
        catchError((error)=> {
          this.loading.dismissLoadingIndicator()
          return throwError(error)
        })
      ).subscribe(()=> {
        this.loading.dismissLoadingIndicator()
        console.log("Usuário Cadastro com Sucesso")
        this.storage.setObject('logado', this.formGroup.value['nomeUsuario'])
        window.location.reload()
        this.router.navigate(['/meuPerfil'])
      })
    }
  }
  
}
