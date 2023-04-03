import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SalesSettingRes } from "@dto/sales-seting/sales-setting-res";
import { Observable } from "rxjs";
import { BASE_URL } from "../constant/base.service";

@Injectable({
    providedIn : 'root'
})

export class SalesSettingService{

    constructor(private http: HttpClient){}

    getSalesSetting() : Observable<SalesSettingRes>{
        return this.http.get<SalesSettingRes>(`${BASE_URL}/admin/sales-settings`)
    } 

}