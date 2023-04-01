import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { ActivityRes } from "@dto/activity/activity-res";
import { CategoryRes } from "@dto/category/category-res";
import { faBook, faHeart, faNewspaper, faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import { ActivityService } from "@service/activity.service";
import { CategoryService } from "@service/category.service";
import { UserService } from "@service/user.service";
import { ACTIVITY_TYPE } from "projects/base-area/src/app/constant/activity-type";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-list-event',
    templateUrl: './event-list.component.html'
})

export class EventListComponent implements OnInit, OnDestroy {
    private event$?: Subscription
    private category$?: Subscription
    private eventCategory$?:Subscription

    allActivity: ActivityRes[] = []

    faHeart = faHeart
    faBook = faBook
    faNewspaper = faNewspaper
    faPeopleGroup = faPeopleGroup

    constructor(private title: Title, private fb: FormBuilder,
        private userService: UserService, private router: Router, private categoryService: CategoryService, private activityService: ActivityService) {
        this.title.setTitle("Event")
    }

    // categoriesList = this.fb.group({
    //     category: [[]]
    // })

    categoriesList:string[] = []

    

    categories: CategoryRes[] = []
    dateSearch!: Date
    sortType?:string

    selectedCategory: string[] = []

    initCategory() {
        this.category$ = this.categoryService.getAllCategory().subscribe(res => {
            this.categories = res;
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
        
    }
    categoryFilter(){
        if(!this.categoriesList.length){
          this.event$ = this.activityService.getAllActivity(1,10,ACTIVITY_TYPE.EVENT).subscribe(res=>{
            this.allActivity =res
          })
        }
        else{
          this.event$ = this.activityService.getAllActivityByCategories(1,10,ACTIVITY_TYPE.EVENT,this.sortType, this.categoriesList).subscribe(res=>{
            this.allActivity =res
          })
        }
      
    }

}