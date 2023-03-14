import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BASE_URL } from "../constant/base.service";
import { BankPaymentReq } from "../dto/bankpayemnt/bank-payment-req";
import { BankPaymentRes } from "../dto/bankpayemnt/bank-payment-res";
import { BankPaymentUpdateReq } from "../dto/bankpayemnt/bank-payment-update-req";
import { res } from "../dto/res";
import { ResInsert } from "../dto/res-insert";
import { UpdateRes } from "../dto/res-update";

@Injectable({
    providedIn : 'root'
})

export class BankPaymentService{

    constructor(private http : HttpClient){}

    getAllBankPayment() : Observable<BankPaymentRes[]>{
        return this.http.get<BankPaymentRes[]>(`${BASE_URL}/bank-payments`)
    }

    insertBankPayment(data : BankPaymentReq) : Observable<ResInsert>{
        return this.http.post<ResInsert>(`${BASE_URL}/bank-payments`,data)
    } 

    updateBankPayment(data : BankPaymentUpdateReq) : Observable<UpdateRes>{
        return this.http.put<UpdateRes>(`${BASE_URL}/bank-payments`,data)
    }

    deleteBankPayment(id : string) : Observable<res>{
        return this.http.delete<res>(`${BASE_URL}/bank-payments/${id}`)
    }
}