import { ACTIVITY_TYPE } from './../constant/activity-type';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivityUpdateReq } from "@dto/activity/activity-update-req";
import { UserPaymentReqUpdate } from "@dto/payment/user-payment-req-update";
import { UpdateRes } from "@dto/res-update";
import { ActivityVoucherRes } from "@dto/voucher/activity-voucher-res";
import { VoucherAppliedRes } from "@dto/voucher/voucher-applied-res";
import { VoucherAppliedReq } from "@dto/voucher/vourcher-applied-req";
import { CountMemberRes } from "@dto/report/count-member-res";
import { Observable } from "rxjs";
import { BASE_URL } from "../constant/base.service";
import { ActivityReq } from "../dto/activity/activity-req";
import { ActivityRes } from "../dto/activity/activity-res";
import { res } from "../dto/res";
import { ResInsert } from "../dto/res-insert";
import { ActivityUpcomingAllRes } from '../dto/activity/activity-upcoming-all-res';
import { ActivityMemberRes } from "@dto/report/activity-member-res";
import { ActivityAdminRes } from "@dto/report/activity-admin-res";
import { IncomesMemberRes } from '@dto/report/incomes-member-res';
import { IncomesAdminRes } from '@dto/report/incomes-admin-res';
import { PaymentDetailRes } from '@dto/payment/payment-detail-res-data';
import { PaymentDetailResData } from '@dto/payment/payment-detail-res';
import { BankPaymentRes } from '@dto/bankpayment/bank-payment-res';
import { ActivityTypeRes } from '@dto/activitytype/activity-type-res';
import { MembershipPaymentReq } from '@dto/payment/member-pay-req';
import { InvoiceRes } from '@dto/invoice/invoice-res';


@Injectable({
    providedIn : 'root'
})

export class ActivityService{

    constructor(private http : HttpClient){}

    getAllActivity(page: number, size: number, activityTypes?:string, sortType?:string, categories?:string) : Observable<ActivityRes[]>{
        if(activityTypes == null&& sortType ==null){
            return this.http.get<ActivityRes[]>(`${BASE_URL}/activities?page=${page}&size=${size}`)
        }else if(categories == null && sortType ==null){
            return this.http.get<ActivityRes[]>(`${BASE_URL}/activities/filter?page=${page}&size=${size}&typeCode=${activityTypes}`)
        }
        else if(activityTypes == null){
            return this.http.get<ActivityRes[]>(`${BASE_URL}/activities?page=${page}&size=${size}&sortType=${sortType}`)
        }
        else if(categories == null){
            return this.http.get<ActivityRes[]>(`${BASE_URL}/activities/filter?page=${page}&size=${size}&typeCode=${activityTypes}&sortType=${sortType}`)
        }
        else{
            return this.http.get<ActivityRes[]>(`${BASE_URL}/activities/filter?page=${page}&size=${size}&typeCode=${activityTypes}&categoryCode=${categories}&sortType=${sortType}`)
        }
    }

    getAllActivityByCategories(page: number, size: number, activityTypes?:string,sortType?:string, categories?:string[]):Observable<ActivityRes[]>{
        let categoryCode:string = ''
       
        for(let i = 0; i<categories?.length!; i++){
            categoryCode = categoryCode + '&categoryCodes=' +categories![i]
        }
   if(sortType ==null){
        return this.http.get<ActivityRes[]>(`${BASE_URL}/activities/by-category-List?typeCode=${activityTypes}&page=${page}&size=${size}${categoryCode}`)
   }
else{
    return this.http.get<ActivityRes[]>(`${BASE_URL}/activities/by-category-List?typeCode=${activityTypes}&page=${page}&size=${size}${categoryCode}&sortType=${sortType}`)
}

    }

    getActivity(id: string) : Observable<ActivityRes>{
        return this.http.get<ActivityRes>(`${BASE_URL}/activities/${id}`)
    }

