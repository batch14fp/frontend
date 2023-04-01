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
import {CountdownModule } from 'ngx-countdown';
import {FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {FileUploadModule} from 'primeng/fileupload';
import {HttpClientModule} from '@angular/common/http';
import {TableModule} from 'primeng/table';
import { ReactiveFormsModule } from '@angular/forms';
import { NotFoundModule } from './components/not-found/not-found.module';
import {AccordionModule} from 'primeng/accordion';
import {EditorModule} from 'primeng/editor';
import {DialogModule} from 'primeng/dialog';
import {InputSwitchModule} from 'primeng/inputswitch';
import { TimeAgoPipe } from './utils/time-ago.pipe';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {AvatarModule} from 'primeng/avatar';
import { AnimateModule } from 'primeng/animate';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { TabMenuModule } from 'primeng/tabmenu';
import { BottomNavbarModule } from './components/bottom-navbar/buttom-navbar.module';
import { TooltipModule } from 'primeng/tooltip';
import { WordLimitPipe } from './utils/word-limit.pipe';
import { TieredMenuCustomComponent } from './components/tiered-menu/tiered-menu.component';
import { AutoFocusModule } from 'primeng/autofocus';
import { DividerModule } from 'primeng/divider';
import { TagModule } from 'primeng/tag';
import { GalleriaModule } from 'primeng/galleria';
import { ScrollTopModule } from 'primeng/scrolltop';





@NgModule({
  declarations: [
    TimeAgoPipe, WordLimitPipe
  ],
  imports: [
    CustomButtonModule, CustomSkeletonModule, CommonModule, LoadingModule, InputTextModule, PasswordModule,
     DropdownModule, ButtonModule, ProgressSpinnerModule, ImageModule, CalendarModule, CheckboxModule,
     CountdownModule, FontAwesomeModule, InputTextareaModule, FileUploadModule, HttpClientModule,TableModule,
     ReactiveFormsModule, NotFoundModule, AccordionModule, EditorModule
     ,DialogModule, InputSwitchModule, ConfirmDialogModule, AnimateModule
     ,AvatarModule, SkeletonModule, InputMaskModule, InputNumberModule, TabMenuModule, BottomNavbarModule, TooltipModule,
     TieredMenuCustomComponent,AutoFocusModule, DividerModule, GalleriaModule, ScrollTopModule

  ],
  exports:[
    CustomButtonModule, CustomSkeletonModule, LoadingModule, InputTextModule, PasswordModule,
    CommonModule, DropdownModule, ButtonModule, ProgressSpinnerModule, ImageModule, CalendarModule, CheckboxModule,
    CountdownModule, FontAwesomeModule, InputTextareaModule,FileUploadModule, HttpClientModule,TableModule,
    ReactiveFormsModule, NotFoundModule, AccordionModule, EditorModule
    ,DialogModule, InputSwitchModule, TimeAgoPipe, ConfirmDialogModule, AnimateModule
    ,AvatarModule, SkeletonModule, InputMaskModule, InputNumberModule, TabMenuModule,
    BottomNavbarModule, TooltipModule, WordLimitPipe, TieredMenuCustomComponent, AutoFocusModule,
    DividerModule, GalleriaModule, ScrollTopModule,
    TooltipModule, WordLimitPipe, TieredMenuCustomComponent, AutoFocusModule, DividerModule,TagModule
  ]

})
export class ShareModule { }
