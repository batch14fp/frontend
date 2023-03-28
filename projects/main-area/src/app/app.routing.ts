import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { adminRoutes } from "projects/admin-area/src/app/app.routing";
import { memberRoutes } from "projects/member-area/src/app/app.routing";
import { HomeComponent } from "./pages/home/home.component";


const appRoutes: Routes = [
    // {
    //     path : 'forgetpassword',
    //     component : ForgetPassComponent
    // },
    // {
    //     path:'article',
    //     component:ArticleComponent
    // },
    // {
    //     path:'member',
    //     component:LoginComponent
    // },
    // {
    //     path:'admin',
    //     component:LoginAdminComponent
    // },
    // {
    //     path:'signup',
    //     component:SignUpComponent
    // },
    // {
    //     path:'course',
    //     component:CourseComponent
    // },
    // {
    //     path:'course/details',
    //     component:DetailComponent
    // },
    // {
    //     path:'post',
    //     component:PostComponent
    // },
    // {
    //     path:'**',
    //     pathMatch: 'full',
    //     component: NotFoundComponent
    // },
    {
       path : '',
       component : HomeComponent
   },
    ...adminRoutes,
    ...memberRoutes,

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
