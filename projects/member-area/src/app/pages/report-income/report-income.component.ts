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
import { UserService } from "@service/user.service";

@Component({
    selector : 'app-report-income',
    templateUrl : 'report-income.component.html'
})

export class ReportInvoiceComponent implements OnInit, OnDestroy{
    private incomeReport$?:Subscription
    private income$?:Subscription
    private downloadReport$?:Subscription

    incomeMember: IncomesMemberRes[] = []
    limit:number = 3
    offset:number = 0
    totalData:number = 0
    query?: string
    startDate?:string
    endDate?:string
    loading: boolean = true
    userId!:string

    constructor(private fb:FormBuilder,private title:Title, private router:Router, private activityService:ActivityService, private activatedRoute:ActivatedRoute, private userService:UserService){
        this.title.setTitle("Report")
    }

    activityFilter = this.fb.group({
        startDate : [""],
        endDate:[""]
    })

    loadData(event: LazyLoadEvent) {
        console.log(event)
        // this.initActivity(event.first, event.rows, event.globalFilter)
        this.onFilterReport()
    }

    onDownload(){
        this.downloadReport$ = this.activityService.getDownloadIncomesReport(this.userId, this.startDate, this.endDate).subscribe(res=>{
            
        })
    }

    onFilterReport(){
        let startDate = undefined
        let endDate = undefined

        if(this.activityFilter.get('startDate')?.value && this.activityFilter.get('endDate')?.value){
            startDate = convertUTCToLocalDateISO(this.activityFilter.get('startDate')?.value)
            endDate = convertUTCToLocalDateISO(this.activityFilter.get('endDate')?.value)
        }

        this.income$ = this.activityService.getMemberReportIncome(this.limit,this.offset, startDate, endDate).subscribe(res=>{
            const resultData:any = res
            this.incomeMember = resultData.data
            this.loading = false
            this.totalData = resultData.total
            console.log(resultData)
        })
    }

    ngOnInit(): void {
        this.userId = this.userService.getIdLogin().substring(0);
        //this.initActivity();
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