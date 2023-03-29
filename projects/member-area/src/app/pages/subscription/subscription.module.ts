import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ShareModule } from "projects/base-area/src/app/share.module";
import { SubsPayComponent } from "./payment/subs-pay.component";
import { SubscriptionComponent } from "./subscription.component";
import { SubscriptionRouting } from "./subscription.routing";

@NgModule({
    declarations:[
        SubscriptionComponent,SubsPayComponent
    ],
    imports:[
        CommonModule,SubscriptionRouting,ShareModule
    ]
})

export class SubscriptionModule{}