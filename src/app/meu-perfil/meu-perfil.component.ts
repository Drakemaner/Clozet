import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage/storage.service';
import { HttpService } from '../services/http/http.service';
import { catchError, throwError, timeout } from 'rxjs';
import IUser from '../interfaces/IUser';
import { AlertController } from '@ionic/angular';
import { Roupas } from '../Roupas/roupas';
import { Router } from '@angular/router';
import { Outfit } from '../shared/outfit/outfit';
import { IOutfits } from '../interfaces/IOutfits';

@Component({
  selector: 'app-meu-perfil',
  templateUrl: './meu-perfil.component.html',
  styleUrls: ['./meu-perfil.component.scss'],
})
export class MeuPerfilComponent implements OnInit {

  user : IUser = {
    email: '',
    senha: ''
  }

  roupas = Roupas
  outfit = Outfit

  constructor(private http : HttpService, private storageService : StorageService, private alert : AlertController, private router : Router) { }

  ngOnInit(): void {
    this.GetInfoUser()
  }

  GetInfoUser(){
    this.storageService.getObject('logado').then(a => {
      
      this.http.GetFor("Usuario", a!).subscribe((data : IUser)=>{
         this.user = data

         console.log(this.user)
      },
      async (e)=> {
        const alert = await this.alert.create({
          header: 'Falha ao Receber Informações do Usuário',
          message: 'Por favor verifique sua conexão com a internet ou feche e abra o aplicativo novamente',
          buttons: ['Ok']
        })
        alert.present()
      })
    })
  }

  GoTo(outfit : IOutfits){
    this.roupas.forEach((a) => {
      a.display = 'display: none'

      outfit.roupasId!.forEach(b => {
        if(a.id == b.id){
          a.display = 'display: flex'
        }
      })
    })
    this.outfit.nome = outfit.nome
    outfit.existente = true
    this.router.navigate(['/home'])
  }

}
