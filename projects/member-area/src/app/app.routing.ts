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
import { ArticleComponent } from "./pages/article/article.component";
import { CourseModule } from "./pages/course/course.module";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { ForgetPassComponent } from "./pages/forget-pass/forget-pass.component";
import { LoginComponent } from "./pages/login/login.component";
import { PostComponent } from "./pages/post/post.component";
import { ProfileModule } from "./pages/profile/profile.module";
import { SignUpComponent } from "./pages/sign-up/sign-up.component";
import { ThreadComponent } from "./pages/thread/thread.component";



export const memberRoutes: Routes = [
    {
        path: 'member',
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
        path: '**',
        pathMatch: 'full',
        component: NotFoundComponent
    },
    {
        path: '',
        component: NavbarComponent,
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent,
            },
            {
                path: 'article',
                component: ArticleComponent,
            },
            {
                path: 'thread',
                component: ThreadComponent
            }
        ]
    },
    {
        path: 'course',
        loadChildren: () => import("./pages/course/course.module").then(c => c.CourseModule),
        component: NavbarComponent
    },
    {
        path: 'profile',
        loadChildren: () => import("./pages/profile/profile.module").then(p => p.ProfileModule),
        component: NavbarComponent

    },
]

@NgModule({
    declarations: [
        DashboardComponent, LoginComponent, SignUpComponent, ForgetPassComponent, PostComponent, ArticleComponent,
        NotFoundComponent
    ],
    imports: [
        RouterModule.forRoot(memberRoutes),
        ShareModule, CustomButtonModule, CardModule, DropdownModule, TabViewModule, NavbarModule, CourseModule, ProfileModule,
        CodeInputModule.forRoot({
            codeLength: 6,
            isCharsCode: true,
        }),
    ],
    exports: [
        RouterModule,
        DashboardComponent, LoginComponent, SignUpComponent, ForgetPassComponent, PostComponent, ArticleComponent,
        NotFoundComponent
    ]
})

export class AppRouting { }
