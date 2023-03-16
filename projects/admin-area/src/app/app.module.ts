import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ShareModule } from 'projects/base-area/src/app/share.module';

import { AppComponent } from './app.component';
import { AppRouting } from './app.routing';
import { DashboardComponent } from './page/dashboard.component';
import { CategoryComponent } from './page/category/category.component';

import {TableModule} from 'primeng/table';
import { PositionComponent } from './page/position/position.component';
import { IndustryComponent } from './page/industry/industry.component';
import { SocmedComponent } from './page/socmed/socmed.component';
import { UserComponent } from './page/user/user.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterception } from 'projects/base-area/src/app/interceptor/token.interceptor';
import { ResponseInterceptor } from 'projects/base-area/src/app/interceptor/response.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginAdminComponent } from './page/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { MembershipComponent } from './page/membership/membership.component';
import { ArticleModule } from './page/article/article.module';



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
