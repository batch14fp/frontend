import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BASE_URL } from "../constant/base.service";
import { CategoryReq } from "../dto/category/category-req";
import { CategoryRes } from "../dto/category/category-res";
import { ResInsert } from "../dto/res-insert";

@Injectable({
    providedIn : "root"
})

export class CategoryService{

    constructor(private http: HttpClient){}

    getAllCategory(): Observable<CategoryRes[]>{
        return this.http.get<CategoryRes[]>(`${BASE_URL}/categories`)
    }

    insertCategory(data : CategoryReq) : Observable<ResInsert>{
        return this.http.post<ResInsert>(`${BASE_URL}/categories`,data)
    }
}
