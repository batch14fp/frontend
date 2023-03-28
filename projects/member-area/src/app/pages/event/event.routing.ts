import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EventCreateComponent } from "./event-create/event-create.component";
import { EventDetailComponent } from "./event-detail/event-detail.component";
import { EventInvoiceComponent } from "./event-invoice/event-invoice.component";
import { EventListComponent } from "./event-list/event-list.component";

const eventRoutes:Routes =[
    {
        path:'',
        component: EventListComponent
    },
    {
        path:'detail/:id',
        component: EventDetailComponent
    },
    {
        path:'create',
        component: EventCreateComponent
    },
    {
        path:'detail/:id/invoice',
        component:EventInvoiceComponent
    }
]

@NgModule({
    imports:[
        RouterModule.forChild(eventRoutes)
    ],
    exports:[
        RouterModule
    ]
})

export class EventRouting{}