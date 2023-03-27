import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

@Component({
    selector : 'app-detail-event',
    templateUrl : './event-detail.component.html'
})

export class EventDetailComponent implements OnInit, OnDestroy{
    private event$?:Subscription

    ngOnDestroy(): void {
        this.event$?.unsubscribe()
    }
    ngOnInit(): void {
       
    }

}