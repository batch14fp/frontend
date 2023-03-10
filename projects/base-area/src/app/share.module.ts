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
import {ImageModule} from 'primeng/image';
import {CalendarModule} from 'primeng/calendar';
import {CheckboxModule} from 'primeng/checkbox';
import { CountdownModule } from 'ngx-countdown';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {FileUploadModule} from 'primeng/fileupload';
import {HttpClientModule} from '@angular/common/http';
import {TableModule} from 'primeng/table';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [

  ],
  imports: [
    CustomButtonModule, CustomSkeletonModule, CommonModule, LoadingModule, InputTextModule, PasswordModule,
     DropdownModule, ButtonModule, ProgressSpinnerModule, ImageModule, CalendarModule, CheckboxModule, 
     CountdownModule, FontAwesomeModule, InputTextareaModule, FileUploadModule, HttpClientModule,TableModule,
     ReactiveFormsModule
  ],
  exports:[
    CustomButtonModule, CustomSkeletonModule, LoadingModule, InputTextModule, PasswordModule,
    CommonModule, DropdownModule, ButtonModule, ProgressSpinnerModule, ImageModule, CalendarModule, CheckboxModule,
    CountdownModule, FontAwesomeModule, InputTextareaModule,FileUploadModule, HttpClientModule,TableModule,
    ReactiveFormsModule
  ]

})
export class ShareModule { }
