import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MenuItem } from 'primeng/api';
import { UserService } from "../../services/user.service";
import { getInitials } from "../../utils/getInitial";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html'
})

export class NavbarComponent implements OnInit{
    constructor(private userService: UserService, private router: Router) {

    }

    onLogout() {
        localStorage.clear()
        this.router.navigateByUrl('')
    }

    memberItem!: MenuItem[]
    adminItem!: MenuItem[]
    items!: MenuItem[]
    role!: string
    img!: string

    ngOnInit() {
        this.role = this.userService.roleCode.substring(0)
        this.initNavbarRole()
    }

    initNavbarRole(){
        
        this.img = this.userService.images

        if (this.role == 'SPADM') {
            this.items = [
                {
                    label: 'Master',
                    items: [
                        {
                            label: 'Category',
                            routerLink: '/category'
                        },
                        {
                            label: 'Position',
                            routerLink: '/position'
                        },
                        {
                            label: 'Industry',
                            routerLink: '/industry'
                        },
                        {
                            label: 'Activity Type',
                            routerLink: '/activitytype'
                        },
                        {
                            label: 'Bank',
                            routerLink: '/bankpayment'
                        },
                        {
                            label: 'Post Type',
                            routerLink: '/posttype'
                        },
                        {
                            label: 'Membership',
                            routerLink: '/membership'
                        },
                        {
                            label: 'Social Media',
                            routerLink: '/socialmedia'
                        },
                    ]
                },
                {
                    label: 'User',
                    routerLink: '/user'
                },
                {
                    label: 'Sales Setting',
                    routerLink: '/sales-setting'
                }
            ];
        }else if(this.role == 'ADMIN'){
            this.items = [
                {
                    label: 'Article',
                    routerLink: '/admin/article'
                },
                {
                    label: 'Report',
                    items: [
                        {
                            label: 'Report Activity',
                            routerLink: '/admin/report-activity'
                        },
                        {
                            label: 'Report Income',
                            routerLink: '/admin/report-income'
                        }
                    ]
                },
                {
                    label: 'Payment Approval',
                    routerLink: '/approval-payment'
                },
            ];
        }
    }

}