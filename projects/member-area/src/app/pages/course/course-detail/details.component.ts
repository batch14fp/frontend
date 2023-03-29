import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { faBook, faHeart, faNewspaper, faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import { ActivityService } from "@service/activity.service";
import { Subscription } from "rxjs";

@Component({
    selector : 'app-detail-course',
    templateUrl : 'details.component.html'
})

export class DetailComponent implements OnInit, OnDestroy{
    private courseDetails$?:Subscription

    faHeart = faHeart
    faBook = faBook
    faNewspaper = faNewspaper
    faPeopleGroup = faPeopleGroup

    constructor(private fb:FormBuilder, private title:Title, private activityService:ActivityService, private router: Router, private activatedRouter:ActivatedRoute){
        this.title.setTitle('Course')
    }

    detailActivity = this.fb.group({
        activityId:[""],
        title:[""],
        location:[""],
        imgActivityId:[""],
        content:[""],
        providers:[""],
        categoryName:[""],
        price:[0],
        startDate:[""],
        endDate:[""]
    })

    ngOnInit(): void {
        this.activatedRouter.params.subscribe(res=>{
            const params = res as any
            this.detailActivity.patchValue({
                activityId:params.activityId
            })
            this.courseDetails$ = this.activityService.getActivity(params.id).subscribe(res=>{
                this.detailActivity.patchValue({
                    activityId:res.activityId,
                    title:res.title,
                    content:res.content,
                    location: res.activityLocation,
                    providers:res.providers,
                    categoryName:res.categoryName,
                    price:res.price,
                    startDate:res.startDate,
                    endDate:res.endDate,
                    imgActivityId: res.imgActivityId
                })
            })
        })
    }

    ngOnDestroy(): void {
        this.courseDetails$?.unsubscribe()
    }
}
