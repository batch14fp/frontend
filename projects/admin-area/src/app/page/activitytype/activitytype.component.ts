import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { ActivityTypeReq } from "@dto/activitytype/activity-type-req";
import { ActivityTypeRes } from "@dto/activitytype/activity-type-res";
import { ActivityTypeUpdateReq } from "@dto/activitytype/activity-type-update-req";
import { ActivityTypeService } from "projects/base-area/src/app/services/activitytype.service";
import { Subscription } from "rxjs";

@Component({
    selector : 'app-activity-type',
    templateUrl : 'activitytype.component.html'
})

export class ActivityTypeComponent implements OnInit, OnDestroy{

    getAllactivityType : ActivityTypeRes [] = []

    private activityType$? : Subscription
    private getAllactivityType$? : Subscription

    disabled: boolean = true;

    displayResponsive!:boolean
    showResponsiveDialog(){
        this.displayResponsive = true
    }

    displayDelete!:boolean
    showDeleteDialog(){
        this.displayDelete = true
    }

    displayUpdate!:boolean
    showUpdateDialog(activityType:ActivityTypeRes){
        console.log(activityType);

        this.updateActivityType.setValue({
            activityTypeId : activityType.activityTypeId,
            typeName : activityType.typeName,
            typeCode : activityType.typeCode,
            isActive : activityType.isActive,
            ver : activityType.ver
        })
        this.displayUpdate = true
    }

    constructor(
        private fb : FormBuilder,
        private activityTypeService : ActivityTypeService,
        private router: Router,
        private title : Title
    ){
        this.title.setTitle('Activity Type')
    }

    createActivityType = this.fb.group({
        typeName : [""],
	    typeCode : [""]
    })

    updateActivityType = this.fb.group({
        activityTypeId : [""],
        typeName : [""],
        typeCode : [""],
        isActive : [true],
        ver : [0]
    })

    onDeleteActivityType(activitytype:ActivityTypeRes){
        console.log("delete")
        this.activityType$ = this.activityTypeService.deleteActivityType(activitytype.activityTypeId).subscribe(res=>{
            alert('Delete Success')
            this.initActivityType()
        })

    }

    onUpdateActivityType(){
        const data : ActivityTypeUpdateReq = {
            activityTypeId : this.updateActivityType.value.activityTypeId!,
            typeName : this.updateActivityType.value.typeName!,
            typeCode : this.updateActivityType.value.typeCode!,
            isActive : this.updateActivityType.value.isActive!,
            ver : this.updateActivityType.value.ver!
        }
        this.activityType$= this.activityTypeService.updateActivityType(data).subscribe(res=>{
            alert('Update Activity Type Success')
            this.initActivityType()
        })
    }

    onCreateActivityType(){
        const data:ActivityTypeReq = {
            typeName:this.createActivityType.value.typeName!,
            typeCode:this.createActivityType.value.typeCode!
        }
        this.activityType$ = this.activityTypeService.insertActivityType(data).subscribe(res=>{
            alert('Create Activity Type Success')
            this.initActivityType
        })
    }

    initActivityType(){
        this.getAllactivityType$ = this.activityTypeService.getAllActivityType().subscribe(res => {
            this.getAllactivityType = res
        })
    }

    ngOnInit(): void {
       this.initActivityType()
    }

    ngOnDestroy(): void {
        this.getAllactivityType$?.unsubscribe()
    }



}
