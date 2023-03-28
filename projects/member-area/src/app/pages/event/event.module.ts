import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ShareModule } from "projects/base-area/src/app/share.module";
import { EventCreateComponent } from "./event-create/event-create.component";
import { EventDetailComponent } from "./event-detail/event-detail.component";
import { EventInvoiceComponent } from "./event-invoice/event-invoice.component";
import { EventListComponent } from "./event-list/event-list.component";
import { EventRouting } from "./event.routing";

@NgModule({
    declarations:[
        EventCreateComponent,
        EventDetailComponent,
        EventListComponent,
        EventInvoiceComponent
    ],
    imports:[
        EventRouting,ShareModule, ReactiveFormsModule,HttpClientModule, CommonModule,FormsModule
    ]
})

export class EventModule{}