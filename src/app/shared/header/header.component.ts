import { Component, Input, OnInit } from '@angular/core';
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
  buttons : {image: string, function?: number}[]= []

  @Input()
  page? : string = ''

  @Input()
  roupas : IRoupas[] = []

  constructor() { }

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
