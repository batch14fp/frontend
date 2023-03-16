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

    role = this.userService.getRole()

    onLogout(){
        localStorage.clear()
        this.router.navigateByUrl('')
    }

    memberItem! : MenuItem[]
    items!: MenuItem[];

    ngOnInit() {
        this.items = [
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
                label:'Social Media',
                routerLink : '/socialmedia'
            },
            {
                label : 'User',
                routerLink : '/user'
            },
            {
                label : 'Article',
                routerLink : '/article'
            },
            {
                label : 'Membership',
                routerLink : '/membership'
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