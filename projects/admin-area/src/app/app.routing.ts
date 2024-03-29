import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CustomButtonModule } from "projects/base-area/src/app/components/button/button.module";
import { NavbarComponent } from "projects/base-area/src/app/components/navbar/navbar.component";
import { ROLE } from "projects/base-area/src/app/constant/role.service";
import { AuthRoleGuard } from "projects/base-area/src/app/guard/role.guard";
import { ShareModule } from "projects/base-area/src/app/share.module";
import { ActivityTypeComponent } from "./page/activitytype/activitytype.component";
import { ApprovalComponent } from "./page/approval/approval.component";
import { ArticleModule } from "./page/article/article.module";
import { BankPaymentComponent } from "./page/bankpayment/bankpayment.component";
import { CategoryComponent } from "./page/category/category.component";
import { DashboardComponent } from "./page/dashboard.component";
import { IndustryComponent } from "./page/industry/industry.component";
import { LoginAdminComponent } from "./page/login/login.component";
import { MembershipComponent } from "./page/membership/membership.component";
import { PositionComponent } from "./page/position/position.component";
import { PostTypeComponent } from "./page/posttype/posttype.component";
import { ReportInvoiceAdminComponent } from "./page/report-income-admin/report-income-admin.component";
import { ReportAdminComponent } from "./page/report/report-adm.component";
import { SalesSettingComponent } from "./page/sales-setting/salesseting.component";
import { SocmedComponent } from "./page/socmed/socmed.component";
import { UserComponent } from "./page/user/user-list/user.component";


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
                component: CategoryComponent,
                canActivate: [AuthRoleGuard],
                data: [ROLE.SPADM,ROLE.ADMIN]
            },
            {
                path: 'position',
                component: PositionComponent,
                canActivate: [AuthRoleGuard],
                data: [ROLE.SPADM,ROLE.ADMIN]
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
                path: 'bankpayment',
                component: BankPaymentComponent
            },
            {
                path: 'activitytype',
                component: ActivityTypeComponent
            },
            {
                path: 'posttype',
                component: PostTypeComponent
            },
            {
                path: 'membership',
                component: MembershipComponent
            },
            {
                path: 'sales-setting',
                component: SalesSettingComponent,
                canActivate: [AuthRoleGuard],
            
            },
            {
                path: 'admin/report-activity',
                component: ReportAdminComponent,
                canActivate: [AuthRoleGuard],
                data: [ROLE.SPADM,ROLE.ADMIN]
            },
            {
                path: 'admin/report-income',
                component: ReportInvoiceAdminComponent,
                canActivate: [AuthRoleGuard],
                data: [ROLE.SPADM,ROLE.ADMIN]
            },
            {
                path: 'approval-payment',
                component: ApprovalComponent
            }

        ]
    },
    {
        path: 'admin/article',
        loadChildren: () => import("./page/article/article.module").then(a => a.ArticleModule),
        component: NavbarComponent
    },
    {
        path: 'user',
        loadChildren: () => import("./page/user/user.module").then(u => u.UserModule),
        component: NavbarComponent
    }

]

@NgModule({
    declarations: [

        DashboardComponent, CategoryComponent, PositionComponent, IndustryComponent, SocmedComponent, LoginAdminComponent, MembershipComponent, BankPaymentComponent, ActivityTypeComponent, PostTypeComponent, SalesSettingComponent, ReportAdminComponent,
        ReportInvoiceAdminComponent, ApprovalComponent


    ],
    imports: [
        RouterModule.forRoot(adminRoutes),
        ArticleModule, CustomButtonModule, ShareModule
    ],
    exports: [
        RouterModule,

        DashboardComponent, CategoryComponent, PositionComponent, IndustryComponent, SocmedComponent, LoginAdminComponent, MembershipComponent, BankPaymentComponent, ActivityTypeComponent, PostTypeComponent, SalesSettingComponent, ReportAdminComponent,
        ReportInvoiceAdminComponent, ApprovalComponent

    ]
})

export class AppRouting { }
