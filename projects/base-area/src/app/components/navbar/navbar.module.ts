import { NgModule } from "@angular/core";
import { NavbarComponent } from "./navbar.component";
import {MenubarModule} from 'primeng/menubar';
import {AvatarModule} from 'primeng/avatar';

@NgModule({
    declarations: [
        NavbarComponent
    ],
    exports: [
        NavbarComponent
    ],
    imports: [
        MenubarModule,AvatarModule
    ]
})

export class NavbarModule{}
