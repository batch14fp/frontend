import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { PaymentDetailResData } from "@dto/payment/payment-detail-res";
import { PaymentDetailRes } from "@dto/payment/payment-detail-res-data";
import { PaymentReqUpdate } from "@dto/payment/payment-req-update";
import { AdminService } from "@service/admin.service";
import { LazyLoadEvent } from "primeng/api";
import { Subscription } from "rxjs";

@Component({
    selector : 'app-approval',
    templateUrl : 'approval.component.html'
})

export class ApprovalComponent  implements OnInit, OnDestroy{
    private payment$?:Subscription
    private approvalPayment$?:Subscription

    listTransaction:PaymentDetailResData [] = []
    isPaid:boolean = true
    limit:number = 5
    offset:number = 0
    totalData:number = 0
    loading: boolean = true
    paymentId!:string

    loadData(event: LazyLoadEvent) {
        console.log(event)
        this.initTransaction(event.rows,event.first)
    }

    initTransaction(limit?:number, offset?:number,isPaid?:boolean){
        this.payment$ = this.adminService.getAllTransaction(this.limit, this.offset,this.isPaid).subscribe(res=>{
            const resultData:any = res
            this.listTransaction = resultData.data
            this.loading = false
            this.totalData = resultData.total
            console.log(resultData)
        })
    }

    constructor(private fb:FormBuilder,private title:Title, private router:Router, private adminService:AdminService){
        this.title.setTitle("Approval")
    }


    onUpdateTransaction(dataPayment:PaymentDetailRes){
        const data:PaymentReqUpdate = {
            paymentId:dataPayment.paymentId,
            isPaid:true,
            ver:dataPayment.ver,
        }
        this.approvalPayment$ = this.adminService.updatePayment(data).subscribe(res=>{
            this.initTransaction()
        })
    }

    ngOnInit(): void {
        
    }
    ngOnDestroy(): void {
        this.payment$?.unsubscribe()
        this.approvalPayment$?.unsubscribe()
    }
   
}