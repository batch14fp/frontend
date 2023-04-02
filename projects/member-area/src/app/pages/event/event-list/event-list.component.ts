import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { ActivityRes } from "@dto/activity/activity-res";
import { ActivityUpcomingAllRes } from "@dto/activity/activity-upcoming-all-res";
import { CategoryRes } from "@dto/category/category-res";
import { faBook, faHeart, faNewspaper, faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import { ActivityService } from "@service/activity.service";
import { CategoryService } from "@service/category.service";
import { UserService } from "@service/user.service";
import { MenuItem } from "primeng/api";
import { ACTIVITY_TYPE } from "projects/base-area/src/app/constant/activity-type";

import { SORT_TYPE } from "projects/base-area/src/app/constant/sort_type";

import { MEMBER_STATUS } from "projects/base-area/src/app/constant/member-status";
import { getInitials } from "projects/base-area/src/app/utils/getInitial";
import { truncateString } from "projects/base-area/src/app/utils/turncateString";

import { Subscription } from "rxjs";

@Component({
    selector: 'app-list-event',
    templateUrl: './event-list.component.html'
})

export class EventListComponent implements OnInit, OnDestroy {
    private event$?: Subscription
    private category$?: Subscription
    private eventCategory$?:Subscription
    private upcomingEvents$?: Subscription


    allActivity: ActivityRes[] = []
    upcomingEvents?:ActivityUpcomingAllRes

  memberStatus!: string
  memberReguler = MEMBER_STATUS.REGULAR
  imageIdProfile= ""
  fullNameLogin=""

    faHeart = faHeart
    faBook = faBook
    faNewspaper = faNewspaper
    faPeopleGroup = faPeopleGroup

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

    constructor(private title: Title, private fb: FormBuilder,
        private userService: UserService, private router: Router, private categoryService: CategoryService, private activityService: ActivityService) {
        this.title.setTitle("Event")
    }


    sortTypeBuilder = this.fb.group({
      choose: ['1']
    })
    sortFilter() {
      const selectedValue = this.sortTypeBuilder.get('choose')?.value;
      if (selectedValue === '2') {
        if (this.categoriesList.length) {
          this.event$ = this.activityService?.getAllActivityByCategories(1, 10, ACTIVITY_TYPE.EVENT, SORT_TYPE.HIGHEST,this.categoriesList )?.subscribe(res => {
            if (res != null ) {
              this.allActivity = res;
            }
            else{
              this.allActivity =[]
            }
          });
        }
        else{
          this.event$ = this.activityService?.getAllActivity(1, 10, ACTIVITY_TYPE.EVENT, SORT_TYPE.HIGHEST)?.subscribe(res => {
            if (res != null ) {
              this.allActivity = res;
            }
          });
        }
      } else if (selectedValue === '3') {
        if (this.categoriesList.length) {
          this.event$ = this.activityService?.getAllActivityByCategories(1, 10, ACTIVITY_TYPE.EVENT, SORT_TYPE.LOWEST,this.categoriesList )?.subscribe(res => {
            if (res != null ) {
              this.allActivity = res;
              
            }
            else{
              this.allActivity =[]
            }
          });
        }
        else{
          this.event$ = this.activityService?.getAllActivity(1, 10, ACTIVITY_TYPE.EVENT, SORT_TYPE.LOWEST)?.subscribe(res => {
            if (res != null ) {
              this.allActivity = res;
            }
            else{
              this.allActivity =[]
            }
          });
        }
      } else if (selectedValue === '1') {
        if (this.categoriesList.length) {
          this.event$ = this.activityService?.getAllActivityByCategories(1, 10, ACTIVITY_TYPE.EVENT, SORT_TYPE.NEWEST,this.categoriesList )?.subscribe(res => {
            if (res != null ) {
              this.allActivity = res;
            }else{
              this.allActivity =[]
            }
          });
        }
        else{
          this.event$ = this.activityService?.getAllActivity(1, 10, ACTIVITY_TYPE.EVENT, SORT_TYPE.NEWEST)?.subscribe(res => {
            if (res != null ) {
              this.allActivity = res;
            }else{
              this.allActivity =[]
            }
          });
        }
      }
    }  

    categoriesList:string[] = []
    categories: CategoryRes[] = []
    dateSearch!: Date

    sortType?:string


    selectedCategory: string[] = []

    fotoName(name: string){
      return getInitials(name)
    }
    onLogOut(){
      localStorage.clear()
      this.router.navigateByUrl("/")
    }

    turncate(str:string){
      return truncateString(str, 20)
    }

    initCategory() {
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

    initEvent(){
        this.event$ = this.activityService.getAllActivity(1,10, ACTIVITY_TYPE.EVENT).subscribe( res => {
          this.allActivity = res
        })
    }

    ngOnDestroy(): void {
        this.event$?.unsubscribe()
    }
    ngOnInit(): void {
        this.initCategory()
        this.initEvent()
        this.initUpcomingEvents()
        this.memberStatus =  this.userService.getMemberCode()
        this.imageIdProfile = this.userService.getIdFotoProfile()
        this.fullNameLogin = this.userService.getFullName()

    }
   
    categoryFilter() {
      const selectedValue = this.sortTypeBuilder.get('choose')?.value;
      if (selectedValue === '2') {
        if (this.categoriesList.length) {
          this.event$ = this.activityService?.getAllActivityByCategories(1, 10, ACTIVITY_TYPE.EVENT, SORT_TYPE.HIGHEST,this.categoriesList )?.subscribe(res => {
            if (res != null ) {
              this.allActivity = res;
            }
            else{
              this.allActivity =[]
            }
          });
        }
        else{
          this.event$ = this.activityService?.getAllActivity(1, 10, ACTIVITY_TYPE.EVENT, SORT_TYPE.HIGHEST)?.subscribe(res => {
            if (res != null ) {
              this.allActivity = res;
            }
          });
        }

      } else if (selectedValue === '3') {
        if (this.categoriesList.length) {
          this.event$ = this.activityService?.getAllActivityByCategories(1, 10, ACTIVITY_TYPE.EVENT, SORT_TYPE.LOWEST,this.categoriesList )?.subscribe(res => {
            if (res != null ) {
              this.allActivity = res;
              
            }
            else{
              this.allActivity =[]
            }
          });
        }
        else{
          this.event$ = this.activityService?.getAllActivity(1, 10, ACTIVITY_TYPE.EVENT, SORT_TYPE.LOWEST)?.subscribe(res => {
            if (res != null ) {
              this.allActivity = res;
            }
            else{
              this.allActivity =[]
            }
          });
        }
      } else if (selectedValue === '1') {
        if (this.categoriesList.length) {
          this.event$ = this.activityService?.getAllActivityByCategories(1, 10, ACTIVITY_TYPE.EVENT, SORT_TYPE.NEWEST,this.categoriesList )?.subscribe(res => {
            if (res != null ) {
              this.allActivity = res;
            }else{
              this.allActivity =[]
            }
          });
        }
        else{
          this.event$ = this.activityService?.getAllActivity(1, 10, ACTIVITY_TYPE.EVENT, SORT_TYPE.NEWEST)?.subscribe(res => {
            if (res != null ) {
              this.allActivity = res;
            }else{
              this.allActivity =[]
            }
          });
        }
      }
      

    }
  

}
