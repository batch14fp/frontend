import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ForgetPassComponent } from "./pages/forget-pass/forget-pass.component";
import { LoginComponent } from "./pages/login/login.component";
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { CourseComponent } from './pages/course/course.componenent';

const appRoutes: Routes = [
    {
        path : 'forgetpassword',
        component : ForgetPassComponent
    },
    {
        path:'',
        component:LoginComponent
    },
    {
        path:'signup',
        component:SignUpComponent
    },
    {
        path:'course',
        component:CourseComponent
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
