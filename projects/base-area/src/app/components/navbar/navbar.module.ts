import { NgModule } from "@angular/core";
import { NavbarComponent } from "./navbar.component";
import {MenubarModule} from 'primeng/menubar';
import {AvatarModule} from 'primeng/avatar';
import { CommonModule } from "@angular/common";
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {AvatarGroupModule} from 'primeng/avatargroup';
import {DividerModule} from 'primeng/divider';

@NgModule({
    declarations: [
        NavbarComponent
    ],
    exports: [
        NavbarComponent
    ],
    imports: [
        MenubarModule,AvatarModule, CommonModule,OverlayPanelModule, DividerModule
    ]
})

export class NavbarModule{}
