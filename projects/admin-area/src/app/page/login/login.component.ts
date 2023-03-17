import { Component, OnDestroy } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { LoginReq } from "projects/base-area/src/app/dto/login/login-req";
import { LoginRes } from "../../../../../base-area/src/app/dto/login/login-res";
import { UserService } from "projects/base-area/src/app/services/user.service";
import { Subscription } from "rxjs";
import { ROLE } from "projects/base-area/src/app/constant/role.service";

@Component({
    selector : 'app-login-admin',
    templateUrl : './login.component.html'
})

export class LoginAdminComponent implements OnDestroy{

    constructor(
        private title: Title,
        private fb: FormBuilder,
        private userService: UserService,  
        private router: Router)
        {
          this.title.setTitle("Login")
        }
    
    
      login = this.fb.group({
        email: ["",  Validators.required],
        password: ["", Validators.required],
      })
    
      private login$?: Subscription
    
    
      onLogin(){
        if(this.login.valid){
          const data: LoginReq = {
            email: this.login.value.email!,
            password: this.login.value.password!
          }
    
          this.login$ = this.userService.login(data).subscribe(result => {
            this.userService.saveDataLogin(result)
            const roleCode = this.userService.roleCode

            if(roleCode == ROLE.SPADM ){
              this.router.navigateByUrl("/dashboard")
            }
            if(roleCode == ROLE.ADMIN ){
              this.router.navigateByUrl("/dashboard")
            }
            console.log(result)
            
          })

        
        }
      }

    
      saveDataLogin(data: LoginRes){
        localStorage.setItem("dataLogin", JSON.stringify(data))
      }
    
      ngOnDestroy(): void {
        this.login$?.unsubscribe()
      }
    
}