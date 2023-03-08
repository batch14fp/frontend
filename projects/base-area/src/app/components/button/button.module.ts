import { NgModule } from '@angular/core';
import { ButtonPrimary } from './button-primary.component';
import {ButtonModule} from 'primeng/button';


@NgModule({
    declarations: [
      ButtonPrimary,
    ],
    imports: [
      ButtonModule
    ],
    exports:[
      ButtonPrimary
    ]
})

export class CustomButtonModule{

}
