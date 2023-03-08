import { NgModule } from '@angular/core';
import { CustomButtonModule } from './components/button/button.module';
import { SkeletonModule } from 'primeng/skeleton';
import { CustomSkeletonModule } from './components/skeleton/skeleton.module';
import { CommonModule } from '@angular/common';
import { LoadingModule } from './components/loading/loading.module';



@NgModule({
  declarations: [

  ],
  imports: [
    CustomButtonModule, CustomSkeletonModule, CommonModule, LoadingModule
  ],
  exports:[
    CustomButtonModule, CustomSkeletonModule, LoadingModule
  ]
})
export class ShareModule { }
