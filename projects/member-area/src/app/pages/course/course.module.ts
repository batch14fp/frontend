import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ShareModule } from "projects/base-area/src/app/share.module";
import { DetailComponent } from "./course-detail/details.component";
import { CourseComponent } from "./course-list/course.component";
import { CourseRouting } from "./course.routing";

@NgModule({
    declarations:[
        CourseComponent,
        DetailComponent
    ],
    imports:[
        CourseRouting, ShareModule, ReactiveFormsModule, HttpClientModule, CommonModule,FormsModule
    ]
})

export class CourseModule{}