import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { BASE_URL } from "../constant/base.service";
import { ArticleReq } from "@dto/article/article-req";
import { ArticleRes } from "@dto/article/article-res";
import { res } from "@dto/res";
import { ResInsert } from "@dto/res-insert";
import { UpdateRes } from "@dto/res-update";
import { ArticleUpdateReq } from "@dto/article/article-update-req";
import { ArticleResData } from "@dto/article/article-res-data";

@Injectable({
    providedIn : 'root'
})

export class ArticlesService {

    constructor(private http : HttpClient){}

    getAllArticle(startPage: number, maxPage: number, query?: string) : Observable<ArticleRes[]>{
        return this.http.get<ArticleRes[]>(`${BASE_URL}/articles?page=${startPage}&size=${maxPage}`)
    }

    // member 
    getAllByMostViewer(startPage: number, maxPage : number, query?: string) : Observable<ArticleResData[]>{
        return this.http.get<ArticleResData[]>(`${BASE_URL}/articles/most-viewer?page=${startPage}&size=${maxPage}`)
    }

    getArticleIdForMember(id : string) : Observable<ArticleResData>{
        return this.http.get<ArticleResData>(`${BASE_URL}/articles/member/${id}`)
    }

    getAll(startPage: number, maxPage : number, query?: string) : Observable<ArticleResData[]>{
        return this.http.get<ArticleResData[]>(`${BASE_URL}/articles/?page=${startPage}&size=${maxPage}`)
    }
    // 

    insertArticle(data : ArticleReq) : Observable<ResInsert>{
        return this.http.post<ResInsert>(`${BASE_URL}/articles`, data)
    }

    updateArticle(data : ArticleUpdateReq) : Observable<UpdateRes>{
        return this.http.put<UpdateRes>(`${BASE_URL}/articles`,data)
    }

    deleteArticle(id : string) : Observable<res>{
        return this.http.delete<res>(`${BASE_URL}/articles/${id}`)
    }

    getArticleByIdForAdmin(id:string):Observable<ArticleResData>{
        return this.http.get<ArticleResData>(`${BASE_URL}/articles/admin/${id}`)
    }
}