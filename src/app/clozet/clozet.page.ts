import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http/http.service';
import IUser from '../interfaces/IUser';
import { Platform } from '@ionic/angular';
import { StorageService } from '../services/storage/storage.service';
import { catchError, throwError, timeout } from 'rxjs';

@Component({
  selector: 'app-clozet',
  templateUrl: './clozet.page.html',
  styleUrls: ['./clozet.page.scss'],
})
export class ClozetPage implements OnInit {

  user : IUser = {
    email: '',
    senha: ''
  }

  constructor(private http : HttpService, private storageService : StorageService) { }

  ngOnInit() {

    this.GetInfoUser()


    console.log(this.user)
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
      })
    })
  }

}
