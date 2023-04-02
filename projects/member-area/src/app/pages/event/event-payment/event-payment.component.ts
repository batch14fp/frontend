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
import { BankPaymentRes } from '../../../../../../base-area/src/app/dto/bankpayment/bank-payment-res';
import { BankPaymentService } from '../../../../../../base-area/src/app/services/bankpayment.service';
import { PaymentDetailRes } from "@dto/payment/payment-detail-res-data";
import { ActivityUpcomingAllRes } from "@dto/activity/activity-upcoming-all-res";
import { truncateString } from "projects/base-area/src/app/utils/turncateString";
import { getInitials } from "projects/base-area/src/app/utils/getInitial";
import { UserService } from "@service/user.service";
import { MEMBER_STATUS } from "projects/base-area/src/app/constant/member-status";
import { MenuItem } from "primeng/api";

@Component({
    selector : 'app-payment-event',
    templateUrl : './event-payment.component.html'
})

export class EventPaymentComponent implements OnInit, OnDestroy{
    private eventPayment$?:Subscription
    private paymentDetail$?:Subscription
    private salesSetting$?:Subscription
    private buyActivity$?:Subscription
    private bankPayments$?:Subscription
    private upcomingEvents$?: Subscription

    upcomingEvents?:ActivityUpcomingAllRes

    faHeart = faHeart
    faBook = faBook
    faNewspaper = faNewspaper
    faPeopleGroup = faPeopleGroup
    activityId!:string
    invoiceId!:string
    taxAmount!:number
    imageSource!: SafeResourceUrl
    paymentDetail!:PaymentDetailRes
    bankPayments:BankPaymentRes[] = []
    updateComplete!:boolean



    constructor(private fb:FormBuilder, private title:Title, private invoiceService:InvoiceService, private activityService:ActivityService,
        private router:Router, private activatedRouter:ActivatedRoute, private salesSettingService:SalesSettingService,
        private _sanitizer: DomSanitizer, private bankPaymentService: BankPaymentService,
        private userService:UserService){
        this.title.setTitle('Payment')
    }

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
        bankPayment:[{}],
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
            bankPaymentId:this.uploadTransactions.value.bankPayment!['bankPaymentId'],
            fileContent:this.uploadTransactions.value.imgCover?.fileContent!,
            fileExtension:this.uploadTransactions.value.imgCover?.fileExtension!,
            ver:this.uploadTransactions.value.ver!

        }

        this.buyActivity$ = this.activityService.getPayment(data).subscribe(res=>{
          this.updateComplete = true
          setTimeout(() => {
            this.updateComplete = false
            this.router.navigateByUrl('/dashboard')
          }, 5000);
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

    initBankPayments(){
      this.bankPayments$ = this.bankPaymentService.getAdminBankPayment().subscribe(res => this.bankPayments = res)
    }

    initUpcomingEvents(){
      this.upcomingEvents$ = this.activityService.getUpcomingEvent(0,3).subscribe(res =>{
        this.upcomingEvents = res
        console.log(res)
      })
    }

    fotoName(name: string){
      return getInitials(name)
    }

    turncate(str:string){
      return truncateString(str, 20)
    }

    onLogOut(){
      localStorage.clear()
      this.router.navigateByUrl("/")
    }

    ngOnDestroy(): void {
       this.eventPayment$?.unsubscribe()
    }

    ngOnInit(): void {
      this.initUpcomingEvents()
      this.memberStatus =  this.userService.getMemberCode()
      this.imageIdProfile = this.userService.getIdFotoProfile()
      this.fullNameLogin = this.userService.getFullName()
      this.initBankPayments()
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
