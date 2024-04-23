import { AfterContentChecked, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Platform } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage/storage.service';




@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent  {
  
  @Output()
  closeModal : EventEmitter<boolean | undefined>= new EventEmitter()
  
  constructor() {}

  modalClose(){
    this.closeModal.emit(true)
  }

}
