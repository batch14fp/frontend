import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ForgetPassComponent } from "./pages/forget-pass/forget-pass.component";
import { LoginComponent } from "./pages/login/login.component";
import { SignUpComponent } from './pages/sign-up/sign-up.component';

const appRoutes: Routes = [
    {
        path : 'forgetpassword',
        component : ForgetPassComponent
    },
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'signup',
        component:SignUpComponent
    },
]

@NgModule({
    imports:[
        RouterModule.forRoot(appRoutes)
    ],
    exports:[
        RouterModule
    ]
})

export class AppRouting{

}
