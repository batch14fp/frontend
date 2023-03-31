import { Component } from "@angular/core";

@Component({
    selector : 'app-approval',
    templateUrl : 'approval.component.html'
})

export class ApprovalComponent{

    product = [
        {nMember : 'iki', nEvent : 'pramuka', type: 'event', date:'20002-10-20', trans:'gambar'}
    ]
}