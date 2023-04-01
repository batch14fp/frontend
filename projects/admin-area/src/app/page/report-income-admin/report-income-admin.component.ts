import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { faHeart, faComment, faBook, faNewspaper, faPeopleGroup,faPenToSquare, faGlobe} from '@fortawesome/free-solid-svg-icons';
import { ActivityService } from "@service/activity.service";
import { LazyLoadEvent } from "primeng/api";
import { Subscription } from "rxjs";
import {convertUTCToLocalDateISO} from '../../../../../base-area/src/app/utils/dateutil'
import { IncomesMemberRes } from "@dto/report/incomes-member-res";
import { IncomesAdminRes } from "@dto/report/incomes-admin-res";

@Component({
    selector : 'app-report-income-admin',
    templateUrl : 'report-income-admin.component.html'
})

export class ReportInvoiceAdminComponent implements OnInit, OnDestroy{
    private incomeReport$?:Subscription
    private income$?:Subscription
    private downloadReport$?:Subscription

    incomeAdmin: IncomesAdminRes[] = []
    limit:number = 3
    offset:number = 0
    totalData:number = 0
    query?: string
    startDate?:string
    endDate?:string
    loading: boolean = true
    userId!:string

    constructor(private fb:FormBuilder,private title:Title, private router:Router, private activityService:ActivityService, private activatedRoute:ActivatedRoute){
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

    onDownload(){
        this.downloadReport$ = this.activityService.getDownloadReport(this.userId, this.startDate, this.endDate).subscribe(res=>{
            
        })
    }

    onFilterReport(limit?:number, offset?:number){
        let startDate = undefined
        let endDate = undefined

        if(this.activityFilter.get('startDate')?.value && this.activityFilter.get('endDate')?.value){
            startDate = convertUTCToLocalDateISO(this.activityFilter.get('startDate')?.value)
            endDate = convertUTCToLocalDateISO(this.activityFilter.get('endDate')?.value)
        }

        this.income$ = this.activityService.getAdminReportIncome(this.limit,this.offset, startDate, endDate).subscribe(res=>{
            const resultData:any = res
            this.incomeAdmin = resultData.data
            this.loading = false
            this.totalData = resultData.total
            console.log(resultData)
        })
    }

    ngOnInit(): void {
        // this.initActivity()
    }

    ngOnDestroy(): void {
       this.incomeReport$?.unsubscribe()
    }

    faHeart = faHeart
    faComment = faComment
    faBook = faBook
    faNewspaper = faNewspaper
    faPeopleGroup = faPeopleGroup
    faPenToSquare = faPenToSquare
    faGlobe = faGlobe
}