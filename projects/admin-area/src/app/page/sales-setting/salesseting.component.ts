import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { SalesSettingRes } from "@dto/sales-seting/sales-setting-res";
import { SalesSettingService } from "@service/salessetting.service";
import { Subscription } from "rxjs";

@Component({
    selector : 'app-setting',
    templateUrl : 'salesseting.component.html'
})

export class SalesSettingComponent implements OnInit, OnDestroy{
    private salesSetting$?:Subscription
    getSalesSettings : SalesSettingRes[] = []
    constructor(private fb: FormBuilder,private title : Title, private salesSettingService:SalesSettingService,
        private router:Router){}

    initSalesSettings():void{
        this.salesSetting$ = this.salesSettingService.getSalesSetting().subscribe(res=>{
            this.getSalesSettings.push(res)
        })
    }

    ngOnInit(): void {
        this.initSalesSettings()
    }

    ngOnDestroy(): void {
      this.salesSetting$?.unsubscribe()
    }
}