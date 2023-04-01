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
import { SORT_TYPE } from 'projects/base-area/src/app/constant/sort_type';


@Component({
  selector: 'app-course',
  templateUrl: './course.component.html'
})

export class CourseComponent implements OnInit, OnDestroy {

  constructor(private title: Title, private fb: FormBuilder,
    private userService: UserService, private router: Router, private categoryService: CategoryService, private activityService: ActivityService) {
    this.title.setTitle("Course")
  }

  private category$?: Subscription
  private course$?: Subscription

  allActivity: ActivityRes[] = []

  faHeart = faHeart
  faBook = faBook
  faNewspaper = faNewspaper
  faPeopleGroup = faPeopleGroup

  categoriesList: string[] = []

  categories?: CategoryRes[] = []
  dateSearch!: Date

  choose!: number

  sortTypeBuilder = this.fb.group({
    choose: ['1']
  })



  selectedCategory?: string[] = []

  initCategory() {
    this.category$ = this.categoryService.getAllCategory()?.subscribe(res => {
      if (res != null ) {
        this.categories = res;
      }
    })

  }

  initCourse() {
    this.course$ = this.activityService.getAllActivity(1, 5, ACTIVITY_TYPE.COURSE,SORT_TYPE.NEWEST)?.subscribe(res => {
      if (res != null ) {
        this.allActivity = res;
      }
      else{
        this.allActivity =[]
      }
    })
  }

  ngOnInit(): void {
    this.initCategory()
    this.initCourse()

  }
  sortFilter() {
    const selectedValue = this.sortTypeBuilder.get('choose')?.value;
    if (selectedValue === '2') {
      if (this.categoriesList.length) {
        this.course$ = this.activityService?.getAllActivityByCategories(1, 10, ACTIVITY_TYPE.COURSE, SORT_TYPE.HIGHEST,this.categoriesList )?.subscribe(res => {
          if (res != null ) {
            this.allActivity = res;
          }
          else{
            this.allActivity =[]
          }
        });
      }
      else{
        this.course$ = this.activityService?.getAllActivity(1, 10, ACTIVITY_TYPE.COURSE, SORT_TYPE.HIGHEST)?.subscribe(res => {
          if (res != null ) {
            this.allActivity = res;
          }
        });
      }
    } else if (selectedValue === '3') {
      if (this.categoriesList.length) {
        this.course$ = this.activityService?.getAllActivityByCategories(1, 10, ACTIVITY_TYPE.COURSE, SORT_TYPE.LOWEST,this.categoriesList )?.subscribe(res => {
          if (res != null ) {
            this.allActivity = res;
            
          }
          else{
            this.allActivity =[]
          }
        });
      }
      else{
        this.course$ = this.activityService?.getAllActivity(1, 10, ACTIVITY_TYPE.COURSE, SORT_TYPE.LOWEST)?.subscribe(res => {
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
        this.course$ = this.activityService?.getAllActivityByCategories(1, 10, ACTIVITY_TYPE.COURSE, SORT_TYPE.NEWEST,this.categoriesList )?.subscribe(res => {
          if (res != null ) {
            this.allActivity = res;
          }else{
            this.allActivity =[]
          }
        });
      }
      else{
        this.course$ = this.activityService?.getAllActivity(1, 10, ACTIVITY_TYPE.COURSE, SORT_TYPE.NEWEST)?.subscribe(res => {
          if (res != null ) {
            this.allActivity = res;
          }else{
            this.allActivity =[]
          }
        });
      }
    }
  }
  
  
  sortFilterCategory() {
    const selectedValue = this.sortTypeBuilder.get('choose')?.value;
    if (selectedValue === '2') {
      if (this.categoriesList.length) {
        this.course$ = this.activityService?.getAllActivityByCategories(1, 10, ACTIVITY_TYPE.COURSE, SORT_TYPE.HIGHEST,this.categoriesList )?.subscribe(res => {
          if (res != null ) {
            this.allActivity = res;
          }
          else{
            this.allActivity =[]
          }
        });
      }
      else{
        this.course$ = this.activityService?.getAllActivity(1, 10, ACTIVITY_TYPE.COURSE, SORT_TYPE.HIGHEST)?.subscribe(res => {
          if (res != null ) {
            this.allActivity = res;
          }
        });
      }
    } else if (selectedValue === '3') {
      if (this.categoriesList.length) {
        this.course$ = this.activityService?.getAllActivityByCategories(1, 10, ACTIVITY_TYPE.COURSE, SORT_TYPE.LOWEST,this.categoriesList )?.subscribe(res => {
          if (res != null ) {
            this.allActivity = res;
            
          }
          else{
            this.allActivity =[]
          }
        });
      }
      else{
        this.course$ = this.activityService?.getAllActivity(1, 10, ACTIVITY_TYPE.COURSE, SORT_TYPE.LOWEST)?.subscribe(res => {
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
        this.course$ = this.activityService?.getAllActivityByCategories(1, 10, ACTIVITY_TYPE.COURSE, SORT_TYPE.NEWEST,this.categoriesList )?.subscribe(res => {
          if (res != null ) {
            this.allActivity = res;
          }else{
            this.allActivity =[]
          }
        });
      }
      else{
        this.course$ = this.activityService?.getAllActivity(1, 10, ACTIVITY_TYPE.COURSE, SORT_TYPE.NEWEST)?.subscribe(res => {
          if (res != null ) {
            this.allActivity = res;
          }else{
            this.allActivity =[]
          }
        });
      }
    }
    
  }




 

 


  ngOnDestroy(): void {
    if (this.course$) {
      this.course$.unsubscribe();
    }
    this.category$?.unsubscribe();
  }
}
