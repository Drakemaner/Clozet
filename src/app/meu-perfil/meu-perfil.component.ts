import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage/storage.service';
import { HttpService } from '../services/http/http.service';
import { catchError, throwError, timeout } from 'rxjs';
import IUser from '../interfaces/IUser';

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

  constructor(private http : HttpService, private storageService : StorageService) { }

  ngOnInit(): void {
    this.GetInfoUser()
  }

  GetInfoUser(){
    this.storageService.getObject('logado').then(a => {
      
      this.http.GetFor("Usuario", a!).pipe(
        timeout(5000),
        catchError((error)=> {
          return throwError(error)
        })
      ).subscribe((data : IUser)=>{
         this.user = data

         console.log(this.user)
      })
    })
  }

}
