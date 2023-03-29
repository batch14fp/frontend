import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { MembershipPaymentReq } from "@dto/payment/member-pay-req";
import { faHeart, faComment, faBook, faNewspaper, faPeopleGroup,faPenToSquare, faGlobe} from '@fortawesome/free-solid-svg-icons';
import { MemberStatusService } from "@service/member.service";
import { Subscription } from "rxjs";

@Component({
    selector : 'App-subs-pay',
    templateUrl : 'subs-pay.component.html'
})

export class SubsPayComponent implements OnInit, OnDestroy{

    memberStatusDetail$? : Subscription

    faHeart = faHeart
    faComment = faComment
    faBook = faBook
    faNewspaper = faNewspaper
    faPeopleGroup = faPeopleGroup
    faPenToSquare = faPenToSquare
    faGlobe = faGlobe

    // membershipId! : number
    buyMember$? : Subscription

    constructor(
        private fb : FormBuilder,
        private title:Title,
        private router: Router, 
        private activatedRouter:ActivatedRoute,
        private memberStatus : MemberStatusService
        ){
        this.title.setTitle('Subscription')
    }

    

    onBuy(){
        this.activatedRouter.params.subscribe(res =>{
            const params = res as any
            const data : MembershipPaymentReq = {
                membershipId : params.id
            }
            console.log(data);
            this.buyMember$ = this.memberStatus.subscribtionMembership(data).subscribe(res => {})
            
        })


    }

    ngOnInit(): void {
        this.activatedRouter.params.subscribe(res=>{
            const params = res as any
            // this.member.patchValue({
            //     membershipId:params.membershipId
            // })
        })
        
    }
    ngOnDestroy(): void {
        this.memberStatusDetail$?.unsubscribe()
    }


}