import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { res } from "@dto/res";
import { Observable } from "rxjs";
import { BASE_URL } from "../constant/base.service";
import { PostTypeReq } from "../dto/posttype/post-type-req";
import { PostTypeGetRes } from "../dto/posttype/post-type-res";
import { PostTypeUpdateReq } from "../dto/posttype/post-type-update-req";
import { ResInsert } from "../dto/res-insert";
import { UpdateRes } from "../dto/res-update";

@Injectable({
    providedIn : 'root'
})

export class PostTypeService{

    constructor(private http : HttpClient){}

    getAllPostType() : Observable<PostTypeGetRes[]>{
        return this.http.get<PostTypeGetRes[]>(`${BASE_URL}/posts/post-types`)
    }

    insertPostType(data : PostTypeReq) : Observable<ResInsert>{
        return this.http.post<ResInsert>(`${BASE_URL}/admin/post-types`,data)
    }

    updatePostType(data : PostTypeUpdateReq) : Observable<UpdateRes>{
        return this.http.put<UpdateRes>(`${BASE_URL}/admin/post-types`,data)
    }

    deletePostType(id : string) : Observable<res>{
        return this.http.delete<res>(`${BASE_URL}/admin/post-types/${id}`)
    }

}