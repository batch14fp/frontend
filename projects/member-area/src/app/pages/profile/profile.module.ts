import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ShareModule } from "projects/base-area/src/app/share.module";
import { ChangePasswordComponent } from "./password.component";
import { ProfileComponent } from "./profile.component";
import { ProfileRouting } from "./profile.routing";

@NgModule({
    declarations:[
        ProfileComponent,ChangePasswordComponent
    ],
    imports:[
        CommonModule,ProfileRouting,ShareModule
    ]
})


export class ProfileModule{}