import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { UserService } from '../../../../../base-area/src/app/services/user.service';
import { faBook, faHeart, faNewspaper, faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import { MEMBER_STATUS } from "projects/base-area/src/app/constant/member-status";
import { getInitials } from "projects/base-area/src/app/utils/getInitial";
import { ActivityService } from '../../../../../base-area/src/app/services/activity.service';
import { Subscription } from 'rxjs';
import { ActivityRes } from '../../../../../base-area/src/app/dto/activity/activity-res';
import { ACTIVITY_TYPE } from '../../../../../base-area/src/app/constant/activity-type';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from '@service/category.service';
import { CategoryRes } from '@dto/category/category-res';

@Component({
    selector : 'app-mycourse',
    templateUrl : './my-course.component.html'
})

export class MyCourseComponent implements OnInit, OnDestroy{

  constructor(private title: Title, private fb: FormBuilder,
    private userService: UserService,  private router: Router,private categoryService: CategoryService, private activityService:ActivityService){
      this.title.setTitle("Course")
  }
    private course$?: Subscription

    myActivity: ActivityRes[] = []

    faHeart = faHeart
    faBook = faBook
    faNewspaper = faNewspaper
    faPeopleGroup = faPeopleGroup


    initCourse(){
      this.course$ = this.activityService.getMyActivity(1,5,"", ACTIVITY_TYPE.COURSE).subscribe( res => {
        this.myActivity = res
      })
    }

    ngOnInit(): void {
      this.initCourse()

    }

    ngOnDestroy(): void {
     this.course$?.unsubscribe()
    }
}
