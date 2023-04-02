import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { Subscription } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { PaymentDetailResData } from '@dto/payment/payment-detail-res';
import { UserService } from '@service/user.service';
import { ActivityService } from '@service/activity.service';
import { LazyLoadEvent, MenuItem } from 'primeng/api';
import { faBook, faHeart, faNewspaper, faPeopleGroup } from '@fortawesome/free-solid-svg-icons';
import { ActivityUpcomingAllRes } from '@dto/activity/activity-upcoming-all-res';
import { MEMBER_STATUS } from 'projects/base-area/src/app/constant/member-status';
import { getInitials } from 'projects/base-area/src/app/utils/getInitial';
import { truncateString } from 'projects/base-area/src/app/utils/turncateString';

@Component({
    selector: 'app-mytransaction',
    templateUrl: './my-transaction.component.html'
})

export class MyTransactionComponent implements OnInit, OnDestroy {

    private transaction$!: Subscription
    private upcomingEvents$!: Subscription

    upcomingEvents?:ActivityUpcomingAllRes
    memberStatus!: string
    imageIdProfile= ""
    fullNameLogin=""
    memberReguler = MEMBER_STATUS.REGULAR
    isPaid?: any = true
  

    faHeart = faHeart
    faBook = faBook
    faNewspaper = faNewspaper
    faPeopleGroup = faPeopleGroup

    listTransaction: PaymentDetailResData[] = []
   
    limit: number = 5
    offset: number = 0
    totalData: number = 0
    loading: boolean = true
    paymentId!: string

    accountMenu: MenuItem[] = [
      { label: 'Profile', icon: 'pi pi-fw pi-user', command: e=> this.router.navigateByUrl("/profile") },
      { label: 'My Transaction', icon: 'pi pi-fw pi-credit-card', command: e=> this.router.navigateByUrl("/my-transaction") },
      { label: 'Report Activity', icon: 'pi pi-fw pi-chart-bar', command: e=> this.router.navigateByUrl("/report-activity") },
      { label: 'Report Income', icon: 'pi pi-fw pi-dollar', command: e=> this.router.navigateByUrl("/report-income") },
      { label: 'My Course', icon: 'pi pi-fw pi-book', command: e=> this.router.navigateByUrl("/my-course") },
      { label: 'My Events', icon: 'pi pi-fw pi-calendar', command: e=> this.router.navigateByUrl("/my-event") },
      { label: 'My Bookmark', icon: 'pi pi-fw pi-bookmark', command: e=> this.router.navigateByUrl("/my-bookmark") },

      { label: 'Logout', icon: 'pi pi-fw pi-sign-out', command: e=> this.onLogOut() },
    ];

    onLogOut(){
      localStorage.clear()
      this.router.navigateByUrl("/")
    }

    loadData(event: LazyLoadEvent) {
        console.log(event)
        this.initTransaction(event.rows, event.first)
    }

    fotoName(name: string){
      return getInitials(name)
    }

    turncate(str:string){
      return truncateString(str, 20)
    }


    initTransaction(limit?: number, offset?: number, isPaid?: boolean) {
        this.transaction$ = this.activityService.getMyTransaction(this.limit, this.offset, this.isPaid).subscribe(res => {
            const resultData: any = res
            this.listTransaction = resultData.data
            this.loading = false
            this.totalData = resultData.total
            console.log(resultData)
        })
    }

    constructor(private title: Title, private fb: FormBuilder,
        private userService: UserService, private router: Router, private activityService: ActivityService) {
        this.title.setTitle("Course")
    }
    ngOnDestroy(): void {
        throw new Error('Method not implemented.');
    }

    initUpcomingEvents(){
      this.upcomingEvents$ = this.activityService.getUpcomingEvent(0,3).subscribe(res =>{
        this.upcomingEvents = res
        console.log(res)
      })
    }

    onPaidStatusChange(isPaid: boolean | null) {
        if (isPaid === null) {
          this.isPaid = null;
        } else {
          this.isPaid = isPaid;
        }
        this.initTransaction!(this.limit, this.offset, this.isPaid);
      }

    ngOnInit(): void {
    this.initTransaction(this.limit, this.offset, this.isPaid) 
      this.initUpcomingEvents()
      this.memberStatus =  this.userService.getMemberCode()
      this.imageIdProfile = this.userService.getIdFotoProfile()
      this.fullNameLogin = this.userService.getFullName()


    }


}
