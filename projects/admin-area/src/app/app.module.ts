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

@NgModule({
  declarations: [
    AppComponent,DashboardComponent,CategoryComponent,PositionComponent,IndustryComponent,SocmedComponent,UserComponent,ArticleComponent
  ],
  imports: [
    BrowserModule,ShareModule, AppRouting,TableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
