import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { PositionReq } from "@dto/position/position-req";
import { PositionUpdateReq } from "@dto/position/position-update-req";
import { PositionRes } from "@dto/position/postion-res";
import { PositionService } from "projects/base-area/src/app/services/position.service";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-position',
    templateUrl: './position.component.html'
})

export class PositionComponent implements OnInit, OnDestroy{
    private positions$?:Subscription
    private positionsUpdate$?:Subscription
    private positionDelete$?:Subscription

    getAllPosition:PositionRes[] = []
    displayResponsive!:boolean
    showResponsiveDialog(){
        this.displayResponsive = true
    }

    displayUpdate!:boolean
    showUpdateDialog(position:PositionRes){
        console.log(position)
        this.updatePosition.setValue({
            positionId:position.positionId,
            positionName:position.positionName,
            positionCode:position.positionCode,
            active:position.isActive,
            ver:position.ver
        })
        this.displayUpdate = true
    }

    displayDelete!: boolean
    showDeleteDialog() {
        this.displayDelete = true
    }

    createPosition = this.fb.group({
        positionName:[""],
        positionCode:[""],
    })

    updatePosition = this.fb.group({
        positionId:[""],
        positionName:[""],
        positionCode:[""],
        ver:[0],
        active:[true]
    })

    constructor(private fb: FormBuilder,private title : Title, private positionService:PositionService,
        private router:Router){
        this.title.setTitle('position')
    }

    onCreatePosition(){
        const data:PositionReq = {
            positionCode:this.createPosition.value.positionCode!,
            positionName:this.createPosition.value.positionName!,
        }
        this.positions$ = this.positionService.insertPosition(data).subscribe(res=>{
            alert('Create position success')
            this.initPosition()
        })

    }

    onUpdatePositionConfirm() {
        const data: PositionUpdateReq = {
            positionId: this.updatePosition.value.positionId!,
            positionName: this.updatePosition.value.positionName!,
            positionCode:this.updatePosition.value.positionCode!,
            ver: this.updatePosition.value.ver!,
            isActive: this.updatePosition.value.active!
        }
        this.positionsUpdate$ = this.positionService.updatePosition(data).subscribe(res => {
            alert('Update Position Success')
            this.initPosition()
        })
    }

    onDeletePosition(position:PositionRes) {
        console.log("delete")
        this.positionDelete$ = this.positionService.deletePosition(position.positionId).subscribe(res => {
            alert('Delete Success')
            this.initPosition()
        })
    }

    initPosition():void{
        this.positions$ = this.positionService.getAllPosition().subscribe(res=>{
            this.getAllPosition = res
        })
    }

    ngOnDestroy(): void {
        this.positions$?.unsubscribe()
        this.positionsUpdate$?.unsubscribe()
    }
    ngOnInit(): void {
        this.initPosition()
    }

    
}