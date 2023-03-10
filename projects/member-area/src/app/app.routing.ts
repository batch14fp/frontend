import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./pages/dashboard.component";
import { TreadComponent } from "./pages/tread.component";


const memberRoutes : Routes = [
    {
        path : 'dashboard',
        component : DashboardComponent,
        children : [
            {
                path : "thread",
                component : TreadComponent
            }
        ]
    },
]

@NgModule({
    imports: [
        RouterModule.forRoot(memberRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRouting{}