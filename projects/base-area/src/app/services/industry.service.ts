import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BASE_URL } from "../constant/base.service";
import { IndustryReq } from "../dto/industry/industry-req";
import { IndustryRes } from "../dto/industry/industry-res";
import { ResInsert } from "../dto/res-insert";

@Injectable({
    providedIn : "root"
})

export class IndustryService{

    constructor(private http : HttpClient){}

    getIndustry() : Observable<IndustryRes[]>{
        return this.http.get<IndustryRes[]>(`${BASE_URL}/industries`)
    }

    insertIndustry(data : IndustryReq) : Observable<ResInsert>{
        return this.http.post<ResInsert>(`${BASE_URL}/industries`,data)
    }
}