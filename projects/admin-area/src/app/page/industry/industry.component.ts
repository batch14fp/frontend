import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { IndustryReq } from "projects/base-area/src/app/dto/industry/industry-req";
import { IndustryRes } from "projects/base-area/src/app/dto/industry/industry-res";
import { IndustryUpdateReq } from "projects/base-area/src/app/dto/industry/industry-update-req";
import { IndustryService } from "projects/base-area/src/app/services/industry.service";
import { Subscription } from "rxjs";

@Component({
    selector : 'app-industry',
    templateUrl : './industry.component.html'
})

export class IndustryComponent implements OnInit, OnDestroy{
    private industries$?:Subscription
    private industriesUpdate$?:Subscription
    private industriesDelete$?:Subscription

    getAllIndustry:IndustryRes[] = []

    displayResponsive!:boolean
    showResponsiveDialog(){
        this.displayResponsive = true
    }

    displayUpdate!:boolean
    showUpdateDialog(industry:IndustryRes){
        console.log(industry)
        this.updateIndustry.setValue({
            industryId:  industry.industryId,
            industryName:industry.industryName,
            active:industry.isActive,
            ver:industry.ver
        })
        this.displayUpdate = true
    }

    displayDelete!:boolean
    showDeleteDialog(){
        this.displayDelete = true
    }

    constructor(private fb: FormBuilder,private title : Title, private industryService:IndustryService,
        private router:Router){
        this.title.setTitle('industry')
    }

    createIndustry = this.fb.group({
        industryName:[""],
    })

    updateIndustry = this.fb.group({
        industryId:[""],
        industryName:[""],
        ver:[0],
        active:[true]
    })

    onCreateIndustry(){
        const data:IndustryReq = {
            industryName:this.createIndustry.value.industryName!,
        }
        this.industries$ = this.industryService.insertIndustry(data).subscribe(res=>{
            alert('Create industry success')
            this.initIndustry()
        })

    }

    onUpdateIndustryConfirm(){
        const data: IndustryUpdateReq = {
         industryId:this.updateIndustry.value.industryId!,
         industryName:this.updateIndustry.value.industryName!,
         ver:this.updateIndustry.value.ver!,
         isActive:this.updateIndustry.value.active!
        }
        
        this.industriesUpdate$ = this.industryService.updateIndustry(data).subscribe(res=>{
         alert('Update Industry Success')
         this.initIndustry()
        })
     }
     onDeleteIndustry(industries:IndustryRes){
        console.log("delete")
        this.industriesDelete$ = this.industryService.deleteIndustry(industries.industryId).subscribe(res=>{
            alert('Delete Success')
            this.initIndustry()
        })
    }

    ngOnDestroy(): void {
        this.industries$?.unsubscribe()
        this.industriesUpdate$?.unsubscribe()
    }

    initIndustry():void{
        this.industries$ = this.industryService.getAllIndustry().subscribe(res=>{
            this.getAllIndustry = res
           })
    }

    ngOnInit(): void {
        this.initIndustry()

    }
}