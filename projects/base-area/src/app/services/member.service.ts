import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BASE_URL } from "../constant/base.service";
import { MemberStatusReq } from "../dto/memberstatus/member-status-req";
import { res } from "../dto/res";
import { ResInsert } from "../dto/res-insert";
import { UpdateRes } from "../dto/res-update";

@Injectable({
    providedIn : 'root'
}) 

export class MemberStatus{

    constructor(private http : HttpClient ){}

    insertMemberStatus(data : MemberStatusReq) : Observable<ResInsert>{
        return this.http.post<ResInsert>(`${BASE_URL}/members/status`,data)
    }

    updateMemberStatus(data : MemberStatusReq) : Observable<UpdateRes>{
        return this.http.put<UpdateRes>(`${BASE_URL}/members/status`,data)
    }

    deleteMemberStatus(id : string) : Observable<res>{
        return this.http.delete<res>(`${BASE_URL}/members/status/${id}`)
    }
}