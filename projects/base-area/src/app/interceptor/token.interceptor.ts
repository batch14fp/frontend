import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserService } from "../services/user.service";

@Injectable({
    providedIn: 'root'
})
export class TokenInterception implements HttpInterceptor{

    constructor(private userService: UserService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       if(req.headers.get('skip') === 'true'){
        return next.handle(req)
       }
       const reqClone = req.clone({headers : new HttpHeaders().append('Authorization',`Bearer ${this.userService.getToken()}`)})
       return next.handle(reqClone)
    }

}