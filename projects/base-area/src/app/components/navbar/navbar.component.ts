import { Component } from "@angular/core";
import {MenuItem} from 'primeng/api';

@Component({
    selector : 'app-navbar',
    templateUrl : './navbar.component.html'
})

export class NavbarComponent{

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
            }
        ];
    }

}