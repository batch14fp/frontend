import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BASE_URL } from "../constant/base.service";
import { ActivityTypeReq } from "../dto/activitytype/activity-type-req";
import { ActivityTypeRes } from "../dto/activitytype/activity-type-res";
import { ActivityTypeUpdateReq } from "../dto/activitytype/activity-type-update-req";
import { res } from "../dto/res";
import { ResInsert } from "../dto/res-insert";
import { UpdateRes } from "../dto/res-update";

@Injectable({
    providedIn : 'root'
})

export class ActivityTypeService{
    constructor(private http : HttpClient){}

    getAllActivityType() : Observable<ActivityTypeRes[]>{
        return this.http.get<ActivityTypeRes[]>(`${BASE_URL}/admin/activity-types`)
    }
    insertActivityType(data :ActivityTypeReq) : Observable<ResInsert>{
        return this.http.post<ResInsert>(`${BASE_URL}/admin/activity-types`,data)
    }

    updateActivityType(data : ActivityTypeUpdateReq) : Observable<UpdateRes>{
        return this.http.put<UpdateRes>(`${BASE_URL}/admin/activity-types`,data)
    }

    deleteActivityType(id : string) : Observable<res>{
        return this.http.delete<res>(`${BASE_URL}/admin/activity-types/${id}`)
    }
}
