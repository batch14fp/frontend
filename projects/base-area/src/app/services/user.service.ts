import { BASE_URL } from './../constant/base.service';
import { HttpClient } from "@angular/common/http";
import {Injectable} from "@angular/core"
import { Observable, Subscription } from 'rxjs';
import { LoginReq } from '../dto/login/login-req';
import { LoginRes } from '../dto/login/login-res';
import { VerificationCodeReq } from '../dto/verificationcode/verification-code-req';
import { VerificationGetRes } from '../dto/verificationcode/verification-get-res';
import { SignUpReqInsert } from '../dto/user/sign-up-req-insert';
import { LoginRes } from '../dto/login/login-res';

@Injectable({
  providedIn: "root"
})
export class UserService{
  constructor(private http: HttpClient){}



  login(data: LoginReq): Observable<LoginRes>{
    return this.http.post<LoginRes>(`${BASE_URL}/users/login`, data,{
      headers:{
        skip: "true"
      }
    })
  }

  getToken():string{
    const data = localStorage.getItem("dataLogin")
    if(data){
      return JSON.parse(data).token
    }
    throw new Error("Token is empty")
  }

  getIdLogin():number{
    const data = localStorage.getItem("dataLogin")
    if(data){
      return JSON.parse(data).userId
    }
    throw new Error("User Id is empty")
  }

  getIdFotoProfile():string{
    const data = localStorage.getItem("dataLogin")
    if(data){
      return JSON.parse(data).fotoProfile
    }
    throw new Error("Foto Profile is empty")
  }

  getRole():string{
    const data = localStorage.getItem("dataLogin")
    if(data){
      return JSON.parse(data).roleCode
    }
    throw new Error("Role is empty")
  }

  saveDataLogin(data: LoginRes){
    localStorage.setItem("dataLogin", JSON.stringify(data))
  }

  getVerified(code : string) : Observable<VerificationGetRes>{
    return this.http.get<VerificationGetRes>(`${BASE_URL}/users/sign-up/verify-code/${code}`)
}


  insertVerification(data : VerificationCodeReq) : Observable<VerificationCodeReq>{
    return this.http.post<VerificationCodeReq>(`${BASE_URL}/users/sign-up/`,data)
  }

  signUpMember(data : SignUpReqInsert) : Observable<SignUpReqInsert>{
    return this.http.post<SignUpReqInsert>(`${BASE_URL}/users/sign-up/verify/`,data)
  }

  getRoleCode():string{
    const data = localStorage.getItem("dataLogin")
    if(data){
      return JSON.parse(data).roleCode
    }
    throw new Error("Role is empty")
  }

}
