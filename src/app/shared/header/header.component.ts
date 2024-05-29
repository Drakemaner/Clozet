import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import IRoupas from 'src/app/interfaces/IRoupas';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  @Input()
  title : string = ''

  @Input()
  buttons : {image?: string, function?: number}[]= []

  @Input()
  page? : string = ''

  @Input()
  roupas? : IRoupas[] = []

  @Output()
  showInput : EventEmitter<boolean> = new EventEmitter()

  @Output()
  saveOutfit : EventEmitter<boolean> = new EventEmitter()

  @Output()
  takePhoto : EventEmitter<boolean> = new EventEmitter()

  @Output()
  shareOutfit : EventEmitter<boolean> = new EventEmitter()

  constructor() { }

  selectFunction(value : number | undefined){
    value == undefined ?  null : ''

    if(value == 1){
      return this.restartRoupas()
    }
    else if(value == 2){
      this.showInput.emit(true)
    }
    else if(value == 3){
      if(this.title == 'Outfit'){
        this.saveOutfit.emit(false)
      }
      else{
        this.saveOutfit.emit(true)
      }
    }

    else if(value == 4){
      this.takePhoto.emit(true)
    }
    else if(value == 5){
      this.shareOutfit.emit(true)
    }
  }


  verifyButtons() : string{
    if(this.page == 'perfil'){
      return '/config'
    }
    else if(this.page == 'Clozet'){
      return '/clozet'
    }

    return ''
  }

  restartRoupas(){
    this.roupas?.forEach(a => {
      if(a.display == 'display: flex'){
        a.display = 'display: none'
      }
    })
  }
  
}
