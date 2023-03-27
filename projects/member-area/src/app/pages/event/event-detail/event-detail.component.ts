import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { faBook, faHeart, faNewspaper, faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import { ActivityService } from "@service/activity.service";
import { Subscription } from "rxjs";

@Component({
    selector : 'app-detail-event',
    templateUrl : './event-detail.component.html'
})

export class EventDetailComponent implements OnInit, OnDestroy{
    private eventDetail$?:Subscription
    
    faHeart = faHeart
    faBook = faBook
    faNewspaper = faNewspaper
    faPeopleGroup = faPeopleGroup

    constructor(private fb:FormBuilder, private title:Title, private activityService:ActivityService, private router: Router, private activatedRouter:ActivatedRoute){
        this.title.setTitle('Event')
    }

    detailActivity = this.fb.group({
        activityId:[""],
        title:[""],
        content:[""],
        providers:[""],
        categoryName:[""],
        price:[0],
        startDate:[""],
        endDate:[""]
    })

    ngOnDestroy(): void {
        this.eventDetail$?.unsubscribe()
    }
    ngOnInit(): void {
        this.activatedRouter.params.subscribe(res=>{
            const params = res as any
            this.detailActivity.patchValue({
                activityId:params.activityId
            })
            this.eventDetail$ = this.activityService.getActivity(params.id).subscribe(res=>{
                this.detailActivity.patchValue({
                    activityId:res.activityId,
                    title:res.title,
                    content:res.content,
                    providers:res.providers,
                    categoryName:res.categoryName,
                    price:res.price,
                    startDate:res.startDate,
                    endDate:res.endDate
                })
            })
        })
    }

}