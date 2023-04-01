import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "@service/user.service";

@Injectable({
    providedIn: "root"
})
export class AuthRoleGuard implements CanActivate {

    constructor(
        private userService: UserService,
        private router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const dataTemp = Object.values(route.data)
        if (dataTemp.includes(this.userService.roleCode)) {
            return true
        } else {
            //forbiden pageyaaa
            this.router.navigateByUrl('/forbiden')
            return false
        }
    }

}
