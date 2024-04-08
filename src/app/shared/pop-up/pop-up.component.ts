import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import IRoupas from 'src/app/interfaces/IRoupas';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss'],
})
export class PopUpComponent   {

  @Input()
  roupas : IRoupas[] = []

  @Input()
  popUp : any = {}

  @Output() Show : EventEmitter<{show: boolean, openModal: boolean}> = new EventEmitter();

  constructor() { }

  selectCloth(roupaId : number){
    let open = false
    const roupaSelecionada = this.verificarRoupaSelecionada(roupaId)
    this.roupas.forEach(a=> {
      if(roupaSelecionada.length == 0){
        if(a.display == 'display: flex' && this.popUp.roupaType == a.tipo){
          a.display = 'display: none'
        }
        if(a.id == roupaId){
          a.display = 'display: flex';
        }
      }
      else {
        if(a.id == roupaId){
          a.display = 'display: none';
          open = true
        }
      }
    })

    this.Show.emit({show: false, openModal: open})
  }

  translate(value : string){
    return value.charAt(0).toUpperCase() + value.slice(1)
  }

  private verificarRoupaSelecionada(roupaId : number){
    let roupaSelecionada = this.roupas.filter(a=> a.id == roupaId && a.display == 'display: flex')

    return roupaSelecionada
  }
}
