import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Roupas } from 'src/app/Roupas/roupas';
import { Outfit } from '../outfit/outfit';

@Component({
  selector: 'app-outfit-input',
  templateUrl: './outfit-input.component.html',
  styleUrls: ['./outfit-input.component.scss'],
})
export class OutfitInputComponent {

  inputName = ''
  outfit = Outfit
  roupas = Roupas

  @Input()
  label = ''

  @Input()
  placeholder = ''

  @Input()
  type : string = 'New'
  @Input()
  subject : string = 'Outfit'

  @Output()
  Show : EventEmitter<boolean> = new EventEmitter()

  @Output()
  nameValue : EventEmitter<string> = new EventEmitter()

  constructor(private router : Router) { }

  selectFunction(){
    if(this.subject == 'Outfit'){
      return this.criarOutfit()
    } 

    else {
      return this.nomeRoupa()
    }
  }

  criarOutfit(){
    if(this.type == 'New'){
      this.roupas.forEach(a=> {
        a.display == 'display: flex' ? a.display = 'display: none' : null
      })
    }

    this.outfit.nome = this.inputName
    this.outfit.existente = false
    this.Show.emit(false)
    this.router.navigate(['/home'])
  }

  nomeRoupa(){
    this.nameValue.emit(this.inputName)
  }

  closeInput(){
    this.Show.emit(false)
  }
}
