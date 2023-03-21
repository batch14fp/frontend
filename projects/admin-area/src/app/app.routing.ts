import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CustomButtonModule } from "projects/base-area/src/app/components/button/button.module";
import { NavbarComponent } from "projects/base-area/src/app/components/navbar/navbar.component";
import { ShareModule } from "projects/base-area/src/app/share.module";
import { ActivityTypeComponent } from "./page/activitytype/activitytype.component";
import { ArticleModule } from "./page/article/article.module";
import { BankPaymentComponent } from "./page/bankpayment/bankpayment.component";
import { CategoryComponent } from "./page/category/category.component";
import { DashboardComponent } from "./page/dashboard.component";
import { IndustryComponent } from "./page/industry/industry.component";
import { LoginAdminComponent } from "./page/login/login.component";
import { MembershipComponent } from "./page/membership/membership.component";
import { PositionComponent } from "./page/position/position.component";
import { PostTypeComponent } from "./page/posttype/posttype.component";
import { SalesSettingComponent } from "./page/sales-setting/salesseting.component";
import { SocmedComponent } from "./page/socmed/socmed.component";
import { UserComponent } from "./page/user/user.component";


export const adminRoutes: Routes = [
    {
        path: 'admin/login',
        component: LoginAdminComponent
    },
    {
        path: '',
        component: NavbarComponent,
        children: [
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
                path : 'bankpayment',
                component : BankPaymentComponent
            },
            {
                path : 'activitytype',
                component : ActivityTypeComponent
            },
            {
                path : 'posttype',
                component : PostTypeComponent
            },
            {
                path : 'membership',
                component : MembershipComponent
            },
            {
                path : 'sales-setting',
                component : SalesSettingComponent
            },

        ]
    },
    {
        path: 'admin/article',
        loadChildren: () => import("./page/article/article.module").then(a => a.ArticleModule),
        component: NavbarComponent
    }

]

@NgModule({
    declarations: [
        DashboardComponent, CategoryComponent, PositionComponent, IndustryComponent, SocmedComponent, UserComponent, LoginAdminComponent, MembershipComponent, BankPaymentComponent, ActivityTypeComponent,PostTypeComponent,SalesSettingComponent
    ],
    imports: [
        RouterModule.forRoot(adminRoutes),
        ArticleModule, CustomButtonModule, ShareModule
    ],
    exports: [
        RouterModule,
        DashboardComponent, CategoryComponent, PositionComponent, IndustryComponent, SocmedComponent, UserComponent, LoginAdminComponent, MembershipComponent, BankPaymentComponent,ActivityTypeComponent,PostTypeComponent,SalesSettingComponent
    ]
})

export class AppRouting { }
