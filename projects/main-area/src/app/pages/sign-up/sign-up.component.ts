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
import { Industry } from './industries';

@Component({
    selector:'app-sign-up',
    templateUrl: './sign-up.component.html'
})


export class SignUpComponent{


  signUp = this.fb.group({
    email: ["",  Validators.required],
    password: ["", [Validators.required, Validators.minLength(8)]],
  })

  accountDetail = this.fb.group({
    email: ["",  Validators.required],
    selectedIndustry: ["",  Validators.required],

    // email: ["",  Validators.required],
  })

  industries: Industry[] = []
  selectedIndustry!: Industry;

  isSignup = true
  isLoading = false
  showVerification = false


  constructor(private title: Title, private fb: FormBuilder,
    private userService: UserService,  private router: Router){
      this.title.setTitle("Sign Up")
      this.industries = [
        {id: '1', name: 'Agriculture'},
        {id: '2', name: 'Mining'},
        {id: '3', name: 'Manufacturing'},
        {id: '4', name: 'Electricity and Gas'},
        {id: '5', name: 'Water'},
        {id: '6', name: 'Construction'},
        {id: '7', name: 'Wholesale and Retail Trade'},
        {id: '8', name: 'Transportation and Storage'},
        {id: '9', name: 'Accommodation and Food Services'},
        {id: '10', name: 'Information and Communication'},
        {id: '11', name: 'Financial and Insurance Activities'},
        {id: '11', name: 'Real Estate'},
        {id: '12', name: 'Business Activities'},
      ]
    }

  onClickSendVerification(){
    this.showVerification =  true
  }

  private signUp$?: Subscription

   // this called every time when user changed the code
   onCodeChanged(code: string) {
  }

  // this called only if user entered full code
  onCodeCompleted(code: string) {
    this.isLoading = true
    setTimeout(() => {
    this.isLoading = false
    }, 2000);
   setTimeout(() => {
    this.isSignup = false
   }, 2000);
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
