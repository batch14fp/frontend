import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { PasswordReqUpdate } from "@dto/profile/password-req-update";
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
        oldPassword : [""],
        newPassword :[""],
        ver: [0]
    })

    onSave(){
        const data : PasswordReqUpdate = {
            oldPassword : this.formPass.value.oldPassword!,
            newPassword : this.formPass.value.newPassword!,
            ver : this.formPass.value.ver!
        }

        this.profile$ = this.profileService.updatePass(data).subscribe(res=>{
            alert('Update Password Success')
        })
    }



    ngOnInit(): void {
    //   this.initProfile()
    }
    ngOnDestroy(): void {
        this.profile$?.unsubscribe()
    }

    
}