// <<<<<<< HEAD
import { formatDate } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { BankPaymentRes } from "@dto/bankpayment/bank-payment-res";
import { IndustryRes } from "@dto/industry/industry-res";
import { PositionRes } from "@dto/position/postion-res";
import { ProfileResDetail } from "@dto/profile/profile-res-detail";
import { faHeart, faComment, faBook, faNewspaper, faPeopleGroup,faPenToSquare, faGlobe} from '@fortawesome/free-solid-svg-icons';
import { BankPaymentService } from "@service/bankpayment.service";
import { IndustryService } from "@service/industry.service";
import { PositionService } from "@service/position.service";
import { ProfileService } from "@service/profile.service";
import { UserService } from "@service/user.service";
import { Subscription } from "rxjs";
import { bankList } from "projects/base-area/src/app/constant/bank.service";
import { SocmedService } from "@service/socmed.service";
import { SocialMediaGetRes } from "@dto/socialmedia/social-media-res";
import { getInitials } from "projects/base-area/src/app/utils/getInitial";

const countryService= require('countrycitystatejson')


@Component({
    selector : 'app-profile',
    templateUrl : 'profile.component.html'
})


export class ProfileComponent implements OnInit, OnDestroy {

    faHeart = faHeart
    faComment = faComment
    faBook = faBook
    faNewspaper = faNewspaper
    faPeopleGroup = faPeopleGroup
    faPenToSquare = faPenToSquare
    faGlobe = faGlobe

    countries : any
    cities : any
    states : any

    getPosition : PositionRes[] = []
    getIndustry : IndustryRes[] = []
    getBankPayment : BankPaymentRes[] = []
    getProfile? : ProfileResDetail
    getBank = bankList
    getSocmed : SocialMediaGetRes[] = []

    position$? : Subscription
    industry$? : Subscription
    bankPaymnet$? : Subscription
    location$? : Subscription
    profile$? : Subscription
    socmed$? : Subscription

    // selectedPosition! : PositionRes
    // selectedIndustry! : IndustryRes
    selectedBank! : BankPaymentRes
    selectedContries! : string

    photoName = ""

    walletMember = this.fb.group({
        bankPaymentName : [""],
        accountNumber : [""],
        accountName : [""]
    })

    socmedMember = this.fb.group({
        userId : [""],
        socialMediaId : [""],
        url : [""],
        isActive : [true],
        ver : [0]
    })

    editProfile = this.fb.group({
        userId : [""],
        industryId : [""],
        positionId : [""],
        statusMemberId : [""],
        fullname : [""],
        email : [""],
        userBalance : [0],
        statusMember : [""],
        phoneNumber : [""],
        dob : [""],
        country : [""],
        province : [""],
        city : [""],
        postalCode : [""],
        company : [""],
        imageId : [""],
        socialMediaList : this.fb.array([]),
        ver : [0],
        isActive : [true]
    })

    constructor(
        private fb : FormBuilder,
        private title : Title,
        private industryService : IndustryService,
        private positionService : PositionService,
        private bankPaymentService : BankPaymentService,
        private profileService : ProfileService,
        private userService : UserService,
        private socialMediaService : SocmedService
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

    initBankPayment(){
        this.bankPaymnet$ = this.bankPaymentService.getAllBankPayment().subscribe(res => {
            this.getBankPayment = res
        })
    }

    selectedCountry(){
        this.countries = countryService.getCountries()

        this.editProfile.get("country")?.valueChanges.subscribe(result => {
            const country = result as any
            this.states = countryService.getStatesByShort(country)
            // console.log(this.states);
        })
        this.editProfile.get("province")?.valueChanges.subscribe(result => {
            const state = result as any
            // console.log(state);
            const contry = this.editProfile.get("country")?.value as any
            // console.log(contry.shortName);
            this.cities = countryService.getCities( contry, state )
        })
    }

    initSocialMedia(){
        this.socmed$ = this.socialMediaService.getAllSocmed().subscribe(res=>{
            this.getSocmed = res
        })
    }

    initProfile(){
        this.profile$ = this.profileService.getProfileDetail().subscribe(res => {
            this.photoName = getInitials(res.fullname)
            this.editProfile.patchValue({
                userId : res.userId,
                industryId : res.industryId,
                positionId : res.positionId,
                statusMemberId : res.statusMember,
                fullname : res.fullname,
                email : res.email,
                userBalance : res.userBalance,
                statusMember : res.statusMember,
                phoneNumber : res.phoneNumber,
                dob : res.dob,
                country : res.country,
                province : res.province,
                city : res.city,
                postalCode : res.postalCode,
                company : res.company,
                imageId : res.imageId,
                socialMediaList : res.socialMediaList,
                ver : res.ver,
                isActive : res.isActive
            })
        })
    }

    ngOnInit(): void {
       this.initPostion()
       this.initIndustry()
       this.initBankPayment()
       this.selectedCountry()
       this.initProfile()
       this.initSocialMedia()
        
        
        // this.citis = countryService.get
        // console.log(countryService.getCountries())
        // console.log(countryService.getStatesByShort('ID'))
        // console.log(countryService.getCities('ID', 'Jakarta'))
    }

    ngOnDestroy(): void {
        throw new Error("Method not implemented.");
    }


}
