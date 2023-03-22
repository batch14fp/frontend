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

    categories: CategoryRes[] = []
    dateSearch!:Date

    selectedCategory: string[] = []

    initCategory(){
      this.category$ = this.categoryService.getAllCategory().subscribe(res => {
        this.categories = res;
      })
    }

    initCourse(){
      this.course$ = this.activityService.getAllActivity().subscribe( res => {
        this.allActivity = res
      })
    }

    ngOnInit(): void {
      this.initCategory()
      this.initCourse()
    }

    ngOnDestroy(): void {
     this.category$?.unsubscribe()
    }

}