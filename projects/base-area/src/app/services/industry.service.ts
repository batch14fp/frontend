import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IndustryUpdateReq } from "@dto/industry/industry-update-req";
import { res } from "@dto/res";
import { UpdateRes } from "@dto/res-update";
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

    getAllIndustry() : Observable<IndustryRes[]>{
        return this.http.get<IndustryRes[]>(`${BASE_URL}/industries`, {
          headers: {
            skip: "true"
          }
        })
    }

    insertIndustry(data : IndustryReq) : Observable<ResInsert>{
        return this.http.post<ResInsert>(`${BASE_URL}/industries`,data)
    }

    updateIndustry(data:IndustryUpdateReq):Observable<UpdateRes>{
        return this.http.put<UpdateRes>(`${BASE_URL}/industries`, data)
    }
    deleteIndustry(id:string):Observable<res>{
        return this.http.delete<res>(`${BASE_URL}/industries/${id}`)
    }
}
