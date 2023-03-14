import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ShareModule } from 'projects/base-area/src/app/share.module';

import { AppComponent } from './app.component';
import { AppRouting } from './app.routing';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { CodeInputModule } from 'angular-code-input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ForgetPassComponent } from './pages/forget-pass/forget-pass.component';
import { CourseComponent } from './pages/course/course.componenent';
import { PostComponent } from './pages/post/post.component';
import { ArticleComponent } from './pages/article/article.component';

@NgModule({
  declarations: [
    AppComponent, LoginComponent, SignUpComponent,ForgetPassComponent, CourseComponent, PostComponent,
    ArticleComponent
  ],
  imports: [
    BrowserModule, AppRouting, ShareModule, FormsModule, ReactiveFormsModule, HttpClientModule,
    BrowserAnimationsModule,
    CodeInputModule.forRoot({
      codeLength: 6,
      isCharsCode: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
