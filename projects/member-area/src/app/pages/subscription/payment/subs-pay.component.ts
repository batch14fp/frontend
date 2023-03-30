import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { DomSanitizer, SafeResourceUrl, Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { InvoiceRes } from "@dto/invoice/invoice-res";
import { MembershipPaymentReq } from "@dto/payment/member-pay-req";
import { faHeart, faComment, faBook, faNewspaper, faPeopleGroup,faPenToSquare, faGlobe} from '@fortawesome/free-solid-svg-icons';
import { InvoiceService } from "@service/invoice.service";
import { MemberStatusService } from "@service/member.service";
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

    // membershipId! : number
    memberStatusDetail$? : Subscription
    buyMember$? : Subscription
    subsPayment$? : Subscription
    invoice$? : Subscription

    subsId! : string
    taxAmount!:number
    imageSource!: SafeResourceUrl

    constructor(
        private fb : FormBuilder,
        private title:Title,
        private router: Router, 
        private activatedRouter:ActivatedRoute,
        private memberStatus : MemberStatusService,
        private invoiceService : InvoiceService,
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
    
    calculateDiscount(){
        return discountAmount(this.invoiceDetail.value.discountNum!, this.invoiceDetail.value.price!)
     
    }
 
    calculateTax(){
         console.log(this.taxAmount)
         console.log(this.invoiceDetail.value.price!)
         return taxAmount(this.taxAmount,this.invoiceDetail.value.price!) 
    }
    
    calculateTotalPay(){
         return totalPay(this.invoiceDetail.value.price!,this.calculateDiscount(),this.calculateTax())
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

    initInvoice(){
        // this.activatedRouter.params.subscribe(res => {
        //     const params = res as any
        //     this.subsId = params.id
        //     this.invoiceDetail.patchValue({
        //         activityId:params.activityId,
        //         invoiceId:params.invoiceId
        //     })
        //     this.invoice$ = this.invoiceService.getInvoiceId(params.id).subscribe(res=>{
        //         this.invoiceDetail.patchValue({
        //             invoiceId:res.invoiceId,
        //             activityId:res.activityId,
        //             voucherId:res.voucherId,
        //             membershipId:res.membershipId,
        //             imageId:res.imageId,
        //             voucherCode:res.voucherCode,
        //             invoiceCode:res.invoiceCode,
        //             activityTitle:res.activityTitle,
        //             price:res.price,
        //             provider:res.provider,
        //             location:res.location,
        //             discountNum:res.discountNum,
        //             startDate:res.startDate,
        //             endDate: res.endDate,
        //         })
                
        //     })
            
        // })
    }

    ngOnInit(): void {
        // this.activatedRouter.params.subscribe(res=>{
        //     const params = res as any
        //     this.member.patchValue({
        //         membershipId:params.membershipId
        //     })
        // })
        this.initInvoice()
        
    }
    ngOnDestroy(): void {
        this.memberStatusDetail$?.unsubscribe()
    }


}