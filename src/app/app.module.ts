import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import {  AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireAnalyticsModule } from '@angular/fire/compat/analytics'; // Import AngularFireAnalyticsModule

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {SharedModule} from "./shared/shared.module";
import {CommonModule} from "@angular/common";
import { CameraService } from './services/camera/camera.service';
import { getAnalytics } from 'firebase/analytics';
import { fireBaseConfig } from 'src/environments/environment.firebase';

@NgModule({
  declarations: [AppComponent],
  imports: 
  [
    CommonModule, 
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    SharedModule,
    AngularFireModule.initializeApp(fireBaseConfig),
    AngularFireAuthModule,
    AngularFireAnalyticsModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, CameraService],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {}

   analytics = getAnalytics();
}
