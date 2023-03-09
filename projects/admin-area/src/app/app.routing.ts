import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CategoryComponent } from "./page/category/category.component";
import { DashboardComponent } from "./page/dashboard.component";
import { IndustryComponent } from "./page/industry/industry.component";
import { PositionComponent } from "./page/position/position.component";
import { SocmedComponent } from "./page/socmed/socmed.component";
import { UserComponent } from "./page/user/user.component";

const appRoutes : Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path : 'category',
        component: CategoryComponent
    },
    {
        path : 'position',
        component: PositionComponent
    },
    {
        path : 'industry',
        component: IndustryComponent
    },
    {
        path : 'socialmedia',
        component: SocmedComponent
    },
    {
        path : 'user',
        component: UserComponent
    }
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)

    ],
    exports:[
        RouterModule
    ]
})

export class AppRouting{}