import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DetailComponent } from "./course-detail/details.component";
import { CourseComponent } from "./course-list/course.component";
import { CreateCourseComponent } from './course-create/course-create.component';

const courseRoutes:Routes = [
    {
        path:'',
        component:CourseComponent
    },
    {
        path:'detail',
        component:DetailComponent
    },
    {
        path:'create',
        component:CreateCourseComponent
    }
]

@NgModule({
    imports:[
        RouterModule.forChild(courseRoutes)
    ],
    exports:[
        RouterModule
    ]
})

export class CourseRouting{}
