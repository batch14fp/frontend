import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { SocialMediaAdminReq } from "@dto/socialmedia/social-media-admin-req";
import { SocialMediaUpdateReq } from "@dto/socialmedia/social-media-admin-update-req";
import { SocialMediaGetRes } from "@dto/socialmedia/social-media-res";
import { SocmedService } from "projects/base-area/src/app/services/socmed.service";
import { Subscription } from "rxjs";

@Component({
    selector : 'app-socmed',
    templateUrl : './socmed.component.html'
})

export class SocmedComponent implements OnInit, OnDestroy{
   
    private socmeds$?:Subscription
    private socmedUpdate$?:Subscription
    private socmedDelete$?:Subscription

    getAllSocmed:SocialMediaGetRes[] = []

    displayResponsive!: boolean
    showResponsiveDialog() {
        this.displayResponsive = true
    }

    displayUpdate!: boolean
    showUpdateDialog(socmed: SocialMediaGetRes) {
        console.log(socmed)
        this.updateSocmed.setValue({
            socialMediaId: socmed.socialMediaId,
            platformName: socmed.platformName,
            active: socmed.isActive,
            ver: socmed.ver
        })
        this.displayUpdate = true
    }

    displayDelete!: boolean
    showDeleteDialog() {
        this.displayDelete = true
    }

    constructor(private fb: FormBuilder, private title: Title, private socmedService: SocmedService,
        private router: Router) {
        this.title.setTitle('Social Media')
    }

    createSocmed = this.fb.group({
        platformName: [""],
    })

    updateSocmed = this.fb.group({
        socialMediaId: [""],
        platformName: [""],
        ver: [0],
        active: [true]
    })

    onCreateSocmed() {
        const data: SocialMediaAdminReq = {
            platformName: this.createSocmed.value.platformName!,
        }
        this.socmeds$ = this.socmedService.insertSocmedAdmin(data).subscribe(res => {
            alert('Create Socmed Success')
            this.initSocmed()
        })

    }

    onUpdateSocmedConfirm() {
        const data: SocialMediaUpdateReq = {
            socialMediaId: this.updateSocmed.value.socialMediaId!,
            platformName: this.updateSocmed.value.platformName!,
            ver: this.updateSocmed.value.ver!,
            isActive: this.updateSocmed.value.active!
        }
        this.socmedUpdate$ = this.socmedService.updateSocmedAdmin(data).subscribe(res => {
            alert('Update Socmed Success')
            this.initSocmed()
        })
    }
    onDeleteSocmed(socmed: SocialMediaGetRes) {
        console.log("delete")
        this.socmedDelete$ = this.socmedService.deleteSocmedAdmin(socmed.socialMediaId).subscribe(res => {
            alert('Delete Success')
            this.initSocmed()
        })
    }

    ngOnInit(): void {
        this.initSocmed()
    }

    initSocmed(): void {
        this.socmeds$ = this.socmedService.getAllSocmed().subscribe(res => {
            this.getAllSocmed = res
        })
    }

    ngOnDestroy(): void {
        this.socmeds$?.unsubscribe()
        this.socmedUpdate$?.unsubscribe()
    }

}