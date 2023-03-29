import { Component, OnDestroy, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { MemberStatusRes } from "@dto/memberstatus/member-status-res";
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

    faHeart = faHeart
    faComment = faComment
    faBook = faBook
    faNewspaper = faNewspaper
    faPeopleGroup = faPeopleGroup
    faPenToSquare = faPenToSquare
    faGlobe = faGlobe

    constructor(
        private memberStatusService : MemberStatusService,
        private title : Title)
        {
            this.title.setTitle('Subscription')
    }

    initMember(){
        this.member$ = this.memberStatusService.getAllMemberStatus().subscribe(res=>{
            this.memberStatus = res
        })
    }

    ngOnInit(): void {
        this.initMember()
    }
    ngOnDestroy(): void {
       this.member$?.unsubscribe()
    }

    
}