import { Component, OnDestroy } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { getInitials } from '../../../../../base-area/src/app/utils/getInitial';
import { Subscription } from "rxjs";
import { FormBuilder, Validators } from "@angular/forms";
import { LoginReq } from "projects/base-area/src/app/dto/user/login-req";
import { UserService } from '../../../../../base-area/src/app/services/user.service';
import { LoginRes } from '../../../../../base-area/src/app/dto/user/login-res';
import { Router } from "@angular/router";


@Component({
    selector:'app-login',
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnDestroy{
  constructor(private title: Title, private fb: FormBuilder,
    private userService: UserService,  private router: Router){}


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
        this.router.navigateByUrl("/dashboard")
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
