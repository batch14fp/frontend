import { AllPostBookmarkRes } from './../../../../../base-area/src/app/dto/post/all-post-bookmark-res';
import { Component, OnDestroy } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { getInitials } from '../../../../../base-area/src/app/utils/getInitial';
import { Subscription } from "rxjs";
import { FormBuilder, Validators } from "@angular/forms";
import { LoginReq } from "projects/base-area/src/app/dto/user/login-req";
import { UserService } from '../../../../../base-area/src/app/services/user.service';
import { LoginRes } from '../../../../../base-area/src/app/dto/user/login-res';
import { Router } from "@angular/router";
import { SignUpReq } from '../../../../../base-area/src/app/dto/user/sign-up-req';

@Component({
    selector:'app-sign-up',
    templateUrl: './sign-up.component.html'
})

export class SignUpComponent{
  constructor(private title: Title, private fb: FormBuilder,
    private userService: UserService,  private router: Router){}

  signUp = this.fb.group({
    email: ["",  Validators.required],
    password: ["", Validators.required],
  })

  showVerification = false

  onClickSendVerification(){
    this.showVerification =  true
  }

  private signUp$?: Subscription

   // this called every time when user changed the code
   onCodeChanged(code: string) {
  }

  // this called only if user entered full code
  onCodeCompleted(code: string) {
  }


  // onsignUp(){
  //   if(this.signUp.valid){
  //     const data: SignUpReq = {
  //       email: this.signUp.value.email!,
  //       password: this.signUp.value.password!
  //     }

  //     this.login$ = this.userService.login(data).subscribe(result => {
  //       this.userService.saveDataLogin(result)
  //       this.router.navigateByUrl("/dashboard")
  //       console.log(result)
  //     })
  //   }
  // }



}
