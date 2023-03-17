import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ShareModule } from '../../../base-area/src/app/share.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AppRouting } from './app.routing';

import {CardModule} from 'primeng/card';
import {TabViewModule} from 'primeng/tabview';
import {DropdownModule} from 'primeng/dropdown';

// import { ProfileComponent } from './pages/profile/profile.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterception } from 'projects/base-area/src/app/interceptor/token.interceptor';
import { ResponseInterceptor } from 'projects/base-area/src/app/interceptor/response.interceptor';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from './pages/article/article.component';
import { NavbarModule } from 'projects/base-area/src/app/components/navbar/navbar.module';
// import { CourseComponent } from './pages/course/course.componenet';
import { InvoiceComponent } from './pages/invoice/invoice.component';
import { PostComponent } from './pages/post/post.component';


@NgModule({
  declarations: [
    AppComponent,DashboardComponent,ArticleComponent, InvoiceComponent, PostComponent
  ],
  imports: [
    BrowserModule, ShareModule, AppRouting,CardModule,DropdownModule,TabViewModule,CommonModule,
    HttpClientModule, NavbarModule
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
