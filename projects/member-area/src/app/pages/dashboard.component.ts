import { Component } from "@angular/core";
import { MenuItem } from "primeng/api";

@Component({
    selector : 'app-dashboard-user',
    templateUrl : './dashboard.component.html'
})

export class DashboardComponent{
    items!: MenuItem[];

    ngOnInit() {
        this.items = [
            {label: 'Thread', routerLink: ['thread']},
            {label: 'Calendar'}
        ];
    }
    
}