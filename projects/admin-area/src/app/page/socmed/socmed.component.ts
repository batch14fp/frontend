import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
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

    constructor(private fb: FormBuilder, private title: Title, private socmedService: SocmedService,
        private router: Router) {
        this.title.setTitle('Social Media')
    }

    ngOnInit(): void {
        this.socmeds$ = this.socmedService.getAllSocmed().subscribe(res => {
            this.getAllSocmed = res
        })
    }

    ngOnDestroy(): void {
        throw new Error("Method not implemented.");
    }
  
    
}