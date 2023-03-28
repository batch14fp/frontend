import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { BankPaymentRes } from "@dto/bankpayment/bank-payment-res";
import { faBook, faHeart, faNewspaper, faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import { ActivityService } from "@service/activity.service";
import { BankPaymentService } from "@service/bankpayment.service";
import { Subscription } from "rxjs";

@Component({
    selector : 'app-invoice-event',
    templateUrl : './event-invoice.component.html'
})

export class EventInvoiceComponent implements OnInit, OnDestroy{
    private eventDetail$?:Subscription
    private bank$?: Subscription

    bankPayment:BankPaymentRes[] = []

    faHeart = faHeart
    faBook = faBook
    faNewspaper = faNewspaper
    faPeopleGroup = faPeopleGroup
    activityId!:string

    constructor(private fb:FormBuilder, private title:Title, private activityService:ActivityService, private router: Router, private activatedRouter:ActivatedRoute,
        private bankService:BankPaymentService){
        this.title.setTitle('Event')
    }

    ngOnDestroy(): void {
        this.eventDetail$?.unsubscribe()
    }
    ngOnInit(): void {
        this.initDetails()
        this.initBankPayment()
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
            this.eventDetail$ = this.activityService.getActivity(params.id).subscribe(res=>{
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
    })

    walletMember = this.fb.group({
        bankPaymentName : [""],
        accountNumber : [""],
        accountName : [""]
    })



}