import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

@Component({
    selector : 'app-create-event',
    templateUrl : './event-create.component.html'
})

export class EventCreateComponent implements OnInit, OnDestroy{
    private event$?:Subscription
    ngOnDestroy(): void {
        this.event$?.unsubscribe()
    }
    ngOnInit(): void {

    }

}