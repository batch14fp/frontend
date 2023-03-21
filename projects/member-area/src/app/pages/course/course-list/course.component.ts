import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { Subscription } from "rxjs";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from '@service/user.service';
import { CategoryService } from '@service/category.service';
import { CategoryRes } from '@dto/category/category-res';



@Component({
    selector:'app-course',
    templateUrl: './course.component.html'
})


export class CourseComponent implements OnInit, OnDestroy{
  constructor(private title: Title, private fb: FormBuilder,
    private userService: UserService,  private router: Router,private categoryService: CategoryService){
      this.title.setTitle("Course")
    }

    private category$?: Subscription

    categories: CategoryRes[] = []
    dateSearch!:Date

    selectedCategory: string[] = []


    initCategory(){
      this.category$ = this.categoryService.getAllCategory().subscribe(res => {
        this.categories = res;
      })
    }

    ngOnInit(): void {
      this.initCategory()
    }

    ngOnDestroy(): void {
     this.category$?.unsubscribe()
    }

}