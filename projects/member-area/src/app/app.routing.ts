import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ArticleComponent } from "./pages/article/article.component";
// import { NavbarComponent } from "projects/base-area/src/app/components/navbar/navbar.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
// import { ProfileComponent } from "./pages/profile/profile.component";
// import { TreadComponent } from "./pages/thread/tread.component";


const memberRoutes : Routes = [
    {
        path : 'dashboard',
        component : DashboardComponent,
    },
    {
        path : 'profile',
        loadChildren : () => import("./pages/profile/profile.module").then(c => c.ProfileModule),
        // component : NavbarComponent

    },
    {
        path : 'article',
        component : ArticleComponent
    }
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