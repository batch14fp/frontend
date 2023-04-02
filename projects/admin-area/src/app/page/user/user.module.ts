import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TableModule } from "primeng/table";
import { ShareModule } from "projects/base-area/src/app/share.module";
import { CreateUserComponent } from "./user-create/create-user.component";
import { UserComponent } from "./user-list/user.component";
import { UpdateUserComponent } from "./user-update/update.components";
import { UserRouting } from "./user.routing";

@NgModule({
    declarations:[
        UserComponent,CreateUserComponent, UpdateUserComponent
    ],
    imports:[
        UserRouting, CommonModule, ReactiveFormsModule,FormsModule, HttpClientModule, ShareModule, TableModule
    ]
})
export class UserModule{}