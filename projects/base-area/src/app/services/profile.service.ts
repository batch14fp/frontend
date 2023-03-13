import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BASE_URL } from "../constant/base.service";
import { ResInsert } from "../dto/res-insert";
import { PasswordReqUpdate } from "../dto/user/profile/password-req-update";
import { PasswordResUpdate } from "../dto/user/profile/password-res-update";
import { ProfileReqUpdate } from "../dto/user/profile/profile-req-update";
import { ProfileResDetail } from "../dto/user/profile/profile-res-detail";

@Injectable({
    providedIn : "root"
})

export class ProfileService{

    constructor(private http : HttpClient){}

    getProfileDetail(id : number) : Observable<ProfileResDetail[]>{
        return this.http.get<ProfileResDetail[]>(`${BASE_URL}/profiles/${id}`)
    }

    updateProfile(data : ProfileReqUpdate) : Observable<ProfileReqUpdate>{
        return this.http.put<ProfileReqUpdate>(`${BASE_URL}/profiles/edit`,data)
    }

    updatePass(data : PasswordReqUpdate) : Observable<PasswordResUpdate>{
        return this.http.put<PasswordResUpdate>(`${BASE_URL}/profiles/password`,data)
    }
}