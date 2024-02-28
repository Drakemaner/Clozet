import { Component } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  roupas = [
    {
      nome: 'camisa Branca',
      tipo:'tee',
      imagem:'/assets/tee.png',
      display: 'display: flex'
    },
    {
      nome: 'Jenner',
      tipo: 'tee',
      imagem: '/assets/Jenner1.jpg',
      display: 'display: none'
    },
    {
      nome: 'calça soho_club',
      tipo:'pants',
      imagem:'/assets/calca.png',
      display: 'display: flex'
    },
    {
      nome: 'tenis allStar',
      tipo:'shoes',
      imagem:'/assets/tenis.png',
      display: 'display: flex'
    }
  ]

  constructor() {}

  mudarRoupa(tipo : string){
    if(tipo.includes('tee')){
      let tees = this.roupas.filter(roupa => roupa.tipo == 'tee')
      if(tipo.includes('right')){
        for(let i = 0; i < tees.length; i++){
          console.log(tees.length)
          if(tees[i].display == 'display: flex'){
            if(i + 1 < tees.length){
              console.log('cheguei')
              tees[i].display = 'display: none'
              tees[i + 1].display = 'display: flex'
              return
            }
            else{
              console.log('cheguei outro')
              tees[i].display = 'display: none'
              tees[0].display = 'display: flex'
              return 
            }
          }
        }
      }
      else if(tipo.includes('left')){
        for(let i = 0; i < tees.length; i++){
          if(tees[i].display == 'display: flex'){
            if(i != 0){
              tees[i].display = 'display: none'
              tees[i - 1].display = 'display: flex'
              return
            }
            else{
              tees[tees.length - 1].display = 'display: flex'
              tees[0].display = 'display: none'
              return
            }
          }
        }
      }
    }
    else if(tipo.includes('pants')){
      let tees = this.roupas.filter(roupa => roupa.tipo == 'pants')
      if(tipo.includes('right')){
        for(let i = 0; i < tees.length; i++){
          if(tees[i].display == 'display: flex'){
            if(i + 1 < tees.length){
              tees[i].display = 'display: none'
              tees[i + 1].display = 'display: flex'
              return
            }
            else{
              tees[i].display = 'display: none'
              tees[0].display = 'display: flex'
              return
            }
          }
        }
      }
      else if(tipo.includes('left')){
        for(let i = 0; i < tees.length; i++){
          if(tees[i].display == 'display: flex'){
            if(i != 0){
              tees[i].display = 'display: none'
              tees[i - 1].display = 'display: flex'
              return
            }
            else{
              tees[tees.length - 1].display = 'display: flex'
              tees[0].display = 'display: none'
              return
            }
          }
        }
      }
    }
    else {
      let tees = this.roupas.filter(roupa => roupa.tipo == 'shoes')
      if(tipo.includes('right')){
        for(let i = 0; i < tees.length; i++){
          if(tees[i].display == 'display: flex'){
            if(i + 1 < tees.length){
              tees[i].display = 'display: none'
              tees[i + 1].display = 'display: flex'
              return
            }
            else{
              tees[i].display = 'display: none'
              tees[0].display = 'display: flex'
              return
            }
          }
        }
      }
      else if(tipo.includes('left')){
        for(let i = 0; i < tees.length; i++){
          if(tees[i].display == 'display: flex'){
            if(i != 0){
              tees[i].display = 'display: none'
              tees[i - 1].display = 'display: flex'
              return
            }
            else{
              tees[tees.length - 1].display = 'display: flex'
              tees[0].display = 'display: none'
              return
            }
          }
        }
      }
    }
  }

}
