import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NavbarComponent } from "projects/base-area/src/app/components/navbar/navbar.component";
import { ProfileComponent } from "./pages/profile/profile.component";
import { TreadComponent } from "./pages/thread/tread.component";


const memberRoutes : Routes = [
    {
        path : 'dashboard',
        component : NavbarComponent,
        children : [
            {
                path : "thread",
                component : TreadComponent
            }
        ]
    },
    {
        path : '',
        component : NavbarComponent,
        children : [
            {
                path : 'profile',
                component : ProfileComponent
            }
        ]

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