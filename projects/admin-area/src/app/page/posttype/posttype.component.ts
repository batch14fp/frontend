import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { PostTypeReq } from "@pojo/posttype/post-type-req";
import { PostTypeGetRes } from "@pojo/posttype/post-type-res";
import { PostTypeService } from "projects/base-area/src/app/services/posttype.service";
import { Subscription } from "rxjs";

@Component({
    selector : 'app-post-type',
    templateUrl : 'posttype.component.html'
})

export class PostTypeComponent implements OnInit,OnDestroy{

    getPostType : PostTypeGetRes [] = []

    private getPostType$? : Subscription
    private postType$? : Subscription
    private postTypeUpadte$? : Subscription
    private postTypeDelete$? : Subscription

    displayResponsive!:boolean
    showResponsiveDialog(){
        this.displayResponsive = true
    }

    displayUpdate!:boolean
    showUpdateDialog(postType: PostTypeReq){
        console.log(postType)

        
    }

    constructor(
        private fb : FormBuilder,
        private postTypeService : PostTypeService,
        private router : Router,
        private title : Title){
            this.title.setTitle('Post Type')
    
    }

    createPostType = this.fb.group({
        postTypeName : [""],
        postTypeCode : [""]
    })

    onCreatePostType(){
        const data: PostTypeReq = {
            postTypeName:this.createPostType.value.postTypeName!,
            postTypeCode:this.createPostType.value.postTypeCode!
        }
        this.postType$ = this.postTypeService.insertPostType(data).subscribe(res=>{
            alert('Create Post Type Success')
        })
    }

    initPostType() : void{
        this.getPostType$ = this.postTypeService.getAllPostType().subscribe(res => {
            this.getPostType = res
        })
    }
    ngOnInit(): void {
        this.initPostType()
    }
    ngOnDestroy(): void {
        this.getPostType$?.unsubscribe()
    }
     
}