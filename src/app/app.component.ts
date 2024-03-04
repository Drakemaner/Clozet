import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './services/storage/storage.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{

  constructor(private platform : Platform, private storage : StorageService, private router : Router) {}

  ngOnInit(): void {
    let logadoWeb = localStorage.getItem('logado')
    if(this.platform.is('mobile')){
      this.storage.getObject('logado').then((val)=>{
        if(typeof(val) == 'string'){
          this.router.navigate(['/home'])
        }
        else{
          this.router.navigate(['/login'])
        }
      })
    }
    else{
      if(!logadoWeb){
        this.router.navigate(['/login'])
      }
      else{
        this.router.navigate(['/home'])
      }
    }
  }


}
