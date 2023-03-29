import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { InvoiceReq } from "@dto/invoice/invoice-req";
import { InvoiceRes } from "@dto/invoice/invoice-res";
import { ResInsert } from "@dto/res-insert";
import { Observable } from "rxjs";
import { BASE_URL } from "../constant/base.service";

@Injectable({
    providedIn:'root'
})

export class InvoiceService{
    constructor(private http:HttpClient){}
    
    getInvoiceId(id:string):Observable<InvoiceRes>{
        return this.http.get<InvoiceRes>(`${BASE_URL}/invoices/${id}`)
    }

    insertInvoice(data: InvoiceReq):Observable<ResInsert>{
        return this.http.post<ResInsert>(`${BASE_URL}/invoices`,data)
    }
}