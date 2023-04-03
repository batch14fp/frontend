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
import { MyBookmarkComponent } from "./pages/my-bookmark/my-bookmark.component";

import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MyEventsComponent } from "./pages/my-event/my-event.component";

import { ROLE } from "projects/base-area/src/app/constant/role.service";
import { AuthRoleGuard } from "projects/base-area/src/app/guard/role.guard";
import { AuthLoginGuard } from "projects/base-area/src/app/guard/auth-login.guard";
import { AuthLoadGuard } from "projects/base-area/src/app/guard/authload.guard";
import { MyTransactionComponent } from "./pages/my-transaction/my-transaction.component";

// import { TreadComponent } from "./pages/thread/tread.component";



export const memberRoutes: Routes = [
    {
        path: 'member/login',
        component: LoginComponent,
        canActivate : [ AuthLoginGuard ],
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
        canActivate:[AuthRoleGuard],
        data:[ROLE.MMBR]
    },
    {
        path:'events',
        loadChildren:()=>import("./pages/event/event.module").then(e=>e.EventModule),
        canActivate:[AuthRoleGuard],
        data:[ROLE.MMBR]
    },
    {
        path: 'profile',
        loadChildren: () => import("./pages/profile/profile.module").then(p => p.ProfileModule),

    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate:[AuthRoleGuard],
        data:[ROLE.MMBR]
    },
    {
        path : 'report-activity',
        component : ReportComponent,
        canActivate:[AuthRoleGuard],
        data:[ROLE.MMBR]
    },
    {
        path:'report-income',
        component: ReportInvoiceComponent,
        canActivate:[AuthRoleGuard],
        data:[ROLE.MMBR]
    },
    {
        path : 'my-course',
        component : MyCourseComponent,
        canActivate:[AuthRoleGuard],
        data:[ROLE.MMBR]
    },
    {
        path : 'my-event',
        component : MyEventsComponent
    },
    {
        path : 'my-bookmark',
        component : MyBookmarkComponent,
        canActivate:[AuthRoleGuard],
        data:[ROLE.MMBR]
    },
    {
        path: 'my-transaction',
        component: MyTransactionComponent,
        canActivate:[AuthRoleGuard],
        data:[ROLE.MMBR]
    },
    {
        path : 'subscription',
        // component : SubscriptionComponent
        loadChildren: () => import("./pages/subscription/subscription.module").then(s => s.SubscriptionModule),
        canActivate:[AuthRoleGuard],
        data:[ROLE.MMBR]
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

        NotFoundComponent, InvoiceComponent,PostComponent,ReportComponent, ReportInvoiceComponent, MyCourseComponent, MyBookmarkComponent, MyEventsComponent,
        MyTransactionComponent

    ],
    imports: [
        RouterModule.forRoot(memberRoutes),
        InfiniteScrollModule,
        ShareModule, CustomButtonModule, CardModule, DropdownModule, TabViewModule, NavbarModule, CourseModule, ProfileModule,CommonModule,FormsModule,
        CodeInputModule.forRoot({
            codeLength: 6,
            isCharsCode: true,
        }),
    ],
    exports: [
        RouterModule,
        DashboardComponent, LoginComponent, SignUpComponent, ForgetPassComponent, PostComponent,
        NotFoundComponent,CustomButtonModule,PostComponent,ReportComponent, ReportInvoiceComponent, MyCourseComponent, MyEventsComponent,
        MyTransactionComponent
    ]
})

export class AppRouting { }
