import { Injectable } from "@angular/core";
import { CanLoad, Route, Router, UrlSegment, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "../services/user.service";

@Injectable({
    providedIn : 'root'
})

export class AuthLoadGuard implements CanLoad{

    constructor(private userService : UserService, private router : Router){}

    canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
       try {
        this.userService.getToken()
        return true
       } catch (error) {
        return false
       }
    }
    
}