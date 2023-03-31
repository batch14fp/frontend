import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CodeInputModule } from "angular-code-input";
import { CardModule } from "primeng/card";
import { DropdownModule } from "primeng/dropdown";
import { TabViewModule } from "primeng/tabview";
import { CustomButtonModule } from "projects/base-area/src/app/components/button/button.module";
import { NavbarComponent } from "projects/base-area/src/app/components/navbar/navbar.component";
import { NavbarModule } from "projects/base-area/src/app/components/navbar/navbar.module";
import { ShareModule } from "projects/base-area/src/app/share.module";
import { NotFoundComponent } from "./pages/404/404.component";
import { CourseModule } from "./pages/course/course.module";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
// import { ProfileComponent } from "./pages/profile/profile.component";
// import { TreadComponent } from "./pages/thread/tread.component";
import { MyCourseComponent } from './pages/my-course/my-course.component';
import { PostComponent } from './pages/post/post.component';
import { InvoiceComponent } from './pages/invoice/invoice.component';
// =======
import { ProfileComponent } from "./pages/profile/profile.component";
import { LoginComponent } from "./pages/login/login.component";
import { SignUpComponent } from "./pages/sign-up/sign-up.component";
import { ForgetPassComponent } from "./pages/forget-pass/forget-pass.component";
import { ProfileModule } from "./pages/profile/profile.module";
import { ThreadComponent } from "./pages/thread/thread.component";
import { ArticleComponent } from "./pages/article/article.component";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { ReportComponent } from "./pages/report-activity/report.component";
import { SubscriptionComponent } from "./pages/subscription/subscription.component";
import { ReportInvoiceComponent } from "./pages/report-income/report-income.component";
// import { TreadComponent } from "./pages/thread/tread.component";



export const memberRoutes: Routes = [
    {
        path: 'member/login',
        component: LoginComponent
    },
    {
        path: 'sign-up',
        component: SignUpComponent
    },
    {
        path: 'forget-password',
        component: ForgetPassComponent
    },
    {
        path:'course',
        loadChildren:()=>import("./pages/course/course.module").then(c=>c.CourseModule),
        component:NavbarComponent
    },
    {
        path:'events',
        loadChildren:()=>import("./pages/event/event.module").then(e=>e.EventModule),
        component:NavbarComponent
    },
    {
        path: 'profile',
        loadChildren: () => import("./pages/profile/profile.module").then(p => p.ProfileModule),
        // component: NavbarComponent

    },
    {
        path: 'dashboard',
        component: DashboardComponent,
    },
    {
        path : 'report-activity',
        component : ReportComponent
    },
    {
        path:'report-income',
        component: ReportInvoiceComponent
    },
    {
        path : 'my-course',
        component : MyCourseComponent
    },
    {
        path : 'subscription',
        // component : SubscriptionComponent
        loadChildren: () => import("./pages/subscription/subscription.module").then(s => s.SubscriptionModule)
    },
    {
        path: '',
        children: [
            {
                path: 'member/article',
                loadChildren: () => import("./pages/article/article.module").then(a => a.ArticleModule)
                // component: ArticleComponent,
            },
            {
                path: 'thread',
                component: ThreadComponent
            },
            {
                path: 'invoice',
                component: InvoiceComponent
            },
            {
                path: 'post',
                component: PostComponent
            },
        ]
    },
    {
        path: '**',
        pathMatch: 'full',
        component: NotFoundComponent
    },

]

@NgModule({
    declarations: [
        DashboardComponent, LoginComponent, SignUpComponent, ForgetPassComponent, PostComponent,
        NotFoundComponent, InvoiceComponent,PostComponent,ReportComponent, ReportInvoiceComponent, MyCourseComponent
    ],
    imports: [
        RouterModule.forRoot(memberRoutes),
        InfiniteScrollModule,
        ShareModule, CustomButtonModule, CardModule, DropdownModule, TabViewModule, NavbarModule, CourseModule, ProfileModule,
        CodeInputModule.forRoot({
            codeLength: 6,
            isCharsCode: true,
        }),
    ],
    exports: [
        RouterModule,
        DashboardComponent, LoginComponent, SignUpComponent, ForgetPassComponent, PostComponent,
        NotFoundComponent,CustomButtonModule,PostComponent,ReportComponent, ReportInvoiceComponent, MyCourseComponent
    ]
})

export class AppRouting { }
