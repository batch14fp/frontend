import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { MemberStatusReq } from "@dto/memberstatus/member-status-req";
import { MemberStatusRes } from "@dto/memberstatus/member-status-res";
import { MemberStatusUpdateReq } from "@dto/memberstatus/member-status-update-req";
import { MemberStatusService } from "projects/base-area/src/app/services/member.service";
import { Subscription } from "rxjs";

@Component({
    selector : 'app-membership',
    templateUrl : './membership.component.html'
})

export class MembershipComponent implements OnInit, OnDestroy{
    private memberships$?:Subscription
    private membershipUpdate$?: Subscription
    private membershipDelete$?: Subscription

    getAllMembership:MemberStatusRes[] = []

    
    displayResponsive!: boolean
    showResponsiveDialog() {
        this.displayResponsive = true
    }

    displayUpdate!: boolean
    showUpdateDialog(membership: MemberStatusRes) {
        console.log(membership)
        this.updateMembership.setValue({
            memberStatusId: membership.memberStatusId,
            codeStatus: membership.codeStatus,
            statusName:membership.statusName,
            periodDay:membership.periodDay,
            price:membership.price,
            active: membership.isActive,
            ver: membership.ver
        })
        this.displayUpdate = true
    }

    displayDelete!: boolean
    showDeleteDialog() {
        this.displayDelete = true
    }

    constructor(private fb: FormBuilder, private title: Title, private memberStatusService:MemberStatusService,
        private router: Router) {
        this.title.setTitle('membership')
    }

    createMembership = this.fb.group({
        codeStatus: [""],
        statusName:[""],
        periodDay:[0],
        price:[""]
    })

    updateMembership = this.fb.group({
        memberStatusId: [""],
        codeStatus: [""],
        statusName:[""],
        periodDay:[0],
        price:[""],
        ver: [0],
        active: [true]
    })

    onCreateMembership() {
        const data: MemberStatusReq = {
            codeStatus: this.createMembership.value.codeStatus!,
            statusName:this.createMembership.value.statusName!,
            periodDay:this.createMembership.value.periodDay!,
            price:this.createMembership.value.price!,
        }
        this.memberships$ = this.memberStatusService.insertMemberStatus(data).subscribe(res => {
            alert('Create member status success')
            this.initMembership()
        })

    }

    onUpdateMembershipConfirm() {
        const data: MemberStatusUpdateReq = {
            memberStatusId: this.updateMembership.value.memberStatusId!,
            codeStatus: this.updateMembership.value.codeStatus!,
            statusName:this.updateMembership.value.statusName!,
            periodDay:this.updateMembership.value.periodDay!,
            price:this.updateMembership.value.price!,
            ver: this.updateMembership.value.ver!,
            isActive: this.updateMembership.value.active!
        }
        this.membershipUpdate$ = this.memberStatusService.updateMemberStatus(data).subscribe(res => {
            alert('Update Member Status Success')
            this.initMembership()
        })
    }
    onDeleteMembership(membership: MemberStatusRes) {
        console.log("delete")
        this.membershipDelete$ = this.memberStatusService.deleteMemberStatus(membership.memberStatusId).subscribe(res => {
            alert('Delete Success')
            this.initMembership()
        })
    }

    ngOnDestroy(): void {
        this.memberships$?.unsubscribe()
        this.membershipUpdate$?.unsubscribe()
    }

    initMembership(): void {
        this.memberships$ = this.memberStatusService.getAllMemberStatus().subscribe(res => {
            this.getAllMembership = res
        })
    }

    ngOnInit(): void {
        this.initMembership()

    }
}