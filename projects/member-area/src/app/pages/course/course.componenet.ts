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
    selector:'app-course',
    templateUrl: './course.component.html'
})

export class CourseComponent{
  constructor(private title: Title, private fb: FormBuilder,
    private userService: UserService,  private router: Router){
      this.title.setTitle("Course")
    }


}
