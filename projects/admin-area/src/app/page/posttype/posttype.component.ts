import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { PostTypeReq } from "@dto/posttype/post-type-req";
import { PostTypeGetRes } from "@dto/posttype/post-type-res";
import { PostTypeUpdateReq } from "@dto/posttype/post-type-update-req";
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


    displayDelete!:boolean
    showDeleteDialog(){
        this.displayDelete = true
    }

    displayUpdate!:boolean
    showUpdateDialog(postType:PostTypeGetRes){
        console.log(postType)
        this.updatePostType.setValue({
            postTypeId : postType.postTypeId,
            postTypeName : postType.postTypeName,
            postTypeCode : postType.postTypeCode,
            ver : postType.ver,
            isActive : postType.isActive
        })
        this.displayUpdate = true

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

    updatePostType = this.fb.group({
        postTypeId : [""],
        postTypeName : [""],
        postTypeCode : [""],
        ver : [0],
        isActive : [true]
    })

    onDeletePostType(postType:PostTypeGetRes){
        console.log('delete')
        this.postType$ = this.postTypeService.deletePostType(postType.postTypeId).subscribe(res => {
            alert('Delete Success')
            this.initPostType()
        })

    }

    onUpdatePostType(){
        const data : PostTypeUpdateReq = {
            postTypeId : this.updatePostType.value.postTypeId!,
            postTypeName : this.updatePostType.value.postTypeName!,
            postTypeCode : this.updatePostType.value.postTypeCode!,
            ver : this.updatePostType.value.ver!,
            isActive : this.updatePostType.value.isActive!
        }

        this.postTypeUpadte$ = this.postTypeService.updatePostType(data).subscribe(res => {
            alert('Update Post Type Success')
            this.initPostType()
        })
    }

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
