import { Component } from "@angular/core";
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { UserService } from "../../services/user.service";
import { getInitials } from "../../utils/getInitial";

@Component({
    selector : 'app-bottom-navbar',
    templateUrl : './bottom-navbar.component.html',
    styleUrls: ['./bottom-navbar.component.css']
})

export class BottomNavbar{
  menuItems = [
    { label: 'Home', icon: 'fa fa-home', route: '/home' },
    { label: 'About', icon: 'fa fa-info', route: '/about' },
    { label: 'Course', icon: 'fa fa-envelope', route: '/course' }
  ];
  activeItem: any;


    constructor(private userService:UserService, private router: Router, private route: ActivatedRoute){
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          const route = this.route.root.firstChild?.snapshot.routeConfig?.path
          this.activeItem = this.menuItems.find(item => item.route === `/${route}`);
        }
      });
    }

}
