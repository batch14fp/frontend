import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BASE_URL } from "../constant/base.service";
import { AllPostByTypeRes } from "../dto/post/all-post-by-type-res";
import { AllPostRes } from "../dto/post/all-post-res";
import { LikeInsertReq } from "../dto/post/like-insert-req";
import { PostBookmarkReq } from "../dto/post/post-bookmark-req";
import { PostReq } from "../dto/post/post-req";
import { PostRes } from "../dto/post/post-res";
import { PostUpdateReq } from "../dto/post/post-update-req";
import { res } from "../dto/res";
import { ResInsert } from "../dto/res-insert";
import { UpdateRes } from "../dto/res-update";

@Injectable({
    providedIn : 'root'
})

export class PostService{

    constructor(private http : HttpClient){}

    getAllPost(): Observable<AllPostRes[]>{
        return this.http.get<AllPostRes[]>(`${BASE_URL}/posts`)
    }

    getActivity(id:number): Observable<AllPostByTypeRes[]>{
        return this.http.get<AllPostByTypeRes[]>(`${BASE_URL}/posts/${id}`)
    }

    insertPost(data : PostReq): Observable<ResInsert>{
        return this.http.post<ResInsert>(`${BASE_URL}/posts`,data)
    }
    
    insertPostLike(data : LikeInsertReq) : Observable<ResInsert>{
        return this.http.post<ResInsert>(`${BASE_URL}/posts/like`,data)
    }

    insertPostBookmark(data : PostBookmarkReq) : Observable<ResInsert>{
        return this.http.post<ResInsert>(`${BASE_URL}/posts/bookmark`,data)
    }

    updatePost(data : PostUpdateReq) : Observable<UpdateRes>{
        return this.http.put<UpdateRes>(`${BASE_URL}/posts`,data)
    }

    deletePost(id : string): Observable<res>{
        return this.http.delete<res>(`${BASE_URL}/posts/${id}`)
    }

    deletePostLike(id : string): Observable<res>{
        return this.http.delete<res>(`${BASE_URL}/posts/like/${id}`)
    }

    deletePostBookmaek(id : string): Observable<res>{
        return this.http.delete<res>(`${BASE_URL}/posts/bookmark/${id}`)
    }
    
}