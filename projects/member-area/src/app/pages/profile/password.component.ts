import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { faHeart, faComment, faBook, faNewspaper, faPeopleGroup,faPenToSquare, faGlobe} from '@fortawesome/free-solid-svg-icons';
import { ProfileService } from "@service/profile.service";
import { UserService } from "@service/user.service";
import { Subscription } from "rxjs";


@Component({
    selector : 'app-password',
    templateUrl : 'password.component.html'
})

export class ChangePasswordComponent implements OnInit, OnDestroy{
    faHeart = faHeart
    faComment = faComment
    faBook = faBook
    faNewspaper = faNewspaper
    faPeopleGroup = faPeopleGroup
    faPenToSquare = faPenToSquare
    faGlobe = faGlobe

    profile$? : Subscription

    constructor(
        private title : Title,
        private profileService: ProfileService,
        private userService : UserService,
        private fb : FormBuilder
        )
        {
            this.title.setTitle('Change Pasword')
    }

    formPass = this.fb.group({
        profileId : [""],
        oldPassword : [""],
        newPassword :[""],
        confirmNewPassword:[""],
        ver: [""]
    })
    // initUser(){

    // }

    initProfile(){
        this.profile$ = this.profileService.getProfileDetail().subscribe(res => {
            this.formPass.patchValue({
                
            })
        })
    }

    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }
    ngOnDestroy(): void {
        throw new Error("Method not implemented.");
    }

    
}