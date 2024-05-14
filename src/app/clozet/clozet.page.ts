import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http/http.service';
import IUser from '../interfaces/IUser';
import { AlertController, Platform } from '@ionic/angular';
import { StorageService } from '../services/storage/storage.service';
import { catchError, filter, throwError, timeout } from 'rxjs';
import { LoadingService } from '../services/loading/loading.service';
import { FileSystemService } from '../services/fileSystem/file-system.service';
import { Roupas } from '../Roupas/roupas';

@Component({
  selector: 'app-clozet',
  templateUrl: './clozet.page.html',
  styleUrls: ['./clozet.page.scss'],
})
export class ClozetPage {

  user : IUser = {
    email: '',
    senha: ''
  }

  roupas = Roupas
  
  showInputOutfit = false

  select : any[] = []

  constructor(private fileSystemService : FileSystemService ,private loadingService : LoadingService, private http : HttpService, private alert : AlertController) { }

  deletarRoupa(roupaID : number){
    this.loadingService.showLoadingIndicator('Deletando Roupa Selecionada')
    this.http.Delete("Roupa", this.user.nomeUsuario!, roupaID).subscribe(()=> {
      this.fileSystemService.deleteFile(this.user.roupas?.filter(a=> a.id == roupaID)[0].nome!)
      this.user.roupas = this.user.roupas?.filter(a => a.id != roupaID)
      this.loadingService.dismissLoadingIndicator()
    }, async (e)=> {
      this.loadingService.dismissLoadingIndicator()
      const alert = await this.alert.create({
        header: 'Falha ao Deletar a Roupa',
        message: 'Por favor verifique sua conexão com a internet ou feche e abra o aplicativo novamente',
        buttons: ['Ok']
      })
      alert.present()
    })
  }

  ShowInputOutfit(event : any){
    this.showInputOutfit = event
  }

  closeInputOutfit(event : any){
    this.showInputOutfit = event
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
      this.http.Delete("Roupa", this.user.nomeUsuario!, a).subscribe(()=> {
        this.fileSystemService.deleteFile(this.user.roupas?.filter(b=> b.id == a)[0].nome!)
        this.user.roupas = this.user.roupas?.filter(b => b.id != a)
        this.loadingService.dismissLoadingIndicator()
      }, async (e)=> {
        this.loadingService.dismissLoadingIndicator()
        const alert = await this.alert.create({
          header: 'Falha ao Deletar as Roupas',
          message: 'Por favor verifique sua conexão com a internet ou feche e abra o aplicativo novamente',
          buttons: ['Ok']
        })
        alert.present()
      })
    })
  }

}
