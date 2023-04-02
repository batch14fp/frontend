import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { Subscription } from "rxjs";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from '@service/user.service';
import { CategoryService } from '@service/category.service';
import { CategoryRes } from '@dto/category/category-res';
import { faBook, faHeart, faNewspaper, faPeopleGroup } from '@fortawesome/free-solid-svg-icons';
import { ActivityService } from '@service/activity.service';
import { ActivityRes } from '@dto/activity/activity-res';
import { ACTIVITY_TYPE } from 'projects/base-area/src/app/constant/activity-type';
import { ActivityUpcomingAllRes } from '@dto/activity/activity-upcoming-all-res';
import { getInitials } from 'projects/base-area/src/app/utils/getInitial';
import { truncateString } from 'projects/base-area/src/app/utils/turncateString';
import { MEMBER_STATUS } from 'projects/base-area/src/app/constant/member-status';
import { MenuItem } from 'primeng/api';



@Component({
    selector:'app-course',
    templateUrl: './course.component.html'
})

export class CourseComponent implements OnInit, OnDestroy{

  constructor(private title: Title, private fb: FormBuilder,
    private userService: UserService,  private router: Router,private categoryService: CategoryService, private activityService:ActivityService){
      this.title.setTitle("Course")
  }

    private category$?: Subscription
    private course$?: Subscription
    private upcomingEvents$?: Subscription


    upcomingEvents?:ActivityUpcomingAllRes
    memberStatus!: string
  imageIdProfile= ""
  fullNameLogin=""
  memberReguler = MEMBER_STATUS.REGULAR



    allActivity: ActivityRes[] = []

    faHeart = faHeart
    faBook = faBook
    faNewspaper = faNewspaper
    faPeopleGroup = faPeopleGroup

    categoriesList:string[] = []

    categories: CategoryRes[] = []
    dateSearch!:Date

    selectedCategory: string[] = []

    accountMenu: MenuItem[] = [
      { label: 'Profile', icon: 'pi pi-fw pi-user', command: e=> this.router.navigateByUrl("/profile") },
      { label: 'My Transaction', icon: 'pi pi-fw pi-credit-card', command: e=> this.router.navigateByUrl("/my-transaction") },
      { label: 'Report Activity', icon: 'pi pi-fw pi-chart-bar', command: e=> this.router.navigateByUrl("/report-activity") },
      { label: 'Report Income', icon: 'pi pi-fw pi-dollar', command: e=> this.router.navigateByUrl("/report-income") },
      { label: 'My Course', icon: 'pi pi-fw pi-book', command: e=> this.router.navigateByUrl("/my-course") },
      { label: 'My Events', icon: 'pi pi-fw pi-calendar', command: e=> this.router.navigateByUrl("/my-event") },
      { label: 'My Bookmark', icon: 'pi pi-fw pi-bookmark', command: e=> this.router.navigateByUrl("/my-bookmark") },

      { label: 'Logout', icon: 'pi pi-fw pi-sign-out', command: e=> this.onLogOut() },
    ];

    onLogOut(){
      localStorage.clear()
      this.router.navigateByUrl("/")
    }


    fotoName(name: string){
      return getInitials(name)
    }

    turncate(str:string){
      return truncateString(str, 20)
    }

    initCategory(){
      this.category$ = this.categoryService.getAllCategory().subscribe(res => {
        this.categories = res;
      })

    }

    initUpcomingEvents(){
      this.upcomingEvents$ = this.activityService.getUpcomingEvent(0,3).subscribe(res =>{
        this.upcomingEvents = res
        console.log(res)
      })
    }

    initCourse(){
      this.course$ = this.activityService.getAllActivity(1,5, ACTIVITY_TYPE.COURSE).subscribe( res => {
        this.allActivity = res
      })
    }

    ngOnInit(): void {
      this.initCategory()
      this.initCourse()
      this.initUpcomingEvents()
      this.memberStatus =  this.userService.getMemberCode()
      this.imageIdProfile = this.userService.getIdFotoProfile()
      this.fullNameLogin = this.userService.getFullName()
    }

    categoryFilter(){
      if(!this.categoriesList.length){
        this.course$ = this.activityService.getAllActivity(1,10,ACTIVITY_TYPE.COURSE).subscribe(res=>{
          this.allActivity =res
        })
      }
      else{
        this.course$ = this.activityService.getAllActivityByCategories(1,10,ACTIVITY_TYPE.COURSE,this.categoriesList).subscribe(res=>{
          this.allActivity =res
        })
      }

  }

    ngOnDestroy(): void {
     this.category$?.unsubscribe()
    }

}
