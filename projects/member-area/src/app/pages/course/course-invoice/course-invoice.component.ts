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

@Component({
    selector : 'app-invoice-course',
    templateUrl : './course-invoice.component.html'
})

export class CourseInvoiceComponent implements OnInit, OnDestroy{
    private courseDetail$?:Subscription
    private bank$?: Subscription
    private voucher$?:Subscription
    private createInvoice$?:Subscription

    bankPayment:BankPaymentRes[] = []
    voucherValid!:boolean
    voucherInvalid!:boolean

    faHeart = faHeart
    faBook = faBook
    faNewspaper = faNewspaper
    faPeopleGroup = faPeopleGroup
    activityId!:string
    voucherId!:string

    constructor(private fb:FormBuilder, private title:Title, private activityService:ActivityService, private router: Router, private activatedRouter:ActivatedRoute,
        private bankService:BankPaymentService, private invoiceService:InvoiceService){
        this.title.setTitle('Course')
    }

    ngOnDestroy(): void {
        this.courseDetail$?.unsubscribe()
    }
    ngOnInit(): void {
        this.initDetails()
        this.initBankPayment()
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

}