    getUpcomingEvent(page:number, size:number) : Observable<ActivityUpcomingAllRes>{
        return this.http.get<ActivityUpcomingAllRes>(`${BASE_URL}/activities/upcoming?page=${page}&size=${size}&typeCode=${ACTIVITY_TYPE.EVENT}`)
    }


    insertActivity(data : ActivityReq) : Observable<ResInsert>{
        return this.http.post<ResInsert>(`${BASE_URL}/activities/`,data)
    }

    deleteActivity(id : string) : Observable<res>{
        return this.http.delete<res>(`${BASE_URL}/activities/${id}`)
    }


    updateActivity(data:ActivityUpdateReq):Observable<UpdateRes>{
        return this.http.put<UpdateRes>(`${BASE_URL}/activities`,data)
    }

    getPayment(data:UserPaymentReqUpdate):Observable<UpdateRes>{
        return this.http.put<UpdateRes>(`${BASE_URL}/activities/payment`,data)
    }

    getListVoucher():Observable<ActivityVoucherRes>{
        return this.http.get<ActivityVoucherRes>(`${BASE_URL}/activities/vouchers-list`)
    }

    setVoucherCode(data:VoucherAppliedReq):Observable<VoucherAppliedRes>{
        return this.http.post<VoucherAppliedRes>(`${BASE_URL}/activities/voucher/applied`, data)

    }

    


    getDataActivity() : Observable<CountMemberRes>{
        return this.http.get<CountMemberRes>(`${BASE_URL}/activities/total`)
    }


    getDetailPayment(invoiceId:string) : Observable<PaymentDetailRes>{
      return this.http.get<PaymentDetailRes>(`${BASE_URL}/activities/${invoiceId}/payment/detail-payment`)
  }


    getMemberReportIncome(limit?:number,offset?:number,startDate?:string,endDate?:string, typeCode?:string){
        if(!startDate && !endDate  && !typeCode){
            return this.http.get<IncomesMemberRes[]>(`${BASE_URL}/reports/member/incomes?limit=${limit}&offset=${offset}`)
        }else if(!typeCode){
            return this.http.get<IncomesMemberRes[]>(`${BASE_URL}/reports/member/incomes?limit=${limit}&offset=${offset}&startDate=${startDate}&endDate=${endDate}`)
        }else{
            return this.http.get<IncomesMemberRes[]>(`${BASE_URL}/reports/member/incomes?limit=${limit}&offset=${offset}&startDate=${startDate}&endDate=${endDate}&typeCode=${typeCode}`)
        }
    }

    getAdminReportIncome(limit?:number,offset?:number,startDate?:string,endDate?:string, typeCode?:string){
        if(!startDate && !endDate  && !typeCode){
            return this.http.get<IncomesAdminRes[]>(`${BASE_URL}/reports/admin/incomes?limit=${limit}&offset=${offset}`)
        }else if(!typeCode){
            return this.http.get<IncomesAdminRes[]>(`${BASE_URL}/reports/admin/incomes?limit=${limit}&offset=${offset}&startDate=${startDate}&endDate=${endDate}`)
        }else{
            return this.http.get<IncomesAdminRes[]>(`${BASE_URL}/reports/admin/incomes?limit=${limit}&offset=${offset}&startDate=${startDate}&endDate=${endDate}&typeCode=${typeCode}`)
        }
    }

    getReportAllByDateRange(limit?:number,offset?:number,startDate?:string,endDate?:string, typeCode?:string){
        if(!startDate && !endDate  && !typeCode){
            return this.http.get<ActivityMemberRes[]>(`${BASE_URL}/reports/member/activity?limit=${limit}&offset=${offset}`)
        }else if(!typeCode){
            return this.http.get<ActivityMemberRes[]>(`${BASE_URL}/reports/member/activity?limit=${limit}&offset=${offset}&startDate=${startDate}&endDate=${endDate}`)
        }else{
            return this.http.get<ActivityMemberRes[]>(`${BASE_URL}/reports/member/activity?limit=${limit}&offset=${offset}&startDate=${startDate}&endDate=${endDate}&typeCode=${typeCode}`)
        }
    }

