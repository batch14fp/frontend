import { BASE_URL } from './../constant/base.service';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core"
import { Observable, Subscription } from 'rxjs';
import { LoginReq } from '../dto/login/login-req';
import { LoginRes } from '../dto/login/login-res';
import { VerificationCodeReq } from '../dto/verificationcode/verification-code-req';
import { VerificationGetRes } from '../dto/verificationcode/verification-get-res';
import { SignUpReqInsert } from '../dto/user/sign-up-req-insert';
import { VerificationCodeReqGet } from '../dto/verificationcode/verification-code-req-get';
import { AllUserRes } from '@dto/user/all-user-res';
import { IndustryRes } from '@dto/industry/industry-res';
import { PositionRes } from '@dto/position/postion-res';

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private http: HttpClient) { }

  login(data: LoginReq): Observable<LoginRes> {
    return this.http.post<LoginRes>(`${BASE_URL}/users/login`, data, {
      headers: {
        skip: "true"
      }
    })
  }

  getToken(): string {
    const data = localStorage.getItem("dataLogin")
    if (data) {
      return JSON.parse(data).token
    }
    throw new Error("Token is empty")
  }
  getMemberCode(): string {
    const data = localStorage.getItem("dataLogin")
    if (data) {
      return JSON.parse(data).memberCode
    }
    throw new Error("MemberCode is empty")
  }

  getIdLogin(): String {
    const data = localStorage.getItem("dataLogin")
    if (data) {
      return JSON.parse(data).userId
    }
    throw new Error("User Id is empty")
  }

  getIdFotoProfile(): string {
    const data = localStorage.getItem("dataLogin")
    if (data) {
      return JSON.parse(data).fotoProfile
    }
    throw new Error("Foto Profile is empty")
  }

  getRole(): string {
    const data = localStorage.getItem("dataLogin")
    if (data) {
      return JSON.parse(data).roleCode
    }
    throw new Error("Role is empty")
  }

  getFullName(): string {
    const data = localStorage.getItem("dataLogin")
    if (data) {
      return JSON.parse(data).fullname
    }
    throw new Error("Fullname is empty")
  }

  saveDataLogin(data: LoginRes) {
    localStorage.setItem("dataLogin", JSON.stringify(data))
  }
  insertVerification(data: VerificationCodeReq): Observable<VerificationCodeReq> {
    return this.http.post<VerificationCodeReq>(`${BASE_URL}/users/sign-up/`, data, {
      headers: {
        skip: "true"
      }
    })
  }

  getVerified(data: VerificationCodeReqGet): Observable<VerificationCodeReqGet> {
    return this.http.post<VerificationCodeReqGet>(`${BASE_URL}/users/sign-up/verify-code/`, data, {
      headers: {
        skip: "true"
      }
    })
  }

  signUpMember(data: SignUpReqInsert): Observable<SignUpReqInsert> {
    return this.http.post<SignUpReqInsert>(`${BASE_URL}/users/sign-up/verify-code/verified/`, data, {
      headers: {
        skip: "true"
      }
    })
  }

  get roleCode(): string {
    const data = localStorage.getItem("dataLogin")
    if (data) {
      return JSON.parse(data).roleCode
    }
    throw new Error("Role is empty")
  }



  get images(): string {
    const data = localStorage.getItem("dataLogin")
    if (data) {
      return JSON.parse(data).imageId
    }
    throw new Error("Images is empty")
  }

  getAllUser(startPage: number, maxPage: number, query?: string): Observable<AllUserRes[]> {
    return this.http.get<AllUserRes[]>(`${BASE_URL}/admin/users?page=${startPage}&size=${maxPage}`)
  }

  getAllIndustryMember(): Observable<IndustryRes[]> {
    return this.http.get<IndustryRes[]>(`${BASE_URL}/users/industries`, {
      headers: {
        skip: "true"
      }
    })
  }

  getAllPositionMember(): Observable<PositionRes[]>{
    return this.http.get<PositionRes[]>(`${BASE_URL}/users/positions`, {
      headers: {
        skip: "true"
      }
    })
}
}
