import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { DomSanitizer, SafeResourceUrl, Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { BankPaymentRes } from "@dto/bankpayment/bank-payment-res";
import { InvoiceRes } from "@dto/invoice/invoice-res";
import { MembershipPaymentReq } from "@dto/payment/member-pay-req";
import { PaymentDetailRes } from "@dto/payment/payment-detail-res-data";
import { UserPaymentReqUpdate } from "@dto/payment/user-payment-req-update";
import { faHeart, faComment, faBook, faNewspaper, faPeopleGroup,faPenToSquare, faGlobe} from '@fortawesome/free-solid-svg-icons';
import { ActivityService } from "@service/activity.service";
import { BankPaymentService } from "@service/bankpayment.service";
import { InvoiceService } from "@service/invoice.service";
import { MemberStatusService } from "@service/member.service";
import { SalesSettingService } from "@service/salessetting.service";
import { Subscription } from "rxjs";
import {taxAmount, discountAmount, totalPay} from "../../../../../../base-area/src/app/utils/paymentFormula"

@Component({
    selector : 'App-subs-pay',
    templateUrl : 'subs-pay.component.html'
})

export class SubsPayComponent implements OnInit, OnDestroy{

    
    faHeart = faHeart
    faComment = faComment
    faBook = faBook
    faNewspaper = faNewspaper
    faPeopleGroup = faPeopleGroup
    faPenToSquare = faPenToSquare
    faGlobe = faGlobe
    

    invoice!: InvoiceRes[]
    bankPayments : BankPaymentRes[] = []
    paymentDetail! :PaymentDetailRes

    memberStatusDetail$? : Subscription
    buyMember$? : Subscription
    subsPayment$? : Subscription
    invoice$? : Subscription
    salesSetting$? : Subscription
    bankPaymnets$? : Subscription
    paymentDetail$? : Subscription

    updateComplete!:boolean
    invoiceId! : string
    subsId! : string
    taxAmmount!:number
    imageSource!: SafeResourceUrl

    constructor(
        private fb : FormBuilder,
        private title:Title,
        private router: Router, 
        private activatedRouter:ActivatedRoute,
        private memberStatus : MemberStatusService,
        private invoiceService : InvoiceService,
        private activityService : ActivityService,
        private salesSettingService: SalesSettingService,
        private bankPaymentService : BankPaymentService,
        private _sanitizer: DomSanitizer
        ){
        this.title.setTitle('Subscription')
    }



    payment = this.fb.group({
        paymentId : [""],
        bankPaymentId : [""],
        fileName : [""],
        fileExtension : [""],
        fileContent : [""],
        ver : [0],
        discountNum : [0],
        price : [0]
    })

    invoiceDetail = this.fb.group({
    
        invoiceId:[""],
        membershipId:[""],
        voucherCode:[""],
        invoiceCode:[""],
        activityTitle:[""],
        price:[0],
        statusName: [""],
        paymentExpired : [""],
        periodDay: [0],
        taxAmmount: [0],
        priceMemberShip: [0],
        total:[0],
        discountNum:[0],
        isActive:[true],
        ver:[0]
    })

    uploadTransactions = this.fb.group({
        paymentId:[""],
        bankPayment:[{}],
        imgCover:this.fb.group({
            fileName:[""],
            fileExtension:[""],
            fileContent:[""],
        }),
        ver:[0]
    }) 
    
    calculateDiscount(){
        return discountAmount(this.invoiceDetail.value.discountNum!, this.invoiceDetail.value.priceMemberShip!)
     
    }
 
    calculateTax(){
         console.log(this.taxAmmount)
         console.log(this.invoiceDetail.value.priceMemberShip!)
         return taxAmount(this.taxAmmount,this.invoiceDetail.value.priceMemberShip!) 
    }
    
    calculateTotalPay(){
         return totalPay(this.invoiceDetail.value.priceMemberShip!,this.calculateDiscount(),this.calculateTax())
    }
 
    onRemoveImageCover() {
        this.imageSource = ""
        this.uploadTransactions.get('imageCover')?.reset()
    }

    addFiles(fileContent: string, fileExtension: string){
        this.uploadTransactions.get('imgCover')?.patchValue({
            fileName: (Date.now().toString()),
            fileContent: (fileContent),
            fileExtension: (fileExtension),

        })
    }

    onUpload(event: any) {
        const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                if (typeof reader.result === "string") resolve(reader.result)
            };
            reader.onerror = error => reject(error);
        });

        for (let file of event.target.files) {
            toBase64(file).then(result => {
                const resultBase64 = result.substring(result.indexOf(",") + 1, result.length)
                const resultExtension = file.name.substring(file.name.lastIndexOf(".") + 1, file.name.length)

                this.addFiles(resultBase64, resultExtension)

                this.imageSource = this._sanitizer.bypassSecurityTrustResourceUrl(`data:image/${resultExtension};base64, ${resultBase64}`);
               
            })
        }
    }

    onBuy(){
        const data:UserPaymentReqUpdate={
            paymentId:this.uploadTransactions.value.paymentId!,
            bankPaymentId:this.uploadTransactions.value.bankPayment!['bankPaymentId'],
            fileContent:this.uploadTransactions.value.imgCover?.fileContent!,
            fileExtension:this.uploadTransactions.value.imgCover?.fileExtension!,
            ver:this.uploadTransactions.value.ver!
        }

        this.buyMember$ = this.activityService.getPayment(data).subscribe(res => {
            this.updateComplete = true
            setTimeout(() => {
                this.updateComplete = false
                this.router.navigateByUrl('/dashboard')
              }, 5000)

        })
    }

    initBankPayments(){
        this.bankPaymnets$ = this.bankPaymentService.getAdminBankPayment().subscribe(res =>{
            this.bankPayments = res
        })
    }

    initSalesSetting():void{
        this.salesSetting$ = this.salesSettingService.getSalesSetting().subscribe(res=>{
            this.taxAmmount = res.tax
        })
    }

    initPaymentDetail(){
        this.paymentDetail$ = this.activityService.getDetailPayment(this.invoiceId).subscribe(res => {
            this.uploadTransactions.patchValue({
                paymentId: res.paymentId,
                ver: res.ver
            })
        })
    }


    initInvoice(){
        this.activatedRouter.params.subscribe(res => {
            const params = res as any
            this.invoiceId = params.id
            this.invoice$ = this.activityService.getDetailPayment(params.id).subscribe(res=>{
                this.invoiceDetail.patchValue({
                    invoiceId:res.invoiceId,
                    statusName : res.statusName,
                    invoiceCode:res.invoiceCode,
                    paymentExpired: res.paymentExpired,
                    periodDay: res.periodDay,
                    taxAmmount: res.taxAmmount,
                    priceMemberShip: res.priceMemberShip,
                    total: res.total,
                })
                
            })
            
        })
    }

    ngOnInit(): void {
        this.initSalesSetting()
        this.initBankPayments()
        this.initInvoice()
        this.initPaymentDetail()
    }
    ngOnDestroy(): void {
        this.memberStatusDetail$?.unsubscribe()
    }


}