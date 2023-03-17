import { AccordionModule } from 'primeng/accordion';
import { Component } from "@angular/core";
import { MenuItem } from "primeng/api";
import { faHeart, faComment, faBook, faNewspaper, faPeopleGroup } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector : 'app-dashboard-user',
    templateUrl : './dashboard.component.html'
})

export class DashboardComponent{
    items!: MenuItem[];

    faHeart = faHeart
    faBook = faBook
    faNewspaper = faNewspaper
    faPeopleGroup = faPeopleGroup

    ngOnInit() {
        this.items = [
            {label: 'Thread', routerLink: ['thread']},
            {label: 'Calendar'}
        ];
    }

}
