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

  show : boolean = true

  constructor(private platform : Platform, private storage : StorageService, private router : Router) {}

  ngOnInit(): void {
    this.verificarLogin()
  }


  verificarLogin(){
    let logadoWeb = localStorage.getItem('logado')
    if(this.platform.is('mobile')){
      this.storage.getObject('logado').then((val)=>{
        if(typeof(val) == 'string'){
          this.show = true
          this.router.navigateByUrl('/home')
        }
        else{
          this.show = false;
          this.router.navigateByUrl('/login')
        }
      })
    }
    else{
      if(logadoWeb!){
        this.router.navigate(['/login'])
      }
      else{
        this.router.navigate(['/home'])
      }
    }
  }


}
