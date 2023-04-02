import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { Subscription } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { PaymentDetailResData } from '@dto/payment/payment-detail-res';
import { UserService } from '@service/user.service';
import { ActivityService } from '@service/activity.service';
import { LazyLoadEvent } from 'primeng/api';
import { faBook, faHeart, faNewspaper, faPeopleGroup } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-mytransaction',
    templateUrl: './my-transaction.component.html'
})

export class MyTransactionComponent implements OnInit, OnDestroy {

    private transaction$?: Subscription

    faHeart = faHeart
    faBook = faBook
    faNewspaper = faNewspaper
    faPeopleGroup = faPeopleGroup

    listTransaction: PaymentDetailResData[] = []
    isPaid: boolean = true
    limit: number = 5
    offset: number = 0
    totalData: number = 0
    loading: boolean = true
    paymentId!: string

    loadData(event: LazyLoadEvent) {
        console.log(event)
        this.initTransaction(event.rows, event.first)
    }

    initTransaction(limit?: number, offset?: number, isPaid?: boolean) {
        this.transaction$ = this.activityService.getMyTransaction(this.limit, this.offset, this.isPaid).subscribe(res => {
            const resultData: any = res
            this.listTransaction = resultData.data
            this.loading = false
            this.totalData = resultData.total
            console.log(resultData)
        })
    }

    constructor(private title: Title, private fb: FormBuilder,
        private userService: UserService, private router: Router, private activityService: ActivityService) {
        this.title.setTitle("Course")
    }

    ngOnInit(): void {


    }

    ngOnDestroy(): void {
        this.transaction$?.unsubscribe()
    }
}
