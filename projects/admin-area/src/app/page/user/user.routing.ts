import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserComponent } from "./user-list/user.component";

const userRoutes:Routes=[
    {
        path:'',
        component:UserComponent
    }
]

@NgModule({
    imports:[
        RouterModule.forChild(userRoutes)
    ],
    exports:[
        RouterModule
    ]
})

export class UserRouting{}