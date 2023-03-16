import { Component, OnDestroy, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivityTypeRes } from "@pojo/activitytype/activity-type-res";
import { ActivityTypeService } from "projects/base-area/src/app/services/activitytype.service";
import { Subscription } from "rxjs";

@Component({
    selector : 'app-activity-type',
    templateUrl : 'activitytype.component.html'
})

export class ActivityTypeComponent implements OnInit, OnDestroy{

    getAllactivityType : ActivityTypeRes [] = []

    private getAllactivityType$? : Subscription

    constructor(
        private activityTypeService : ActivityTypeService,
        private title : Title
    ){
        this.title.setTitle('Activity Type')
    }

    ngOnInit(): void {
       this.getAllactivityType$ = this.activityTypeService.getAllActivityType().subscribe(res => {
        this.getAllactivityType = res
       })
    }

    ngOnDestroy(): void {
        this.getAllactivityType$?.unsubscribe()
    }


    // activitytypes = [
    //     {code:'po', name :'position'},
    //    {code:'po', name :'position'},
    //    {code:'po', name :'position'},
    //    {code:'po', name :'position'},
    // ]

    
}