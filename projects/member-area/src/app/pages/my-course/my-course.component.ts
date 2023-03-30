import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { UserService } from '../../../../../base-area/src/app/services/user.service';
import { faBook, faHeart, faNewspaper, faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import { MEMBER_STATUS } from "projects/base-area/src/app/constant/member-status";
import { getInitials } from "projects/base-area/src/app/utils/getInitial";
import { ActivityService } from '../../../../../base-area/src/app/services/activity.service';
import { Subscription } from 'rxjs';
import { ActivityRes } from '../../../../../base-area/src/app/dto/activity/activity-res';
import { ACTIVITY_TYPE } from '../../../../../base-area/src/app/constant/activity-type';

@Component({
    selector : 'app-mycourse',
    templateUrl : './my-course.component.html'
})

export class MyCourseComponent implements OnInit{

  private course$?: Subscription

  allActivity: ActivityRes[] = []

  memberStatus!: string
    userIdlogin:string = this.userService.getIdLogin().toString()
    memberReguler = MEMBER_STATUS.REGULAR
    imageIdProfile= ""
    fullNameLogin=""

    faHeart = faHeart
    faBook = faBook
    faNewspaper = faNewspaper
    faPeopleGroup = faPeopleGroup

  constructor(private title: Title, private userService: UserService, private activityService:ActivityService){
    title.setTitle("My Course")
  }

  fotoName(name: string){
    return getInitials(name)
  }
  // initCourse(){
  //   this.course$ = this.activityService.  (1,5, ACTIVITY_TYPE.COURSE).subscribe( res => {
  //     this.allActivity = res
  //   })
  // }


  ngOnInit(): void {
    this.memberStatus =  this.userService.getMemberCode()
    this.imageIdProfile = this.userService.getIdFotoProfile()
    this.fullNameLogin = this.userService.getFullName()
  }
}
