import { Component } from "@angular/core";
import { MenuItem } from 'primeng/api';
import { getInitials } from "../../utils/getInitial";

@Component({
    selector : 'app-navbar',
    templateUrl : './navbar.component.html'
})

export class NavbarComponent{

    // initial(name : string){
    //     getInitials(name) 
    // }
    
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