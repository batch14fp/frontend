import { ActivatedRouteSnapshot } from '@angular/router';
import { Component } from "@angular/core";
import { MenuItem } from "primeng/api";

@Component({
    selector : 'app-invoice',
    templateUrl : './invoice.component.html'
})

export class InvoiceComponent{
  activeState: boolean[] = [true, false, false];

    toggle(index: number) {
        this.activeState[index] = !this.activeState[index];
    }

}
