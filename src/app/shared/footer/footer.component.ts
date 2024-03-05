import { AfterContentChecked, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Platform } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage/storage.service';




@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent  {
  
  @Input()
  show : boolean = true
  
  constructor() {}

}
