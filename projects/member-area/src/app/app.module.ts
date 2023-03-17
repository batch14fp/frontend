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
import { NavbarModule } from 'projects/base-area/src/app/components/navbar/navbar.module';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { ForgetPassComponent } from './pages/forget-pass/forget-pass.component';
import { PostComponent } from './pages/post/post.component';
import { NotFoundComponent } from './pages/404/404.component';
import { ArticleComponent } from './pages/article/article.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CodeInputModule } from 'angular-code-input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CourseModule } from './pages/course/course.module';
import { ProfileModule } from './pages/profile/profile.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, AppRouting,
    HttpClientModule,FormsModule, ReactiveFormsModule, BrowserAnimationsModule
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
