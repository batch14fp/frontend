import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BASE_URL } from "../constant/base.service";
import { PollingInsertReq } from "../dto/post/polling-insert-req";
import { PollingUpdateReq } from "../dto/post/polling-update-req";
import { res } from "../dto/res";
import { ResInsert } from "../dto/res-insert";
import { UpdateRes } from "../dto/res-update";

@Injectable({
    providedIn : 'root'
})

export class PollingsService {

    constructor(private http : HttpClient){}

    insertPolling(data : PollingInsertReq) : Observable<ResInsert>{
        return this.http.post<ResInsert>(`${BASE_URL}/pollings`,data)
    }

    updatePolling(data : PollingUpdateReq) : Observable<UpdateRes>{
        return this.http.put<UpdateRes>(`${BASE_URL}/pollings`,data)
    }

    deletePolling(id : string) : Observable<res>{
        return this.http.delete<res>(`${BASE_URL}/pollings/${id}`)
    }
}