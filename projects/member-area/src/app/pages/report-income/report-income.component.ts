import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { faHeart, faComment, faBook, faNewspaper, faPeopleGroup,faPenToSquare, faGlobe} from '@fortawesome/free-solid-svg-icons';
import { ActivityService } from "@service/activity.service";
import { LazyLoadEvent, MenuItem } from "primeng/api";
import { Subscription } from "rxjs";
import {convertUTCToLocalDateISO} from '../../../../../base-area/src/app/utils/dateutil'
import { IncomesMemberRes } from "@dto/report/incomes-member-res";
import { UserService } from "@service/user.service";
import { ActivityUpcomingAllRes } from "@dto/activity/activity-upcoming-all-res";
import { truncateString } from "projects/base-area/src/app/utils/turncateString";
import { getInitials } from "projects/base-area/src/app/utils/getInitial";
import { MEMBER_STATUS } from "projects/base-area/src/app/constant/member-status";

@Component({
    selector : 'app-report-income',
    templateUrl : 'report-income.component.html'
})

export class ReportInvoiceComponent implements OnInit, OnDestroy{
    private incomeReport$?:Subscription
    private income$?:Subscription
    private downloadReport$?:Subscription
    private upcomingEvents$?: Subscription

    upcomingEvents?:ActivityUpcomingAllRes
    incomeMember: IncomesMemberRes[] = []
    limit:number = 3
    offset:number = 0
    totalData:number = 0
    query?: string
    startDate?:any = null
    endDate?:any= null
    loading: boolean = true
    userId!:string

    memberStatus!: string
    imageIdProfile= ""
    fullNameLogin=""
    memberReguler = MEMBER_STATUS.REGULAR

    accountMenu: MenuItem[] = [
      { label: 'Profile', icon: 'pi pi-fw pi-user', command: e=> this.router.navigateByUrl("/profile") },
      { label: 'My Transaction', icon: 'pi pi-fw pi-credit-card', command: e=> this.router.navigateByUrl("/my-transaction") },
      { label: 'Report Activity', icon: 'pi pi-fw pi-chart-bar', command: e=> this.router.navigateByUrl("/report-activity") },
      { label: 'Report Income', icon: 'pi pi-fw pi-dollar', command: e=> this.router.navigateByUrl("/report-activity") },
      { label: 'My Course', icon: 'pi pi-fw pi-book', command: e=> this.router.navigateByUrl("/my-course") },
      { label: 'My Events', icon: 'pi pi-fw pi-calendar', command: e=> this.router.navigateByUrl("/my-event") },
      { label: 'My Bookmark', icon: 'pi pi-fw pi-bookmark', command: e=> this.router.navigateByUrl("/my-bookmark") },

      { label: 'Logout', icon: 'pi pi-fw pi-sign-out', command: e=> this.onLogOut() },
    ];



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
        this.onFilterReport(event.rows,event.first)
    }

    onDownload(){
        this.downloadReport$ = this.activityService.getDownloadIncomesReport(this.userId, this.startDate, this.endDate).subscribe(res=>{

        })
    }

    onFilterReport(limit?:number, offset?:number){
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

    fotoName(name: string){
      return getInitials(name)
    }

    turncate(str:string){
      return truncateString(str, 20)
    }

    initUpcomingEvents(){
      this.upcomingEvents$ = this.activityService.getUpcomingEvent(0,3).subscribe(res =>{
        this.upcomingEvents = res
        console.log(res)
      })
    }

    onLogOut(){
      localStorage.clear()
      this.router.navigateByUrl("/")
    }

    ngOnInit(): void {
        this.userId = this.userService.getIdLogin().substring(0);
        this.initUpcomingEvents()
        this.memberStatus =  this.userService.getMemberCode()
        this.imageIdProfile = this.userService.getIdFotoProfile()
        this.fullNameLogin = this.userService.getFullName()
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
