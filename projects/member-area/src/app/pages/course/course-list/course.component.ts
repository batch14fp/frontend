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

    allActivity: ActivityRes[] = []

    faHeart = faHeart
    faBook = faBook
    faNewspaper = faNewspaper
    faPeopleGroup = faPeopleGroup

    categoriesList:string[] = []

    categories: CategoryRes[] = []
    dateSearch!:Date

    selectedCategory: string[] = []

    initCategory(){
      this.category$ = this.categoryService.getAllCategory().subscribe(res => {
        this.categories = res;
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
