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
import { PostCommentInsertReq } from '../dto/post/post-comment-insert-req';
import { PostCommentRes } from '../dto/post/all-post-comment-res';
import { PostCommentReqUpdate } from '../dto/post/post-comment-req-update';

@Injectable({
    providedIn : 'root'
})

export class PostService{

    constructor(private http : HttpClient){}

    getAllPost(page:number, size:number): Observable<AllPostRes[]>{
        return this.http.get<AllPostRes[]>(`${BASE_URL}/posts?page=${page}&size=${size}`)
    }

    getPostById(postId: string): Observable<AllPostRes>{
        return this.http.get<AllPostRes>(`${BASE_URL}/posts/${postId}`)
    }

    getAllCommentByPostId(id:string, page:number, size:number): Observable<PostCommentRes[]>{
        return this.http.get<PostCommentRes[]>(`${BASE_URL}/posts/${id}/comment?page=${page}&size=${size}`)
    }

    getActivity(id:number): Observable<AllPostByTypeRes[]>{
        return this.http.get<AllPostByTypeRes[]>(`${BASE_URL}/posts/${id}`)
    }

    insertPost(data : PostReq): Observable<ResInsert>{
        return this.http.post<ResInsert>(`${BASE_URL}/posts`,data)
    }

    insertComment(data : PostCommentInsertReq): Observable<ResInsert>{
        return this.http.post<ResInsert>(`${BASE_URL}/posts/comment`,data)
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

    updateComment(data : PostCommentReqUpdate) : Observable<UpdateRes>{
        return this.http.put<UpdateRes>(`${BASE_URL}/posts/comment`,data)
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
    deletePostComment(id : string): Observable<res>{
        return this.http.delete<res>(`${BASE_URL}/posts/comment/${id}`)
    }

}
