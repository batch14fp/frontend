import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { CategoryReq } from "@dto/category/category-req";
import { CategoryUpdateReq } from "@dto/category/category-update-req";
import { CategoryRes } from "projects/base-area/src/app/dto/category/category-res";
import { CategoryService } from "projects/base-area/src/app/services/category.service";
import { Subscription } from "rxjs";

@Component({
    selector : 'app-category',
    templateUrl : './category.component.html'
})

export class CategoryComponent {
    private getAllCategory$? : Subscription
    private categories$?:Subscription

    getAllCategory : CategoryRes[] = []

    displayResponsive!:boolean
    showResponsiveDialog(){
        this.displayResponsive = true
    }

    displayDelete!:boolean
    showDeleteDialog(){
        this.displayDelete = true
    }

    disabled: boolean = true;

    displayUpdate!:boolean
    showUpdateDialog(category:CategoryRes){
        this.updateCategory.setValue({
            categoryId:  category.categoryId,
            categoryCode:category.categoryCode,
            categoryName:category.categoryName,
            active:category.isActive,
            ver:category.ver
        })
        this.displayUpdate = true
    }

    constructor(private fb: FormBuilder,private title : Title, private categoryService : CategoryService,
        private router:Router){
        this.title.setTitle('category')
    }


    createCategory = this.fb.group({
        categoryName:[""],
        categoryCode:[""]
    })

    updateCategory = this.fb.group({
        categoryId:[""],
        categoryName:[""],
        categoryCode:[""],
        ver:[0],
        active:[true]
    })

    ngOnInit(): void {
        this.initCategory()
    }
    
    onCreateCategory(){
        const data:CategoryReq = {
            categoryName:this.createCategory.value.categoryName!,
            categoryCode:this.createCategory.value.categoryCode!,
        }
        this.categories$ = this.categoryService.insertCategory(data).subscribe(res=>{
            alert('Create category success')
            this.initCategory()
        })
    }

    onUpdateCategoryConfirm(){
       const data: CategoryUpdateReq = {
        categoryId:this.updateCategory.value.categoryId!,
        categoryName:this.updateCategory.value.categoryName!,
        categoryCode:this.updateCategory.value.categoryCode!,
        ver:this.updateCategory.value.ver!,
        isActive:this.updateCategory.value.active!
       }
       this.categories$ = this.categoryService.updateCategory(data).subscribe(res=>{
        alert('Update Category Success')
        this.initCategory()
       })
    }

    onDeleteCategory(categories:CategoryRes){
        console.log("delete")
        this.categories$ = this.categoryService.deleteCategory(categories.categoryId).subscribe(res=>{
            alert('Delete Success')
            this.initCategory()
        })
    }

    initCategory():void{
        this.getAllCategory$ = this.categoryService.getAllCategory().subscribe(res => {
            this.getAllCategory = res
        }) 
    }

    ngOnDestroy(): void {
       this.getAllCategory$?.unsubscribe()
    }

}
