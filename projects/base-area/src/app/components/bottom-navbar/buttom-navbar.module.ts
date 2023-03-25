import { NgModule } from "@angular/core";
import { BottomNavbar } from './bottom-navbar.component';
import { RouterModule } from "@angular/router";

@NgModule({
    declarations: [
        BottomNavbar
    ],
    exports: [
      BottomNavbar

    ],
    imports: [
      RouterModule
    ]
})

export class BottomNavbarModule{}
