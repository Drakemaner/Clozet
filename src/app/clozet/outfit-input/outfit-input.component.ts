import { Component, OnInit } from '@angular/core';
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

  constructor(private router : Router) { }

  criarOutfit(){
    this.roupas.forEach(a=> {
      a.outfit = this.inputName
    })

    this.router.navigate(['/home'])
  }
}
