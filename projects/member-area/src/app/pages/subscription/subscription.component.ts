import { Component, OnDestroy, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { MemberStatusRes } from "@dto/memberstatus/member-status-res";
import { MembershipPaymentReq } from "@dto/payment/member-pay-req";
import { faHeart, faComment, faBook, faNewspaper, faPeopleGroup,faPenToSquare, faGlobe} from '@fortawesome/free-solid-svg-icons';
import { MemberStatusService } from "@service/member.service";
import { Subscription } from "rxjs";

@Component({
    selector : 'app-subs',
    templateUrl : 'subscription.component copy.html'
})

export class SubscriptionComponent implements OnInit, OnDestroy{

    memberStatus : MemberStatusRes[] = []

    member$? : Subscription
    buyMember$? : Subscription

    faHeart = faHeart
    faComment = faComment
    faBook = faBook
    faNewspaper = faNewspaper
    faPeopleGroup = faPeopleGroup
    faPenToSquare = faPenToSquare
    faGlobe = faGlobe

    constructor(
        private memberStatusService : MemberStatusService,
        private title : Title,
        private router : Router)
        {
            this.title.setTitle('Subscription')
    }

    initMember(){
        this.member$ = this.memberStatusService.getAllMemberStatus().subscribe(res=>{
            this.memberStatus = res
        })
    }

    onBuy(memberStatusId : string){
        const data : MembershipPaymentReq = {
            membershipId : memberStatusId
        }
        console.log(data);
        this.buyMember$ = this.memberStatusService.subscribtionMembership(data).subscribe(res => {
            this.router.navigate(['payment'])
        })
    }

    ngOnInit(): void {
        this.initMember()
    }
    
    ngOnDestroy(): void {
       this.member$?.unsubscribe()
    }

    
}