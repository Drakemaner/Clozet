import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { StorageService } from '../services/storage/storage.service';
import { Router } from '@angular/router';
import { CameraService } from '../services/camera/camera.service';
import { GalleryPhoto } from '@capacitor/camera';
import { HttpService } from '../services/http/http.service';
import IUser from '../interfaces/IUser';

@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
})
export class ConfigPage implements OnInit{

  user : IUser = {
    email: '',
    senha: ''
  }

  constructor(private httpService : HttpService, private storage : StorageService, private cameraSevice : CameraService, private storageService : StorageService, private router : Router) { }

  ngOnInit(): void { 
    this.storage.getObject('logado').then(async (a)=> {
      //this.loadingService.showLoadingIndicator('Pegando Roupas do Banco')
      this.httpService.GetFor("Usuario", a!).subscribe(async (user : IUser) => {
        this.user = user
        
      })
    })
  }

  deslogar(){
    this.storageService.removeObject('logado')
    window.location.reload()
    this.router.navigate(['/login'])
  }

  escolherFotoPerfil(){
    this.cameraSevice.pegarFoto(1).then((a : GalleryPhoto[]) =>{
      this.user.fotoPerfil = a[0].webPath

      // Comentado até o servidor voltar this.httpService.Post(this.user, "Usuario").subscribe(()=> console.log("Foto de Perfil Cadastrado com Sucesso"))
    })
  }

}
