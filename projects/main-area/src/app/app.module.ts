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
import { ConfirmationService } from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, AppRouting, ShareModule, FormsModule, ReactiveFormsModule, HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [  
    {
    provide : HTTP_INTERCEPTORS, useClass : TokenInterception, multi: true
    },
    {
    provide : HTTP_INTERCEPTORS, useClass : ResponseInterceptor, multi : true
    },
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
