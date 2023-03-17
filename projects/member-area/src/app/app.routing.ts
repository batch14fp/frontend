import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NavbarComponent } from "projects/base-area/src/app/components/navbar/navbar.component";
import { ArticleComponent } from "./pages/article/article.component";
// import { NavbarComponent } from "projects/base-area/src/app/components/navbar/navbar.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
// import { ProfileComponent } from "./pages/profile/profile.component";
// import { TreadComponent } from "./pages/thread/tread.component";
import { PostComponent } from './pages/post/post.component';
import { InvoiceComponent } from './pages/invoice/invoice.component';
// =======
import { ProfileComponent } from "./pages/profile/profile.component";
import { TreadComponent } from "./pages/thread/tread.component";
// import { TreadComponent } from "./pages/thread/tread.component";


const memberRoutes: Routes = [
    {
        path: '',
        // component: NavbarComponent,
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent
            }
        ]
    },
    {
        path: '',
        // component: NavbarComponent,
        children: [
            {
                path: 'post',
                component: PostComponent
            }
        ]
    },
    {
        path: 'profile',
        loadChildren: () => import("./pages/profile/profile.module").then(c => c.ProfileModule),
        component: NavbarComponent

    },
    {
        path: '',
        component: NavbarComponent,
        children: [
            {
                path: 'article',
                component: ArticleComponent
            }
        ]
    },
    {
        path: '',
        component: NavbarComponent,
        children: [
            {
                path: 'invoice',
                component: InvoiceComponent
            }
        ]
    },
    {
        path: '',
        component: NavbarComponent,
        children: [
            {
                path: 'thread',
                component: TreadComponent,
            }
        ]
    },
    // {
    //   path:'course',
    //   component:CourseComponent
    // },
]

@NgModule({
    imports: [
        RouterModule.forRoot(memberRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRouting { }
