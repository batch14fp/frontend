import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PositionUpdateReq } from "@dto/position/position-update-req";
import { UpdateRes } from "@dto/res-update";
import { Observable } from "rxjs";
import { BASE_URL } from "../constant/base.service";
import { PositionReq } from "../dto/position/position-req";
import { PositionRes } from "../dto/position/postion-res";
import { ResInsert } from "../dto/res-insert";

@Injectable({
    providedIn : 'root'
})

export class PositionService{

    constructor(private http : HttpClient){}

    getAllPosition(): Observable<PositionRes[]>{
        return this.http.get<PositionRes[]>(`${BASE_URL}/positions`)
    }

    insertPosition(data : PositionReq) : Observable<ResInsert>{
        return this.http.post<ResInsert>(`${BASE_URL}/positions`,data)
    }

    updatePosition(data:PositionUpdateReq):Observable<UpdateRes>{
        return this.http.put<UpdateRes>(`${BASE_URL}/positions`, data)
    }
    deletePosition(id:string):Observable<any>{
        return this.http.delete<any>(`${BASE_URL}/positions/${id}`)
    }
}
