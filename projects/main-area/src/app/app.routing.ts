import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ForgetPassComponent } from "./pages/forget-pass/forget-pass.component";
import { LoginComponent } from "./pages/login/login.component";
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { CourseComponent } from './pages/course/course.componenent';
import { PostComponent } from './pages/post/post.component';
import { adminRoutes } from "projects/admin-area/src/app/app.routing";
import { LoginAdminComponent } from "projects/admin-area/src/app/page/login/login.component";
import { NotFoundComponent } from './pages/404/404.component';

const appRoutes: Routes = [
    {
        path : 'forgetpassword',
        component : ForgetPassComponent
    },
    {
        path:'member',
        component:LoginComponent
    },
    {
        path:'admin',
        component:LoginAdminComponent
    },
    {
        path:'signup',
        component:SignUpComponent
    },
    {
        path:'course',
        component:CourseComponent
    },
    {
        path:'post',
        component:PostComponent
    },
    {
        path:'**',
        pathMatch: 'full',
        component: NotFoundComponent
    },
    ...adminRoutes
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
