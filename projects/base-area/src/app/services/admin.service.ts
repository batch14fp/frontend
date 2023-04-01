import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PaymentDetailResData } from "@dto/payment/payment-detail-res";
import { PaymentReqUpdate } from "@dto/payment/payment-req-update";
import { UpdateRes } from "@dto/res-update";
import { Observable } from "rxjs";
import { BASE_URL } from "../constant/base.service";

@Injectable({
    providedIn : 'root'
})

export class AdminService {

    constructor(private http : HttpClient){}

    getAllTransaction(limit?:number,offset?:number,isPaid?:boolean): Observable<PaymentDetailResData[]>{
        if(isPaid == null){
            return this.http.get<PaymentDetailResData[]>(`${BASE_URL}/admin/payments?limit=${limit}&offset=${offset}`)
        }else if(isPaid == true){
            return this.http.get<PaymentDetailResData[]>(`${BASE_URL}/admin/payments?isPaid=true&limit=${limit}&offset=${offset}`)
        }else{
            return this.http.get<PaymentDetailResData[]>(`${BASE_URL}/admin/payments?isPaid=false&limit=${limit}&offset=${offset}`)
        }
    }

    updatePayment(data:PaymentReqUpdate):Observable<UpdateRes>{
        return this.http.put<UpdateRes>(`${BASE_URL}/admin/payments`, data)
    }

    
}