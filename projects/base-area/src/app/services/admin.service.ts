import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ResInsert } from "@dto/res-insert";
import { SignUpReqInsert } from "@dto/user/sign-up-req-insert";
import { PaymentDetailResData } from "@dto/payment/payment-detail-res";
import { PaymentReqUpdate } from "@dto/payment/payment-req-update";
import { UpdateRes } from "@dto/res-update";
import { Observable, ObservableNotification } from "rxjs";
import { BASE_URL } from "../constant/base.service";

@Injectable({
    providedIn : 'root'
})

export class AdminService {

    constructor(private http : HttpClient){}


    insertUserAdmin(data : SignUpReqInsert) : Observable<ResInsert>{
        return this.http.post<ResInsert>(`${BASE_URL}/admin/users`, data)
    }
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
    getFileReceipt(fileId?:string){
        return this.http.get<PaymentDetailResData[]>(`${BASE_URL}/files/${fileId}`)
    }

}