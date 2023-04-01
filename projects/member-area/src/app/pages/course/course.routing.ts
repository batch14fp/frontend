import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DetailComponent } from "./course-detail/details.component";
import { CourseComponent } from "./course-list/course.component";
import { CreateCourseComponent } from './course-create/course-create.component';
import { CourseInvoiceComponent } from "./course-invoice/course-invoice.component";
import { CoursePaymentComponent } from "./course-payment/course-payment.component";

const courseRoutes:Routes = [
    {
        path:'',
        component:CourseComponent
    },
    {
        path:'create',
        component:CreateCourseComponent
    },
    {
        path:'detail/:id',
        component:DetailComponent
    },
    {
        path:'detail/:id/invoice',
        component:CourseInvoiceComponent
    },
    {
        path:'detail/:id/invoice/:id/payment',
        component:CoursePaymentComponent
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
