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
  type : string = 'New'

  @Output()
  Show : EventEmitter<boolean> = new EventEmitter()

  constructor(private router : Router) { }

  criarOutfit(){
    if(this.type == 'New'){
      this.roupas.forEach(a=> {
        a.display == 'display: flex' ? a.display = 'display: none' : null
      })
    }
    
    this.outfit.nome = this.inputName
    this.Show.emit(false)
    this.router.navigate(['/home'])
  }

  closeInput(){
    this.Show.emit(false)
  }
}
