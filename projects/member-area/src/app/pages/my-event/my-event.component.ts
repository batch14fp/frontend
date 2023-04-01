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
    selector : 'app-myevent',
    templateUrl : './my-event.component.html'
})

export class MyEventsComponent implements OnInit, OnDestroy{

  constructor(private title: Title, private fb: FormBuilder,
    private userService: UserService,  private router: Router,private categoryService: CategoryService, private activityService:ActivityService){
      this.title.setTitle("Event")
  }

    private event$?: Subscription

    myActivity: ActivityRes[] = []

    faHeart = faHeart
    faBook = faBook
    faNewspaper = faNewspaper
    faPeopleGroup = faPeopleGroup


    initEvent(){
      this.event$ = this.activityService.getMyActivity(1,5,"", ACTIVITY_TYPE.EVENT).subscribe( res => {
        this.myActivity = res
      })
    }

    ngOnInit(): void {
      this.initEvent()

    }

    ngOnDestroy(): void {
     this.event$?.unsubscribe()
    }
}
