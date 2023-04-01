import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { ActivityAdminRes } from "@dto/report/activity-admin-res";
import { faBook, faComment, faGlobe, faHeart, faNewspaper, faPenToSquare, faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import { ActivityService } from "@service/activity.service";
import { LazyLoadEvent } from "primeng/api";
import { convertUTCToLocalDateISO } from "projects/base-area/src/app/utils/dateutil";
import { Subscription } from "rxjs";

@Component({
    selector : 'app-report-adm',
    templateUrl : 'report-adm.component.html'
})

export class ReportAdminComponent implements OnInit, OnDestroy{
    private activityReport$?:Subscription
    private activity$?:Subscription

    activityAdmin: ActivityAdminRes[] = []
    limit:number = 1
    offset:number = 0
    totalData:number = 0
    query?: string
    startDate?:string
    endDate?:string
    loading: boolean = true

    constructor(private fb:FormBuilder,private title:Title, private router:Router, private activityService:ActivityService){
        this.title.setTitle("Report")
    }

    activityFilter = this.fb.group({
        startDate : [""],
        endDate:[""]
    })

    loadData(event: LazyLoadEvent) {
        console.log(event)
        // this.initActivity(event.first, event.rows, event.globalFilter)
        this.onFilterReport(event.rows,event.first)
    }


    onFilterReport(limit?:number, offset?:number){
        let startDate = undefined
        let endDate = undefined

        if(this.activityFilter.get('startDate')?.value && this.activityFilter.get('endDate')?.value){
            startDate = convertUTCToLocalDateISO(this.activityFilter.get('startDate')?.value)
            endDate = convertUTCToLocalDateISO(this.activityFilter.get('endDate')?.value)
        }

        this.activity$ = this.activityService.getReportAllByDateRangeAdmin(this.limit,this.offset, startDate, endDate).subscribe(res=>{
            const resultData:any = res
            this.activityAdmin = resultData.data
            this.loading = false
            this.totalData = resultData.total
            console.log(resultData)
        })
    }

    ngOnInit(): void {
        // this.initActivity()
    }

    ngOnDestroy(): void {
       this.activityReport$?.unsubscribe()
    }

    faHeart = faHeart
    faComment = faComment
    faBook = faBook
    faNewspaper = faNewspaper
    faPeopleGroup = faPeopleGroup
    faPenToSquare = faPenToSquare
    faGlobe = faGlobe

}