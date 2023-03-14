import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BASE_URL } from "../constant/base.service";
import { ArticleReq } from "@pojo/article/article-req";
import { ArticleRes } from "@pojo/article/article-res";
import { res } from "@pojo/res";
import { ResInsert } from "@pojo/res-insert";
import { UpdateRes } from "@pojo/res-update";
import { ArticleUpdateReq } from "@pojo/article/article-update-req";

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