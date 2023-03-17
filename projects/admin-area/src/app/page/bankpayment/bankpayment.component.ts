import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { BankPaymentReq } from "@dto/bankpayment/bank-payment-req";
import { BankPaymentRes } from "@dto/bankpayment/bank-payment-res";
import { BankPaymentService } from "projects/base-area/src/app/services/bankpayment.service";
import { Subscription } from "rxjs";

@Component({
    selector : 'app-bank-payment',
    templateUrl : 'bankpayment.component.html'
})

export class BankPaymentComponent implements OnInit, OnDestroy{
    
    getBank : BankPaymentRes [] = []

    private getBank$? : Subscription
    private banks$? : Subscription
    private banksUpdate$? : Subscription
    private bankDelete$? : Subscription


    displayResponsive!:boolean
    showResponsiveDialog(){
        this.displayResponsive = true
    }

    displayUpdate!:boolean
    showUpdateDialog(bankPayment : BankPaymentRes){
        console.log(bankPayment)
        
    }

    constructor(
        private fb : FormBuilder,
        private router : Router,
        private bankService : BankPaymentService,
        private title : Title
    ){
        this.title.setTitle('Bank Payment')
    }

    createBankPayment = this.fb.group({
        bankPaymentName : [""],
        accountNumber : [""],
	    accountName : [""],
    })

    updateBankPayment = this.fb.group({
        bankPaymentId : [""],
        bankPaymentName : [""],
        accountNumber : [""],
        accountName : [""],
        isActive : [true],
        ver : [0]
    })

    

    onCreateBankPayment(){
        const data:BankPaymentReq ={
            bankPaymentName:this.createBankPayment.value.bankPaymentName!,
            accountName : this.createBankPayment.value.accountName!,
            accountNumber : this.createBankPayment.value.accountNumber!
        }
        this.banks$ = this.bankService.insertBankPayment(data).subscribe(res=>{
            alert('Create Bank Payment Success')
            this.initBankPayment()
        })
    }

    initBankPayment(){
        this.getBank$ = this.bankService.getAllBankPayment().subscribe(res => {
            this.getBank = res
        })
    }

    ngOnInit(): void {
       this.initBankPayment()
    }
    
    ngOnDestroy(): void {
        this.getBank$?.unsubscribe()
    }

}