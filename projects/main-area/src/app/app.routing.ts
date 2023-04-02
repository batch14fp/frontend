import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { adminRoutes } from "projects/admin-area/src/app/app.routing";
import { memberRoutes } from "projects/member-area/src/app/app.routing";
import { HomeComponent } from "./pages/home/home.component";
import { AuthLoginGuard } from "projects/base-area/src/app/guard/auth-login.guard";


const appRoutes: Routes = [
    {
       path : '',
       component : HomeComponent,
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
