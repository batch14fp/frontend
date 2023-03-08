import { NgModule } from '@angular/core';
import { CustomButtonModule } from './components/button/button.module';
import { SkeletonModule } from 'primeng/skeleton';
import { CustomSkeletonModule } from './components/skeleton/skeleton.module';
import { CommonModule } from '@angular/common';
import { LoadingModule } from './components/loading/loading.module';
import {InputTextModule} from 'primeng/inputtext';
import {PasswordModule} from 'primeng/password';



@NgModule({
  declarations: [

  ],
  imports: [
    CustomButtonModule, CustomSkeletonModule, CommonModule, LoadingModule, InputTextModule,
     PasswordModule
  ],
  exports:[
    CustomButtonModule, CustomSkeletonModule, LoadingModule, InputTextModule,
    PasswordModule
  ]
})
export class ShareModule { }
