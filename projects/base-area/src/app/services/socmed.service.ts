import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { res } from "@dto/res";
import { ResInsert } from "@dto/res-insert";
import { UpdateRes } from "@dto/res-update";
import { SocialMediaAdminReq } from "@dto/socialmedia/social-media-admin-req";
import { SocialMediaUpdateReq } from "@dto/socialmedia/social-media-admin-update-req";
import { SocialMediaGetRes } from "@dto/socialmedia/social-media-res";
import { Observable } from "rxjs";
import { BASE_URL } from "../constant/base.service";

@Injectable({
    providedIn : 'root'
})

export class SocmedService{
    constructor(private http : HttpClient){}

    getAllSocmed(): Observable<SocialMediaGetRes[]>{
        return this.http.get<SocialMediaGetRes[]>(`${BASE_URL}/admin/social-media`)
    }

    insertSocmedAdmin(data : SocialMediaAdminReq) : Observable<ResInsert>{
        return this.http.post<ResInsert>(`${BASE_URL}/admin/social-media`,data)
    }

    updateSocmedAdmin(data:SocialMediaUpdateReq):Observable<UpdateRes>{
        return this.http.put<UpdateRes>(`${BASE_URL}/admin/social-media`, data)
    }
    deleteSocmedAdmin(id:string):Observable<res>{
        return this.http.delete<res>(`${BASE_URL}/admin/social-media/${id}`)
    }

}