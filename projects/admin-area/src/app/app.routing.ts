import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CustomButtonModule } from "projects/base-area/src/app/components/button/button.module";
import { NavbarComponent } from "projects/base-area/src/app/components/navbar/navbar.component";
import { ShareModule } from "projects/base-area/src/app/share.module";
import { ArticleModule } from "./page/article/article.module";
import { CategoryComponent } from "./page/category/category.component";
import { DashboardComponent } from "./page/dashboard.component";
import { IndustryComponent } from "./page/industry/industry.component";
import { LoginAdminComponent } from "./page/login/login.component";
import { MembershipComponent } from "./page/membership/membership.component";
import { PositionComponent } from "./page/position/position.component";
import { SocmedComponent } from "./page/socmed/socmed.component";
import { UserComponent } from "./page/user/user.component";

export const adminRoutes: Routes = [
    {
        path: 'admin',
        component: LoginAdminComponent
    },
    {
        path: '',
        component: NavbarComponent,
        children: [
            {
                path: 'dashboard',
                component: NavbarComponent
            }
        ]
    },
    {
        path: 'category',
        component: CategoryComponent
    },
    {
        path: 'position',
        component: PositionComponent
    },
    {
        path: 'industry',
        component: IndustryComponent
    },
    {
        path: 'socialmedia',
        component: SocmedComponent
    },
    {
        path: 'user',
        component: UserComponent
    },
    {
        path: 'article',
        loadChildren: () => import("./page/article/article.module").then(a => a.ArticleModule),
        component: NavbarComponent
    }

]

@NgModule({
    declarations: [
        DashboardComponent, CategoryComponent, PositionComponent, IndustryComponent, SocmedComponent, UserComponent, LoginAdminComponent, MembershipComponent,
    ],
    imports: [
        RouterModule.forRoot(adminRoutes),
        ArticleModule, CustomButtonModule, ShareModule
    ],
    exports: [
        RouterModule,
        DashboardComponent, CategoryComponent, PositionComponent, IndustryComponent, SocmedComponent, UserComponent, LoginAdminComponent, MembershipComponent
    ]
})

export class AppRouting { }