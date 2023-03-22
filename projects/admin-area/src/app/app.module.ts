import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent } from './app.component';
import { AppRouting } from './app.routing';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterception } from 'projects/base-area/src/app/interceptor/token.interceptor';
import { ResponseInterceptor } from 'projects/base-area/src/app/interceptor/response.interceptor';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';




@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, AppRouting, HttpClientModule,CommonModule,BrowserAnimationsModule
  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS, useClass : TokenInterception, multi: true
    },
    {
      provide : HTTP_INTERCEPTORS, useClass : ResponseInterceptor, multi : true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
