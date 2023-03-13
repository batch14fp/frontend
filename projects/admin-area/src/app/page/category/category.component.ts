import { Component, OnDestroy, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { CategoryRes } from "projects/base-area/src/app/dto/category/category-res";
import { CategoryService } from "projects/base-area/src/app/services/category.service";
import { Subscription } from "rxjs";

@Component({
    selector : 'app-category',
    templateUrl : 'category.component.html'
})

export class CategoryComponent {

    categorys  = [
       {code:'po', name :'category'},
       {code:'po', name :'category'},
       {code:'po', name :'category'},
       {code:'po', name :'category'},
       {code:'po', name :'category'},
    ]

    // getAllCategory : CategoryRes[] = []

    // private getAllCategory$? : Subscription 

    // constructor(private title : Title, private categoryService : CategoryService){
    //     this.title.setTitle('category')
    // }
    // ngOnInit(): void {
    //     this.getAllCategory$ = this.categoryService.getCategory().subscribe(res => {
    //         this.getAllCategory = res
    //     })   
    // }
    // ngOnDestroy(): void {
    //    this.getAllCategory$?.unsubscribe()
    // }



}
