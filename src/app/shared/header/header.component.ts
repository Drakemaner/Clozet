import { Component, Input, OnInit } from '@angular/core';
import { CameraService } from 'src/app/services/camera/camera.service';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage/storage.service';
import { Platform } from '@ionic/angular';
import { Roupas } from 'src/app/Roupas/roupas';
import { HttpService } from 'src/app/services/http/http.service';
import IUser from 'src/app/interfaces/IUser';
import { catchError, throwError, timeout } from 'rxjs';
import IRoupas from 'src/app/interfaces/IRoupas';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit  {

  @Input()
  title : string = ''

  @Input()
  buttons : {image: string, function?: number}[]= []

  @Input()
  page? : string = ''

  @Input()
  roupas : IRoupas[] = []

  constructor(private httpService : HttpService, private platform : Platform, private cameraService : CameraService, private storageService : StorageService , private actionSheet : ActionSheetController) { }
  
  
  ngOnInit(): void {
    this.verificarLogin()
  }

  tipoRoupa = ''
  user : IUser = {
    email: '',
    senha: ''
  }


  selectFunction(value : number | undefined){
    value == undefined ?  null : ''

    if(value == 1){
      return this.restartRoupas()
    }
  }


  verifyButtons() : string{
    if(this.page == 'perfil'){
      return '/config'
    }
    else {
      return ""
    }
  }

  restartRoupas(){
    this.roupas.forEach(a => {
      if(a.display == 'display: flex'){
        a.display = 'display: none'
      }
    })
  }
  
}
