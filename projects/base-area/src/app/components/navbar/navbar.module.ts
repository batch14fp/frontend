import { NgModule } from "@angular/core";
import { NavbarComponent } from "./navbar.component";
import {MenubarModule} from 'primeng/menubar';
import {TabMenuModule} from 'primeng/tabmenu';

@NgModule({
    declarations: [
        NavbarComponent
    ],
    exports: [
        NavbarComponent
    ],
    imports: [
        MenubarModule,TabMenuModule
    ]
})

export class NavbarModule{}