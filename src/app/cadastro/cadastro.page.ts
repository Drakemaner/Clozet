
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http/http.service';
import IUser from '../interfaces/IUser';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage {

  constructor(private http : HttpService) { }

  Cadastrar(){
    console.log("Comentado até os inputs serem feito")
    /*
    Comentado até os inputs serem feito
    const user = "Sexo And Rock & Roll"
    this.http.Post(user, "Usuario").subscribe(()=> {
      console.log("Usuário Cadastro com Sucesso")
    })
    */
  }
  
}
