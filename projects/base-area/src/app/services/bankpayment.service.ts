import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BASE_URL } from "../constant/base.service";
import { BankPaymentReq } from "../dto/bankpayment/bank-payment-req";
import { BankPaymentRes } from "../dto/bankpayment/bank-payment-res";
import { BankPaymentUpdateReq } from "../dto/bankpayment/bank-payment-update-req";
import { res } from "../dto/res";
import { ResInsert } from "../dto/res-insert";
import { UpdateRes } from "../dto/res-update";

@Injectable({
    providedIn : 'root'
})

export class BankPaymentService{

    constructor(private http : HttpClient){}
    getAdminBankPayment() : Observable<BankPaymentRes[]>{
        return this.http.get<BankPaymentRes[]>(`${BASE_URL}/admin/bank-payments`)
    }

 
    insertBankPayment(data : BankPaymentReq) : Observable<ResInsert>{
        return this.http.post<ResInsert>(`${BASE_URL}/admin/bank-payments`,data)
    }

    updateBankPayment(data : BankPaymentUpdateReq) : Observable<UpdateRes>{
        return this.http.put<UpdateRes>(`${BASE_URL}/admin/bank-payments`,data)
    }

    deleteBankPayment(id : string) : Observable<res>{
        return this.http.delete<res>(`${BASE_URL}/admin/bank-payments/${id}`)
    }
    getAllBankPayment() : Observable<BankPaymentRes[]>{
        return this.http.get<BankPaymentRes[]>(`${BASE_URL}/activities/bank-payments`)
    }
  

}
