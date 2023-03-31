import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { InvoiceRes } from "@dto/invoice/invoice-res";
import { MemberPremiumRes } from "@dto/memberstatus/member-premium-res";
import { MemberStatusRes } from "@dto/memberstatus/member-status-res";
import { MembershipPaymentReq } from "@dto/payment/member-pay-req";
import { Observable } from "rxjs";
import { BASE_URL } from "../constant/base.service";
import { MemberStatusReq } from "../dto/memberstatus/member-status-req";
import { res } from "../dto/res";
import { ResInsert } from "../dto/res-insert";
import { UpdateRes } from "../dto/res-update";

@Injectable({
    providedIn : 'root'
}) 

export class MemberStatusService{

    constructor(private http : HttpClient ){}

    getAllMemberStatus():Observable<MemberStatusRes[]>{
        return this.http.get<MemberStatusRes[]>(`${BASE_URL}/members/status`)
    }

    insertMemberStatus(data : MemberStatusReq) : Observable<ResInsert>{
        return this.http.post<ResInsert>(`${BASE_URL}/members/status`,data)
    }

    updateMemberStatus(data : MemberStatusReq) : Observable<UpdateRes>{
        return this.http.put<UpdateRes>(`${BASE_URL}/members/status`,data)
    }

    deleteMemberStatus(id : string) : Observable<res>{
        return this.http.delete<res>(`${BASE_URL}/members/status/${id}`)
    }

    subscribtionMembership(data : MembershipPaymentReq) : Observable<InvoiceRes>{
        return this.http.post<InvoiceRes>(`${BASE_URL}/members/status/subscription`,data)
    }

    getIsPremiumMemberStatus() : Observable<MemberPremiumRes>{
        return this.http.get<MemberPremiumRes>(`${BASE_URL}/members/is-premium`)
    }
}