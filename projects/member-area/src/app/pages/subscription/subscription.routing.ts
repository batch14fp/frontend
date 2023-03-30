import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SubsPayComponent } from "./payment/subs-pay.component";
import { SubscriptionComponent } from "./subscription.component";

const subsRoutes : Routes = [
    {
        path : '',
        component : SubscriptionComponent
    },
    {
        path : 'payment/:id',
        component : SubsPayComponent
    }
] 

@NgModule({
    imports: [
        RouterModule.forChild(subsRoutes)
    ],
    exports:[
        RouterModule
    ]
})

export class SubscriptionRouting {}