    getReportAllByDateRangeAdmin(limit?:number,offset?:number,startDate?:any,endDate?:any, typeCode?:any){
        if(!startDate && !endDate  && !typeCode){
            return this.http.get<ActivityAdminRes[]>(`${BASE_URL}/reports/admin/activity?limit=${limit}&offset=${offset}`)
        }else if(!typeCode){
            return this.http.get<ActivityAdminRes[]>(`${BASE_URL}/reports/admin/activity?limit=${limit}&offset=${offset}&startDate=${startDate}&endDate=${endDate}`)
        }else{
            return this.http.get<ActivityAdminRes[]>(`${BASE_URL}/reports/admin/activity?limit=${limit}&offset=${offset}&startDate=${startDate}&endDate=${endDate}&typeCode=${typeCode}`)
        }
    }

    getDownloadReport(id:string,startDate?:string,endDate?:string){
        return this.http.get<ActivityAdminRes[]>(`${BASE_URL}/reports/member/activity/file?id=${id}&startDate=${startDate}&endDate=${endDate}`)
    }


    getDownloadIncomesReport(id:string,startDate?:string,endDate?:string){
        return this.http.get<ActivityAdminRes[]>(`${BASE_URL}/reports/member/incomes/file?userId=${id}&startDate=${startDate}&endDate=${endDate}`)
    }
    getDownloadReportAdmin(startDate?:string,endDate?:string){
        return this.http.get<ActivityAdminRes[]>(`${BASE_URL}/reports/admin/activity/file?startDate=${startDate}&endDate=${endDate}`)
    }
    getDownloadIncomesReportAdmin(startDate?:string,endDate?:string){
        return this.http.get<ActivityAdminRes[]>(`${BASE_URL}/reports/admin/incomes/file?startDate=${startDate}&endDate=${endDate}`)
    }




    getMyActivity(page: number, size: number, categories?:string,  typeCode?:string){
        if(typeCode == null){
            return this.http.get<ActivityRes[]>(`${BASE_URL}/activities/my-activity/filter?page=${page}&size=${size}`)
        }else if(categories == null){
            return this.http.get<ActivityRes[]>(`${BASE_URL}/activities/my-activity/filter?page=${page}&size=${size}&typeCode=${typeCode}`)

        }else if(typeCode){
          return this.http.get<ActivityRes[]>(`${BASE_URL}/activities/my-activity/filter?page=${page}&size=${size}&typeCode=${typeCode}`)
        }
        else{

            return this.http.get<ActivityRes[]>(`${BASE_URL}/activities/my-activity/filter?page=${page}&size=${size}&typeCode=${typeCode}&categoryCode=${categories}`)
        }
    }

    getMyTransaction(limit?:number,offset?:number,isPaid?:boolean): Observable<PaymentDetailResData[]>{
        if(isPaid == null){
            return this.http.get<PaymentDetailResData[]>(`${BASE_URL}/activities/my-transactions?limit=${limit}&offset=${offset}`)
        }else if(isPaid == true){
            return this.http.get<PaymentDetailResData[]>(`${BASE_URL}/activities/my-transactions?isPaid=true&limit=${limit}&offset=${offset}`)
        }else{
            return this.http.get<PaymentDetailResData[]>(`${BASE_URL}/activities/my-transactions?isPaid=false&limit=${limit}&offset=${offset}`)
        }
    }
    getAllBankPayment() : Observable<BankPaymentRes[]>{
        return this.http.get<BankPaymentRes[]>(`${BASE_URL}/activities/bank-payments`)
    }
    getActivityTypeByCode(code: string) : Observable<ActivityTypeRes>{
        return this.http.get<ActivityTypeRes>(`${BASE_URL}/activities/activity-types/find?typeCode=${code}`)
    }


 

}
