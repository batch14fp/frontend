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
import { ActivityUpcomingAllRes } from '@dto/activity/activity-upcoming-all-res';
import { truncateString } from 'projects/base-area/src/app/utils/turncateString';
import { MenuItem } from 'primeng/api';

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
    private upcomingEvents$?: Subscription

    upcomingEvents?:ActivityUpcomingAllRes
    myActivity: ActivityRes[] = []
    memberStatus!: string
    imageIdProfile= ""
    fullNameLogin=""
    memberReguler = MEMBER_STATUS.REGULAR

    accountMenu: MenuItem[] = [
      { label: 'Profile', icon: 'pi pi-fw pi-user', command: e=> this.router.navigateByUrl("/profile") },
      { label: 'My Transaction', icon: 'pi pi-fw pi-credit-card', command: e=> this.router.navigateByUrl("/my-transaction") },
      { label: 'Report Acivity', icon: 'pi pi-fw pi-chart-bar', command: e=> this.router.navigateByUrl("/report-activity") },
      { label: 'Report Income', icon: 'pi pi-fw pi-dollar', command: e=> this.router.navigateByUrl("/report-activity") },
      { label: 'My Course', icon: 'pi pi-fw pi-book', command: e=> this.router.navigateByUrl("/my-course") },
      { label: 'My Events', icon: 'pi pi-fw pi-calendar', command: e=> this.router.navigateByUrl("/my-event") },
      { label: 'My Bookmark', icon: 'pi pi-fw pi-bookmark', command: e=> this.router.navigateByUrl("/my-bookmark") },

      { label: 'Logout', icon: 'pi pi-fw pi-sign-out', command: e=> this.onLogOut() },
    ];

    faHeart = faHeart
    faBook = faBook
    faNewspaper = faNewspaper
    faPeopleGroup = faPeopleGroup



    initCourse(){
      this.course$ = this.activityService.getMyActivity(1,5,"", ACTIVITY_TYPE.COURSE).subscribe( res => {
        this.myActivity = res
      })
    }

    initUpcomingEvents(){
      this.upcomingEvents$ = this.activityService.getUpcomingEvent(0,3).subscribe(res =>{
        this.upcomingEvents = res
        console.log(res)
      })
    }

    fotoName(name: string){
      return getInitials(name)
    }

    turncate(str:string){
      return truncateString(str, 20)
    }

    onLogOut(){
      localStorage.clear()
      this.router.navigateByUrl("/")
    }


    ngOnInit(): void {
      this.initCourse()
      this.initUpcomingEvents()
      this.memberStatus =  this.userService.getMemberCode()
      this.imageIdProfile = this.userService.getIdFotoProfile()
      this.fullNameLogin = this.userService.getFullName()

    }

    ngOnDestroy(): void {
     this.course$?.unsubscribe()
    }
}
