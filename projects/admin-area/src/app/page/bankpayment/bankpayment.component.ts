import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { BankPaymentReq } from "@dto/bankpayment/bank-payment-req";
import { BankPaymentRes } from "@dto/bankpayment/bank-payment-res";
import { BankPaymentUpdateReq } from "@dto/bankpayment/bank-payment-update-req";
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

        this.updateBankPayment.setValue({
            bankPaymentId : bankPayment.bankPaymentId,
            bankPaymentName : bankPayment.bankPaymentName,
            accountNumber : bankPayment.accountNumber,
            accountName: bankPayment.accountName,
            isActive : bankPayment.isActive,
            ver : bankPayment.ver
        })
        this.displayUpdate = true
    }

    displayDelete!:boolean
    showDeleteDialog(){
        this.displayDelete = true
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

    onDeleteBankPayment(bankPayment : BankPaymentRes){
        console.log('delete')
        this.bankDelete$ = this.bankService.deleteBankPayment(bankPayment.bankPaymentId).subscribe(res => {
            alert('Delete Success')
            this.initBankPayment()
        })
        
    }


    onUpdateBankPayment(){
        const data : BankPaymentUpdateReq = {
            bankPaymentId : this.updateBankPayment.value.bankPaymentId!,
            bankPaymentName : this.updateBankPayment.value.bankPaymentName!,
            accountNumber : this.updateBankPayment.value.accountNumber!,
            accountName: this.updateBankPayment.value.accountName!,
            isActive : this.updateBankPayment.value.isActive!,
            ver : this.updateBankPayment.value.ver!
        }
        this.banks$ = this.bankService.updateBankPayment(data).subscribe(res =>{
            alert('Update Bank Payment Success')
            this.initBankPayment()
        })
    }


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