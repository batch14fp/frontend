import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { IndustryRes } from "@dto/industry/industry-res";
import { PositionRes } from "@dto/position/postion-res";
import { SignUpReqInsert } from "@dto/user/sign-up-req-insert";
import { AdminService } from "@service/admin.service";
import { IndustryService } from "@service/industry.service";
import { PositionService } from "@service/position.service";
import { convertLocalDateToUTCISO, convertUTCToLocalDateISO } from "projects/base-area/src/app/utils/dateutil";
import { Subscription } from "rxjs";

@Component({
    selector : 'app-create-user',
    templateUrl : 'create-user.component.html'
})

export class CreateUserComponent implements OnInit, OnDestroy{

    position : PositionRes[] = []
    industry : IndustryRes[] = []

    position$? : Subscription
    industry$? : Subscription

    createAdm$? : Subscription
    
    constructor(
        private fb : FormBuilder,
        private title : Title,
        private positionService : PositionService,
        private industryService : IndustryService,
        private adminService : AdminService,
        private router : Router
    ){
        this.title.setTitle('New User Admin')
    }

    createUser = this.fb.group({
        email : ["", Validators.email],
        password : [""],
        fullname : [""],
        phoneNumber : [""],
        company : [""],
        industryId : [""],
        positionId : [""],
    })


    onCreate(){
        const data : SignUpReqInsert  = {
            email : this.createUser.value.email!,
            password : this.createUser.value.password!,
            fullName : this.createUser.value.fullname!,
            phoneNumber : this.createUser.value.phoneNumber!,
            company : this.createUser.value.company!,
            industryId : this.createUser.value.industryId!,
            positionId : this.createUser.value.positionId!,
        }

        this.createAdm$ = this.adminService.insertUserAdmin(data).subscribe(res=>{
            this.router.navigateByUrl('/user')
        })


    }

    initPosition(){
        this.position$ = this.positionService.getAllPosition().subscribe(res=>{
            this.position = res
        })
    }

    initIndustry(){
        this.industry$ = this.industryService.getAllIndustry().subscribe(res=>{
            this.industry = res
        })
    }

    ngOnInit(): void {
       this.initPosition()
       this.initIndustry()
    }
    ngOnDestroy(): void {
        this.position$?.unsubscribe()
        this.industry$?.unsubscribe()
    }

}