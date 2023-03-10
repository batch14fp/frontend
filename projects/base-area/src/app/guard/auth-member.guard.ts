import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { ROLE } from "../constant/role.service";
import { UserService } from "../services/user.service";

@Injectable({
    providedIn : 'root'
})

export class AuthAdminGuard implements CanActivate{

    constructor(private userService : UserService, private router : Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
       console.log(state);

       try {
        if(this.userService.getRole() == ROLE.MEMBER ){
            return true
        }else{
            return false
        }
       } catch (error) {
        this.router.navigateByUrl('/dashboard')/*masih belum fix*/
        return false
       }
       
    }
    
}