import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BASE_URL } from "../constant/base.service";
import { AllPostByTypeRes } from "../dto/post/all-post-by-type-res";
import { AllPostRes } from "../dto/post/all-post-res";
import { PostReq } from "../dto/post/post-req";
import { PostRes } from "../dto/post/post-res";

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


    // insertPost(data : PostReq): Observable<>
    
}