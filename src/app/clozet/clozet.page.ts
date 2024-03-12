import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http/http.service';
import IUser from '../interfaces/IUser';
import { Platform } from '@ionic/angular';
import { StorageService } from '../services/storage/storage.service';
import { catchError, filter, throwError, timeout } from 'rxjs';
import { LoadingService } from '../services/loading/loading.service';
import { FileSystemService } from '../services/fileSystem/file-system.service';

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
  
  select : any[] = []

  constructor(private fileSystemService : FileSystemService ,private loadingService : LoadingService, private http : HttpService, private storageService : StorageService) { }

  ngOnInit() {
    this.GetInfoUser()
  }

  deletarRoupa(roupaID : number){
    this.loadingService.showLoadingIndicator('Deletando Roupa Selecionada')
    this.http.Delete("Roupa", this.user.nomeUsuario!, roupaID).pipe(
      timeout(15000),
      catchError((error)=> {
        return throwError(error)
      })
    ).subscribe(()=> {
      this.fileSystemService.deleteFile(this.user.roupas?.filter(a=> a.id == roupaID)[0].nome!)
      this.user.roupas = this.user.roupas?.filter(a => a.id != roupaID)
      this.loadingService.dismissLoadingIndicator()
    })
  }

  refreshPage(event : any){
    this.http.GetFor("Usuario", this.user.nomeUsuario!).pipe(
      timeout(15000),
      catchError((error)=> {
        return throwError(error)
      })
    ).subscribe((data : IUser)=>{
       this.user = data

       setInterval(()=> {
        event.target.complete()
       },1500)
    })
  }

   GetInfoUser(){
    this.storageService.getObject('logado').then(a => {
      
      this.http.GetFor("Usuario", a!).pipe(
        timeout(15000),
        catchError((error)=> {
          return throwError(error)
        })
      ).subscribe((data : IUser)=>{
         this.user = data
      })
    })
  }

  SelectRoupas(event : any){
    if(event.target.checked == true){
      this.select.push(event.target.value)
    }
    else {
      this.select =  this.select.filter(a => a!= event.target.value)
    }
  }

  deletarRoupasSelecionadas(){
    this.loadingService.showLoadingIndicator('Deletando Roupas Selecionadas')
    this.select.forEach((a)=> {
      this.http.Delete("Roupa", this.user.nomeUsuario!, a).pipe(
        timeout(15000),
        catchError((error)=> {
          return throwError(error)
        })
      ).subscribe(()=> {
        this.fileSystemService.deleteFile(this.user.roupas?.filter(b=> b.id == a)[0].nome!)
        this.user.roupas = this.user.roupas?.filter(b => b.id != a)
        this.loadingService.dismissLoadingIndicator()
      })
    })
  }

}
