import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ShareModule } from 'projects/base-area/src/app/share.module';

import { AppComponent } from './app.component';
import { AppRouting } from './app.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TokenInterception } from 'projects/base-area/src/app/interceptor/token.interceptor';
import { ResponseInterceptor } from 'projects/base-area/src/app/interceptor/response.interceptor';
import { MessageService, ConfirmationService } from 'primeng/api';
import {ToastModule} from 'primeng/toast';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [
    AppComponent, HomeComponent
  ],
  imports: [
    BrowserModule, AppRouting, ShareModule, FormsModule, ReactiveFormsModule, HttpClientModule,
    BrowserAnimationsModule, ToastModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: TokenInterception, multi: true
    },
    {
    provide : HTTP_INTERCEPTORS, useClass : ResponseInterceptor, multi : true
    },
    ConfirmationService, MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
