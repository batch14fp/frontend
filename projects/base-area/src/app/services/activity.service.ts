import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivityUpdateReq } from "@dto/activity/activity-update-req";
import { UserPaymentReqUpdate } from "@dto/payment/user-payment-req-update";
import { UpdateRes } from "@dto/res-update";
import { ActivityVoucherRes } from "@dto/voucher/activity-voucher-res";
import { VoucherAppliedRes } from "@dto/voucher/voucher-applied-res";
import { VoucherAppliedReq } from "@dto/voucher/vourcher-applied-req";
import { CountMemberRes } from "@dto/report/count-member-res";
import { Observable } from "rxjs";
import { BASE_URL } from "../constant/base.service";
import { ActivityReq } from "../dto/activity/activity-req";
import { ActivityRes } from "../dto/activity/activity-res";
import { res } from "../dto/res";
import { ResInsert } from "../dto/res-insert";

@Injectable({
    providedIn : 'root'
})

export class ActivityService{

    constructor(private http : HttpClient){}

    getAllActivity(page: number, size: number, activityTypes?:string, categories?:string) : Observable<ActivityRes[]>{
        if(activityTypes == null){
            return this.http.get<ActivityRes[]>(`${BASE_URL}/activities?page=${page}&size=${size}`)
        }else if(categories == null){
            return this.http.get<ActivityRes[]>(`${BASE_URL}/activities/filter?page=${page}&size=${size}&typeCode=${activityTypes}`)
        }else{
            return this.http.get<ActivityRes[]>(`${BASE_URL}/activities/filter?page=${page}&size=${size}&typeCode=${activityTypes}&categoryCode=${categories}`)
        }
    }

    getActivity(id: string) : Observable<ActivityRes>{
        return this.http.get<ActivityRes>(`${BASE_URL}/activities/${id}`)
    }


    insertActivity(data : ActivityReq) : Observable<ResInsert>{
        return this.http.post<ResInsert>(`${BASE_URL}/activities/`,data)
    }

    deleteActivity(id : string) : Observable<res>{
        return this.http.delete<res>(`${BASE_URL}/activities/${id}`)
    }


    updateActivity(data:ActivityUpdateReq):Observable<UpdateRes>{
        return this.http.put<UpdateRes>(`${BASE_URL}/activities`,data)
    }

    getPayment(data:UserPaymentReqUpdate):Observable<UpdateRes>{
        return this.http.put<UpdateRes>(`${BASE_URL}/activities/payment`,data)
    }

    getListVoucher():Observable<ActivityVoucherRes>{
        return this.http.get<ActivityVoucherRes>(`${BASE_URL}/activities/vouchers-list`)
    }

    setVoucherCode(data:VoucherAppliedReq):Observable<VoucherAppliedRes>{
        return this.http.post<VoucherAppliedRes>(`${BASE_URL}/activities/voucher/applied`, data)

    }
    getDataActivity() : Observable<CountMemberRes>{
        return this.http.get<CountMemberRes>(`${BASE_URL}/activities/total`)

    }
}
