import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ChangePasswordComponent } from "./password.component";
import { ProfileComponent } from "./profile.component";

const profileRoutes : Routes = [
    {
        path : '',
        component : ProfileComponent
    },
    {
        path : 'password',
        component : ChangePasswordComponent
    }
]

@NgModule({
    imports:[
        RouterModule.forChild(profileRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class ProfileRouting{}