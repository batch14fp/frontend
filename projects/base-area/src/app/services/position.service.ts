import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
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

    getPosition(): Observable<PositionRes[]>{
        return this.http.get<PositionRes[]>(`${BASE_URL}/positions`) 
    }

    insertPosition(data : PositionReq) : Observable<ResInsert>{
        return this.http.post<ResInsert>(`${BASE_URL}/positions`,data)
    }
}