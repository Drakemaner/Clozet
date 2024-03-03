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
import { environment } from 'src/environments/environment';
import { getAnalytics } from 'firebase/analytics';

@NgModule({
  declarations: [AppComponent],
  imports: 
  [
    CommonModule, 
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    SharedModule,
    AngularFireModule.initializeApp(environment.fireBaseConfig),
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
