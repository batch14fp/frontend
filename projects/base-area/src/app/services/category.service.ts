import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CategoryUpdateReq } from "@dto/category/category-update-req";
import { res } from "@dto/res";
import { UpdateRes } from "@dto/res-update";
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

    updateCategory(data:CategoryUpdateReq):Observable<UpdateRes>{
        return this.http.put<UpdateRes>(`${BASE_URL}/categories`, data)
    }

    deleteCategory(id:string):Observable<any>{
        return this.http.delete<any>(`${BASE_URL}/categories/${id}`)
    }
}
