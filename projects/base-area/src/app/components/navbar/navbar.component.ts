import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { MenuItem } from 'primeng/api';
import { UserService } from "../../services/user.service";
import { getInitials } from "../../utils/getInitial";

@Component({
    selector : 'app-navbar',
    templateUrl : './navbar.component.html'
})

export class NavbarComponent{
    constructor(private userService:UserService, private router:Router){

    }

    onLogout(){
        localStorage.clear()
        this.router.navigateByUrl('')
    }

    memberItem! : MenuItem[]
    adminItem! : MenuItem[]
    items!: MenuItem[]
    role!:string
    img!:string

    ngOnInit() {
        this.role = this.userService.roleCode
        this.img = this.userService.images
        console.log(this.role)
        this.items = [

            {
                label : 'Master',
                items : [
                    {
                        label:'Category',
                        routerLink:'/category'
                    },
                    {
                        label:'Position',
                        routerLink : '/position'
                    },
                    {
                        label:'Industry',
                        routerLink : '/industry'
                    },
                    {
                        label : 'Article',
                        routerLink : '/admin/article'
                    },
                    {
                        label : 'Activity Type',
                        routerLink : '/activitytype'
                    },
                    {
                        label : 'Bank',
                        routerLink : '/bankpayment'
                    },
                    {
                        label : 'Post Type',
                        routerLink : '/posttype'
                    },
                    {
                        label : 'Membership',
                        routerLink : '/membership'
                    },
                    {
                        label:'Social Media',
                        routerLink : '/socialmedia'
                    },
                ]
            },
            {
                label : 'User',
                routerLink : '/user'
            },
            {
                label : 'Sales Setting',
                routerLink : '/sales-setting'
            },
            {
                label : 'Report',
                routerLink : '/report/admin'
            }
        ];

        this.memberItem = [
            {
                label:'Post',
                routerLink:''
            },
            {
                label:'Course',
                routerLink : ''
            },
            {
                label:'Article',
                routerLink : ''
                
            },
            {
                label:'Event',
                routerLink : ''
            },
        ]
    }

}