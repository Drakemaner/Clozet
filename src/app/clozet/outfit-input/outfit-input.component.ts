import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Roupas } from 'src/app/Roupas/roupas';

@Component({
  selector: 'app-outfit-input',
  templateUrl: './outfit-input.component.html',
  styleUrls: ['./outfit-input.component.scss'],
})
export class OutfitInputComponent {

  inputName = ''
  roupas = Roupas
  @Output()
  Show : EventEmitter<boolean> = new EventEmitter()

  constructor(private router : Router) { }

  criarOutfit(){
    this.roupas.forEach(a=> {
      a.display == 'display: flex' ? a.display = 'display: none' : null
      a.outfit = this.inputName
    })
    this.Show.emit(false)
    this.router.navigate(['/home'])
  }

  closeInput(){
    this.Show.emit(false)
  }
}
