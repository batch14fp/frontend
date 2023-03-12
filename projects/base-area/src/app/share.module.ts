import { NgModule } from '@angular/core';
import { CustomButtonModule } from './components/button/button.module';
import { SkeletonModule } from 'primeng/skeleton';
import { CustomSkeletonModule } from './components/skeleton/skeleton.module';
import { CommonModule } from '@angular/common';
import { LoadingModule } from './components/loading/loading.module';
import {InputTextModule} from 'primeng/inputtext';
import {PasswordModule} from 'primeng/password';
import { NavbarModule } from './components/navbar/navbar.module';
import {DropdownModule} from 'primeng/dropdown';
import {ButtonModule} from 'primeng/button';
import {ProgressSpinnerModule} from 'primeng/progressspinner';




@NgModule({
  declarations: [

  ],
  imports: [
    CustomButtonModule, CustomSkeletonModule, CommonModule, LoadingModule, InputTextModule, PasswordModule,
    NavbarModule, DropdownModule, ButtonModule, ProgressSpinnerModule
  ],
  exports:[
    CustomButtonModule, CustomSkeletonModule, LoadingModule, InputTextModule, PasswordModule,NavbarModule,
    CommonModule, LoadingModule, InputTextModule,
     PasswordModule, DropdownModule, ButtonModule, ProgressSpinnerModule
  ]

})
export class ShareModule { }
