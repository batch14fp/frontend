import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { BankPaymentRes } from "@dto/bankpayment/bank-payment-res";
import { faBook, faHeart, faNewspaper, faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import { ActivityService } from "@service/activity.service";
import { BankPaymentService } from "@service/bankpayment.service";
import { InvoiceService } from "@service/invoice.service";
import { Subscription } from "rxjs";
import { VoucherAppliedReq } from "@dto/voucher/vourcher-applied-req";
import { InvoiceReq } from "@dto/invoice/invoice-req";
import { ActivityUpcomingAllRes } from "@dto/activity/activity-upcoming-all-res";
import { truncateString } from "projects/base-area/src/app/utils/turncateString";
import { getInitials } from "projects/base-area/src/app/utils/getInitial";
import { MEMBER_STATUS } from "projects/base-area/src/app/constant/member-status";
import { MenuItem } from "primeng/api";
import { UserService } from "@service/user.service";

@Component({
    selector : 'app-invoice-course',
    templateUrl : './course-invoice.component.html'
})

export class CourseInvoiceComponent implements OnInit, OnDestroy{
    private courseDetail$?:Subscription
    private bank$?: Subscription
    private voucher$?:Subscription
    private createInvoice$?:Subscription
    private upcomingEvents$?: Subscription

    upcomingEvents?:ActivityUpcomingAllRes
    bankPayment:BankPaymentRes[] = []
    voucherValid!:boolean
    voucherInvalid!:boolean
    memberStatus!: string
    imageIdProfile= ""
    fullNameLogin=""
    memberReguler = MEMBER_STATUS.REGULAR

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

    faHeart = faHeart
    faBook = faBook
    faNewspaper = faNewspaper
    faPeopleGroup = faPeopleGroup
    activityId!:string
    voucherId!:string


  fotoName(name: string){
    return getInitials(name)
  }

  turncate(str:string){
    return truncateString(str, 20)
  }

    constructor(private fb:FormBuilder, private title:Title, private activityService:ActivityService, private router: Router, private activatedRouter:ActivatedRoute,
        private bankService:BankPaymentService, private invoiceService:InvoiceService,
        private userService:UserService){
        this.title.setTitle('Course')
    }


    onVoucherApplied():void{
        const data:VoucherAppliedReq = {
            activityId : this.detailActivity.value.activityId!,
            voucherCode : this.detailActivity.value.voucherCode!
        }
        this.voucher$ = this.activityService.setVoucherCode(data).subscribe(res=>{
            if(res.isAllowed){
                this.voucherValid = true
                this.voucherInvalid  = !this.voucherInvalid
                this.voucherId = res.voucherId
            }else if(!res.isAllowed){
                this.voucherInvalid = true
                this.voucherValid = !this.voucherValid
            }
            if(!res){
                this.voucherInvalid = false
                this.voucherValid = false
            }
        })
    }

    initBankPayment():void{
        this.bank$ = this.bankService.getAllBankPayment().subscribe(res=>{
            this.bankPayment = res
        })
    }

    initDetails():void{
      this.activatedRouter.params.subscribe(res=>{
        const params = res as any
        this.activityId = params.id
        this.detailActivity.patchValue({
          activityId:params.activityId
        })
        this.courseDetail$ = this.activityService.getActivity(params.id).subscribe(res=>{
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

    detailActivity = this.fb.group({
        activityId:[""],
        title:[""],
        content:[""],
        location:[""],
        imgActivityId:[""],
        providers:[""],
        categoryName:[""],
        price:[0],
        startDate:[""],
        endDate:[""],
        voucherCode:[""],
    })

    walletMember = this.fb.group({
        bankPaymentName : [""],
        accountNumber : [""],
        accountName : [""]
    })

    onCreateInvoice(){
        const data:InvoiceReq={
            activityId:this.detailActivity.value.activityId!,
            voucherId:this.voucherId
        }
        this.createInvoice$ = this.invoiceService.insertInvoice(data).subscribe(res=>{
        this.router.navigateByUrl(`/course/detail/${this.activityId}/invoice/${res.id}/payment`)
        })
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

    ngOnDestroy(): void {
        this.courseDetail$?.unsubscribe()
        this.bank$?.unsubscribe()
        this.voucher$?.unsubscribe()
        this.createInvoice$?.unsubscribe()
        this.upcomingEvents$?.unsubscribe()
    }
    ngOnInit(): void {
        this.initDetails()
        this.initBankPayment()
        this.initUpcomingEvents()
        this.memberStatus =  this.userService.getMemberCode()
        this.imageIdProfile = this.userService.getIdFotoProfile()
        this.fullNameLogin = this.userService.getFullName()
    }

  }
