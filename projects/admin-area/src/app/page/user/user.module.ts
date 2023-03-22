import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TableModule } from "primeng/table";
import { ShareModule } from "projects/base-area/src/app/share.module";
import { UserComponent } from "./user-list/user.component";
import { UserRouting } from "./user.routing";

@NgModule({
    declarations:[
        UserComponent
    ],
    imports:[
        UserRouting, CommonModule, ReactiveFormsModule,FormsModule, HttpClientModule, ShareModule, TableModule
    ]
})
export class UserModule{}