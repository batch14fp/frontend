import { Component } from "@angular/core";


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
