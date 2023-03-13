import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ShareModule } from '../../../base-area/src/app/share.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AppRouting } from './app.routing';

import {CardModule} from 'primeng/card';
import {TabMenuModule} from 'primeng/tabmenu';
import {DropdownModule} from 'primeng/dropdown';

import { ProfileComponent } from './pages/profile/profile.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterception } from 'projects/base-area/src/app/interceptor/token.interceptor';
import { ResponseInterceptor } from 'projects/base-area/src/app/interceptor/response.interceptor';
import { CourseComponent } from './pages/course/course.componenet';
import { NavbarComponent } from '../../../base-area/src/app/components/navbar/navbar.component';
import { NavbarModule } from '../../../base-area/src/app/components/navbar/navbar.module';


@NgModule({
  declarations: [
    AppComponent,DashboardComponent,ProfileComponent, CourseComponent
  ],
  imports: [
    BrowserModule, ShareModule, AppRouting,CardModule,TabMenuModule,DropdownModule, NavbarModule
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
