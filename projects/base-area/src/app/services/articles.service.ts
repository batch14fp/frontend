import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BASE_URL } from "../constant/base.service";
import { ArticleReq } from "../dto/article/article-req";
import { ArticleRes } from "../dto/article/article-res";
import { ArticleUpdateReq } from "../dto/article/article-update-req";
import { res } from "../dto/res";
import { ResInsert } from "../dto/res-insert";
import { UpdateRes } from "../dto/res-update";

@Injectable({
    providedIn : 'root'
})

export class ArticlesService {

    constructor(private http : HttpClient){}

    getAllArticle() : Observable<ArticleRes[]>{
        return this.http.get<ArticleRes[]>(`${BASE_URL}/articles`)
    }

    // getArticleDtl

    insertArticle(data : ArticleReq) : Observable<ResInsert>{
        return this.http.post<ResInsert>(`${BASE_URL}/articles`, data)
    }

    updateArticle(data : ArticleUpdateReq) : Observable<UpdateRes>{
        return this.http.put<UpdateRes>(`${BASE_URL}/articles`,data)
    }

    deleteArticle(id : string) : Observable<res>{
        return this.http.delete<res>(`${BASE_URL}/articles/${id}`)
    }
}