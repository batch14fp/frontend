import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DetailComponent } from "./course-detail/details.component";
import { CourseComponent } from "./course-list/course.component";

const courseRoutes:Routes = [
    {
        path:'',
        component:CourseComponent
    },
    {
        path:'detail',
        component:DetailComponent
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