import { VerificationGetRes } from '../../../../../base-area/src/app/dto/verificationcode/verification-get-res'
import { AllPostBookmarkRes } from './../../../../../base-area/src/app/dto/post/all-post-bookmark-res';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { getInitials } from '../../../../../base-area/src/app/utils/getInitial';
import { Subscription } from "rxjs";
import { FormBuilder, Validators } from "@angular/forms";
import { LoginReq } from "projects/base-area/src/app/dto/login/login-req";
import { UserService } from '../../../../../base-area/src/app/services/user.service';
import { LoginRes } from '../../../../../base-area/src/app/dto/login/login-res';
import { Router } from "@angular/router";
import { ResInsert } from '../../../../../base-area/src/app/dto/res-insert';
import { VerificationCodeReq } from '../../../../../base-area/src/app/dto/verificationcode/verification-code-req';
import { IndustryRes } from '../../../../../base-area/src/app/dto/industry/industry-res';
import { IndustryService } from '../../../../../base-area/src/app/services/industry.service';
import { PositionRes } from '../../../../../base-area/src/app/dto/position/postion-res';
import { PositionService } from '../../../../../base-area/src/app/services/position.service';
import { SignUpReqInsert } from '../../../../../base-area/src/app/dto/user/sign-up-req-insert';
import { CountdownConfig, CountdownEvent } from 'ngx-countdown';
import { VerificationCodeReqGet } from '../../../../../base-area/src/app/dto/verificationcode/verification-code-req-get';

@Component({
    selector:'app-sign-up',
    templateUrl: './sign-up.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})


export class SignUpComponent implements OnInit{
  private verificationCode$?: Subscription
  private codeVerified$?: Subscription
  private industries$?: Subscription
  private positions$?: Subscription
  private userSignup$?: Subscription

  verificationCode!: ResInsert
  codeVerified!: VerificationGetRes
  industries: IndustryRes[] = []
  positions: PositionRes[] = []
  userSignup!: ResInsert


  signUp = this.fb.group({
    email: ["",  Validators.required],
    password: ["", [Validators.required, Validators.minLength(6)]],
  })

  accountDetail = this.fb.group({
    fullName: ["",  Validators.required],
    industry: ["",  Validators.required],
    phoneNumber: ["",  Validators.required],
    company: ["",  Validators.required],
    position: ["",  Validators.required],
  })


  selectedIndustry!: IndustryRes
  selectedPosition!: PositionRes

  isSignup = true
  isLoading = false
  showVerification = false
  isWrongCode = false
  susccessSignUp = false;
  noLeftTime = false;

  config: CountdownConfig = {
    leftTime: 120,
    format: 'mm:ss',
    prettyText: (text: string) => {
      return text
        .split(':')
        .map((v) => `<span class="item text-sm text-blue-600">${v}</span>`)
        .join('');
    },
  };

  handleEvent(e: CountdownEvent) {
    this.noLeftTime = !this.noLeftTime
    // console.log(this.noLeftTime);
    // console.log('Actions', e);
  }



  constructor(private title: Title, private fb: FormBuilder,
    private userService: UserService,  private router: Router, private industryService: IndustryService,
    private positionService: PositionService, private cdRef: ChangeDetectorRef){
      this.title.setTitle("Sign Up")
    }

    initIndustries(){
      this.industries$ = this.industryService.getAllIndustry().subscribe(res => this.industries =res)
    }
    initPositions(){
      this.industries$ = this.positionService.getAllPosition().subscribe(res => this.positions =res)
    }


  ngOnInit(): void {
    this.initIndustries()
    this.initPositions()
  }

  onClickSendVerification(){
    const data: VerificationCodeReq = {
      email: this.signUp.value.email!,
      password: this.signUp.value.password!
    }
    this.verificationCode$ = this.userService.insertVerification(data).subscribe(res => {
      this.showVerification =  true
      this.cdRef.markForCheck()
    })
    console.log("send code")
  }

  private signUp$?: Subscription

   // this called every time when user changed the code
   onCodeChanged(code: string) {
  }

  // this called only if user entered full code
  onCodeCompleted(code: string) {
    const codeVerify: VerificationCodeReqGet = {
      code
    }

    this.isLoading = true
    this.cdRef.markForCheck()
    this.codeVerified$ = this.userService.getVerified(codeVerify).subscribe(res=>{
      if(res.code){
        setTimeout(() => {
          this.isLoading = false
          this.isSignup = false
          this.cdRef.markForCheck()

        }, 1000);
      }
      if(!res.code){
        this.isLoading = false
        this.isWrongCode = true
        this.cdRef.markForCheck()
      }
    })
}

onsignUp(){
  if(this.signUp.valid && this.accountDetail.valid){
    const data: SignUpReqInsert = {
      email: this.signUp.value.email!,
      password: this.signUp.value.password!,
      fullName: this.accountDetail.value.fullName!,
      company: this.accountDetail.value.company!,
      industryId: this.accountDetail.value.industry!,
      phoneNumber: this.accountDetail.value.phoneNumber!,
      positionId: this.accountDetail.value.position!
    }

    this.userSignup$ = this.userService.signUpMember(data).subscribe(result => {
      console.log(result)
      this.susccessSignUp = true
      setTimeout(() => {
        this.router.navigateByUrl("/course")
      }, 3000);
    })
  }
}

}
