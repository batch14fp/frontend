// <<<<<<< HEAD
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { IndustryRes } from "@dto/industry/industry-res";
import { PositionRes } from "@dto/position/postion-res";
import { ProfileResDetail } from "@dto/profile/profile-res-detail";
import { faHeart, faComment, faBook, faNewspaper, faPeopleGroup,faPenToSquare, faGlobe} from '@fortawesome/free-solid-svg-icons';
import { IndustryService } from "@service/industry.service";
import { PositionService } from "@service/position.service";
import { Subscription } from "rxjs";
// =======
// import { Component, OnInit } from "@angular/core";
// >>>>>>> b8bad77bff9676d0cfcd8a6bab2118da39f79c5a

@Component({
    selector : 'app-profile',
    templateUrl : 'profile.component.html'
})

// <<<<<<< HEAD
export class ProfileComponent implements OnInit, OnDestroy {

    faHeart = faHeart
    faComment = faComment
    faBook = faBook
    faNewspaper = faNewspaper
    faPeopleGroup = faPeopleGroup
    faPenToSquare = faPenToSquare
    faGlobe = faGlobe

    getPosition : PositionRes[] = []
    getIndustry : IndustryRes[] = []

    position$? : Subscription
    industry$? : Subscription

    selectedPosition! : PositionRes
    selectedIndustry! : IndustryRes


    


    // showProfile(profile : ProfileResDetail){
    //     console.log(profile);
    //     this.editProfile.setValue({
    //         userId : profile.userId,
    //         fullname: profile.fullname,
    //         phoneNumber: profile.phoneNumber,
    //         country: profile.country,
    //         province: profile.province,
    //         city: profile.city,
    //         postalCode: profile.postalCode,
    //         company: profile.company,
    //         industryId: profile.industryId,
    //         poistionId: profile.positionId,
    //         socialmedia: profile,
    //         ver : profile.ver,
    //         isActive : profile.isActive
    //     })
        
    // }

    editProfile = this.fb.group({
        userId: [""],
        fullname: [""],
        phoneNumber: [""],
        country: [""],
        province: [""],
        city: [""],
        postalCode: [""],
        company: [""],
        industryId: [""],
        poistionId: [""],
        socialmedia: [[]],
        ver : [0],
        isActive : [true]
    })

    constructor(
        private fb : FormBuilder, 
        private title : Title,
        private industryService : IndustryService,
        private positionService : PositionService 
    ){}


    initPostion(){
        this.position$ = this.positionService.getAllPosition().subscribe(res => {
            this.getPosition = res
        })
    }

    initIndustry(){
        this.industry$ = this.industryService.getAllIndustry().subscribe(res => {
            this.getIndustry = res
        })
    }

    ngOnInit(): void {
       this.initPostion()
       this.initIndustry()
    }

    ngOnDestroy(): void {
        throw new Error("Method not implemented.");
    }


}
// =======


// export class ProfileComponent implements OnInit{


//   constructor(){}


//   ngOnInit(): void {
//     const countryService= require('countrycitystatejson')
//     console.log(countryService.getCountries())
//     console.log(countryService.getStatesByShort('ID'))
//     console.log(countryService.getCities('ID', 'Jakarta'))
//   }



// }
// >>>>>>> b8bad77bff9676d0cfcd8a6bab2118da39f79c5a
