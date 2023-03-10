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
import { ArticleComponent } from './page/article/article.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterception } from 'projects/base-area/src/app/interceptor/token.interceptor';
import { ResponseInterceptor } from 'projects/base-area/src/app/interceptor/response.interceptor';

@NgModule({
  declarations: [
    AppComponent,DashboardComponent,CategoryComponent,PositionComponent,IndustryComponent,SocmedComponent,UserComponent,ArticleComponent
  ],
  imports: [
    BrowserModule,ShareModule, AppRouting,TableModule
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
