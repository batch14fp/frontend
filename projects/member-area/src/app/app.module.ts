import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ShareModule } from '../../../base-area/src/app/share.module';
import { DashboardComponent } from './pages/dashboard.component';
import { AppRouting } from './app.routing';

import {CardModule} from 'primeng/card';
import {TabMenuModule} from 'primeng/tabmenu';
import { TreadComponent } from './pages/tread.component';


@NgModule({
  declarations: [
    AppComponent,DashboardComponent,TreadComponent
  ],
  imports: [
    BrowserModule, ShareModule, AppRouting,CardModule,TabMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
