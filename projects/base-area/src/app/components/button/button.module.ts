import { NgModule } from '@angular/core';
import { ButtonPrimary } from './button-primary.component';
import {ButtonModule} from 'primeng/button';
import { ButtonDanger } from './button-danger.component';
import { ButtonIconPrimary } from './button-icon-primary.component';


@NgModule({
    declarations: [
      ButtonPrimary,ButtonDanger,ButtonIconPrimary
    ],
    imports: [
      ButtonModule
    ],
    exports:[
      ButtonPrimary,ButtonDanger,ButtonIconPrimary
    ]
})

export class CustomButtonModule{

}
