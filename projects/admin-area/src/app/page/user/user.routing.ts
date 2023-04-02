import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreateUserComponent } from "./user-create/create-user.component";
import { UserComponent } from "./user-list/user.component";
import { UpdateUserComponent } from "./user-update/update.components";

const userRoutes:Routes=[
    {
        path:'',
        component:UserComponent
    },
    {
        path : 'create',
        component : CreateUserComponent
    },
    {
        path : 'update/:id',
        component : UpdateUserComponent
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