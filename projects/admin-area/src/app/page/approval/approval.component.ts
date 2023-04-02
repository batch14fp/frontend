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
  selector: "app-approval",
  templateUrl: "approval.component.html"
})
export class ApprovalComponent implements OnInit, OnDestroy {
  private payment$?: Subscription;
  private approvalPayment$?: Subscription;
  private downloadReceipts$?: Subscription;

  listTransaction: PaymentDetailResData[] = [];
  isPaid :any = null;
  ver!: number;
  limit = 5;
  offset = 0;
  totalData = 0;
  loading = true;
  paymentId!: string;
  disable!: boolean;
  desc!: string;
  paid!: boolean;

  constructor(
    private fb: FormBuilder,
    private title: Title,
    private router: Router,
    private adminService: AdminService
  ) {
    this.title.setTitle("Approval");
  }

  ngOnInit(): void {
    this.initTransaction();



  }

  ngOnDestroy(): void {
    this.payment$?.unsubscribe();
    this.approvalPayment$?.unsubscribe();
  }

  loadData(event: LazyLoadEvent) {
    this.offset = event.first ?? 0;
    this.limit = event.rows ?? 5;
    this.initTransaction();
  }

  initTransaction() {
    this.loading = true;

    this.payment$ = this.adminService
      .getAllTransaction(this.limit, this.offset, this.isPaid)
      .subscribe(
        res => {
          const resultData: any = res;
          this.listTransaction = resultData.data;
          this.loading = false;
          this.ver = resultData.dataPaymentDetail.ver;
          this.paid = resultData.data.isPaid;
          this.totalData = resultData.total;
          this.disable = this.ver <= 1;
        }
      );
  }

  onApproveTransaction(dataPayment: PaymentDetailRes) {
    const data: PaymentReqUpdate = {
      paymentId: dataPayment.paymentId,
      isPaid: true,
      ver: dataPayment.ver
    };
    this.approvalPayment$ = this.adminService.updatePayment(data).subscribe(
        res => {
          this.initTransaction();
        })
  }

  onClickDownload(filePaymentId :string){

    this.downloadReceipts$ = this.adminService.getFileReceipt(filePaymentId).subscribe(res=>{

    })
            

  }
  onDisapproveTransaction(dataPayment: PaymentDetailRes) {
    const data: PaymentReqUpdate = {
      paymentId: dataPayment.paymentId,
      isPaid: false,
      ver: dataPayment.ver
    };
    this.approvalPayment$ = this.adminService.updatePayment(data).subscribe(
        res => {
          this.initTransaction();
        })
  }

}
