import { Component, OnDestroy, OnInit} from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { DomSanitizer, SafeResourceUrl, Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { FileReq } from "@dto/file/file-req";
import { UserPaymentReqUpdate } from "@dto/payment/user-payment-req-update";
import { faBook, faHeart, faNewspaper, faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import { ActivityService } from "@service/activity.service";
import { InvoiceService } from "@service/invoice.service";
import { SalesSettingService } from "@service/salessetting.service";
import { Subscription } from "rxjs";
import {taxAmount, discountAmount, totalPay} from "../../../../../../base-area/src/app/utils/paymentFormula"
import { PaymentDetailRes } from '../../../../../../base-area/src/app/dto/payment/payment-detail-res';

@Component({
    selector : 'app-payment-event',
    templateUrl : './event-payment.component.html'
})

export class EventPaymentComponent implements OnInit, OnDestroy{
    private eventPayment$?:Subscription
    private paymentDetail$?:Subscription
    private salesSetting$?:Subscription
    private buyActivity$?:Subscription

    faHeart = faHeart
    faBook = faBook
    faNewspaper = faNewspaper
    faPeopleGroup = faPeopleGroup
    activityId!:string
    invoiceId!:string
    taxAmount!:number
    imageSource!: SafeResourceUrl
    paymentDetail!:PaymentDetailRes



    constructor(private fb:FormBuilder, private title:Title, private invoiceService:InvoiceService, private activityService:ActivityService,
        private router:Router, private activatedRouter:ActivatedRoute, private salesSettingService:SalesSettingService,
        private _sanitizer: DomSanitizer){
        this.title.setTitle('Payment')
    }

    invoiceDetail = this.fb.group({
        invoiceId:[""],
        activityId:[""],
        voucherId:[""],
        membershipId:[""],
        voucherCode:[""],
        invoiceCode:[""],
        imageId:[""],
        activityTitle:[""],
        price:[0],
        startDate:[""],
        endDate:[""],
        location:[""],
        provider:[""],
        discountNum:[0],
        isActive:[true],
        ver:[0]
    })

    initInvoiceDetail():void{
        this.activatedRouter.params.subscribe(res=>{
            const params = res as any
            this.activityId = params.id
            this.invoiceId = params.id
            this.invoiceDetail.patchValue({
                activityId:params.activityId,
                invoiceId:params.invoiceId
            })
            this.eventPayment$ = this.invoiceService.getInvoiceId(params.id).subscribe(res=>{
                this.invoiceDetail.patchValue({
                    invoiceId:res.invoiceId,
                    activityId:res.activityId,
                    voucherId:res.voucherId,
                    membershipId:res.membershipId,
                    imageId:res.imageId,
                    voucherCode:res.voucherCode,
                    invoiceCode:res.invoiceCode,
                    activityTitle:res.activityTitle,
                    price:res.price,
                    provider:res.provider,
                    location:res.location,
                    discountNum:res.discountNum,
                    startDate:res.startDate,
                    endDate: res.endDate,
                })
                // this.uploadTransactions.value.paymentId = res.
            })
        })
    }

    initSalesSetting():void{
        this.salesSetting$ = this.salesSettingService.getSalesSetting().subscribe(res=>{
            this.taxAmount = res.tax
        })
    }

    calculateDiscount(){
       return discountAmount(this.invoiceDetail.value.discountNum!, this.invoiceDetail.value.price!)

    }

    calculateTax(){
        return taxAmount(this.taxAmount,this.invoiceDetail.value.price!)
    }

    calculateTotalPay(){
        return totalPay(this.invoiceDetail.value.price!,this.calculateDiscount(),this.calculateTax())
    }

    uploadTransactions = this.fb.group({
        paymentId:[""],
        bankPaymentId:[""],
        imgCover:this.fb.group({
            fileName:[""],
            fileExtension:[""],
            fileContent:[""],
        }),
        ver:[0]
    })

    onRemoveImageCover() {
        this.imageSource = ""
        this.uploadTransactions.get('imgCover')?.reset()

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

    onBuyActivity(){
        const data:UserPaymentReqUpdate={
            paymentId:this.uploadTransactions.value.paymentId!,
            bankPaymentId:this.uploadTransactions.value.bankPaymentId!,
            fileName:this.uploadTransactions.value.imgCover?.fileName!,
            fileContent:this.uploadTransactions.value.imgCover?.fileContent!,
            fileExtension:this.uploadTransactions.value.imgCover?.fileExtension!,
            ver:this.uploadTransactions.value.ver!

        }

        this.buyActivity$ = this.activityService.getPayment(data).subscribe(res=>{
            this.router.navigateByUrl('events')
        })
    }



    initPaymentDetail(){
      this.paymentDetail$ = this.activityService.getDetailPayment(this.invoiceId).subscribe(res =>{
        this.paymentDetail = res
        // this.uploadTransactions.value.paymentId = res.paymentId
        // this.uploadTransactions.value.bankPaymentId = res.bankPaymetIdc
        // this.uploadTransactions.value.ver = res.ver
        this.uploadTransactions.patchValue({
          paymentId : res.paymentId,
          ver : res.ver
        })
        console.log("payment detail: ")
        console.log(res)
      })
    }

    ngOnDestroy(): void {
       this.eventPayment$?.unsubscribe()
    }
    ngOnInit(): void {
        this.initInvoiceDetail()
        this.initSalesSetting()
        this.activatedRouter.params.subscribe(res=>{
            const params = res as any
            this.uploadTransactions.value.paymentId = params.paymentId
            console.log(params.paymentId)
            console.log(params.invoiceId)
        })
        this.initPaymentDetail()

    }
}
