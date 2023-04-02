import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ResInsert } from "@dto/res-insert";
import { SignUpReqInsert } from "@dto/user/sign-up-req-insert";
import { Observable } from "rxjs";
import { BASE_URL } from "../constant/base.service";

@Injectable({
    providedIn : 'root'
})

export class AdminService {

    constructor(private http : HttpClient){}

    insertUserAdmin(data : SignUpReqInsert) : Observable<ResInsert>{
        return this.http.post<ResInsert>(`${BASE_URL}/admin/user`, data)
    }
}