import { formatDate } from "@angular/common";
import { AfterContentChecked, ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { DomSanitizer, SafeResourceUrl, Title } from "@angular/platform-browser";
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
import { ProfileReqUpdate } from "@dto/profile/profile-req-update";
import { Router } from "@angular/router";
import { convertLocalDateToUTCISO } from "projects/base-area/src/app/utils/dateutil";
import { ActivityUpcomingAllRes } from "@dto/activity/activity-upcoming-all-res";
import { truncateString } from "projects/base-area/src/app/utils/turncateString";
import { ActivityService } from "@service/activity.service";
import { MEMBER_STATUS } from "projects/base-area/src/app/constant/member-status";
import { MenuItem } from "primeng/api";

const countryService= require('countrycitystatejson')


@Component({
    selector : 'app-profile',
    templateUrl : 'profile.component.html'
})


export class ProfileComponent implements OnInit, OnDestroy , AfterContentChecked{

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
    upcomingEvents$?: Subscription
    upcomingEvents?:ActivityUpcomingAllRes


    // selectedPosition! : PositionRes
    // selectedIndustry! : IndustryRes
    selectedBank! : BankPaymentRes
    selectedContries! : string

    memberStatus!: string
    imageIdProfile= ""
    fullNameLogin=""
    memberReguler = MEMBER_STATUS.REGULAR

    imageSource!:SafeResourceUrl

    photoName = ""

    accountMenu: MenuItem[] = [
      { label: 'Profile', icon: 'pi pi-fw pi-user', command: e=> this.router.navigateByUrl("/profile") },
      { label: 'My Transaction', icon: 'pi pi-fw pi-credit-card', command: e=> this.router.navigateByUrl("/my-transaction") },
      { label: 'Report Activity', icon: 'pi pi-fw pi-chart-bar', command: e=> this.router.navigateByUrl("/report-activity") },
      { label: 'Report Income', icon: 'pi pi-fw pi-dollar', command: e=> this.router.navigateByUrl("/report-income") },
      { label: 'My Course', icon: 'pi pi-fw pi-book', command: e=> this.router.navigateByUrl("/my-course") },
      { label: 'My Events', icon: 'pi pi-fw pi-calendar', command: e=> this.router.navigateByUrl("/my-event") },
      { label: 'My Bookmark', icon: 'pi pi-fw pi-bookmark', command: e=> this.router.navigateByUrl("/my-bookmark") },

      { label: 'Logout', icon: 'pi pi-fw pi-sign-out', command: e=> this.onLogOut() },
    ];

    editProfile = this.fb.group({
        userId : [""],
        profileId : [""],
        industryId : [""],
        positionId : [""],
        statusMemberId : [""],
        fullname : [""],
        email : [""],
        walletId : [""],
        userBalance : [0],
        statusMember : [""],
        accountName : [""],
	    accountNumber :[""],
        phoneNumber : [""],
        dob : [new Date()],
        dobUtc : [new Date()],
        country : [""],
        province : [""],
        city : [""],
        postalCode : [""],
        company : [""],
        imageId : [""],
        imageVer : [0],
        file : this.fb.group({
            fileContent : [""],
            extension : [""]
        }),
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
        private socialMediaService : SocmedService,
        private ref : ChangeDetectorRef,
        private _sanitizer: DomSanitizer,
        private router : Router,
        private activityService: ActivityService
    ){
        this.title.setTitle('Edit Profile')
    }

    ngAfterContentChecked(): void {
       this.ref.detectChanges();
    }

    get socialMediaList(){
        return this.editProfile.get('socialMediaList') as FormArray
    }

    addFiles(fileContent: string, extension: string) {
        this.editProfile.get('file')?.patchValue({
            fileContent: (fileContent),
            extension: (extension),
        })
    }

    onUpload(event: any) {
        const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            if (typeof reader.result === "string") resolve(reader.result)
          };
          reader.onerror = error => reject(error);
        });


        for (let file of event.target.files) {
          toBase64(file).then(result => {
            const resultBase64 = result.substring(result.indexOf(",") + 1, result.length)
            const resultExtension = file.name.substring(file.name.lastIndexOf(".") + 1, file.name.length)

            this.addFiles(resultBase64, resultExtension)

            this.imageSource = this._sanitizer.bypassSecurityTrustResourceUrl(`data:image/${resultExtension};base64, ${resultBase64}`);

          })
        }
    }

    onUpdateProfile() : void {

        const data : ProfileReqUpdate = {
            profileId : this.editProfile.value.profileId!,
            fullname : this.editProfile.value.fullname!,
            company : this.editProfile.value.company!,
            country : this.editProfile.value.country!,
            province : this.editProfile.value.province!,
            city : this.editProfile.value.city!,
            dob : this.editProfile.value.dob!,
            walletId : this.editProfile.value.walletId!,
            postalCode : this.editProfile.value.postalCode!,
            industryId : this.editProfile.value.industryId!,
            positionId : this.editProfile.value.positionId!,
            phoneNumber : this.editProfile.value.phoneNumber!,
            file : {
                fileId : this.editProfile.value.imageId!,
                fileContent: this.editProfile.value.file?.fileContent!,
                extension: this.editProfile.value.file?.extension!,
                ver : Number(this.editProfile.value.imageVer!),
                isActive : true
            },
            ver : this.editProfile.value.ver!,
	        isActive : this.editProfile.value.isActive!
        }

        this.profile$ = this.profileService.updateProfile(data).subscribe(res=>{
            this.router.navigateByUrl('/profile')
        })

    }

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

    onChange(){
        const res = convertLocalDateToUTCISO(this.editProfile.value.dobUtc)
        this.editProfile.patchValue({
            dob : new Date(res)
        })
    }

    fotoName(name: string){
      return getInitials(name)
    }

    turncate(str:string){
      return truncateString(str, 20)
    }

    initUpcomingEvents(){
      this.upcomingEvents$ = this.activityService.getUpcomingEvent(0,3).subscribe(res =>{
        this.upcomingEvents = res
        console.log(res)
      })
    }

    initProfile(){
        this.profile$ = this.profileService.getProfileDetail().subscribe(res => {
            this.photoName = getInitials(res.fullname)
            this.editProfile.patchValue({
                userId : res.userId,
                profileId : res.profileId,
                industryId : res.industryId,
                positionId : res.positionId,
                statusMemberId : res.statusMember,
                fullname : res.fullname,
                email : res.email,
                userBalance : res.userBalance,
                statusMember : res.statusMember,
                phoneNumber : res.phoneNumber,
                walletId : res.walletId,
                dob : new Date(res.dob),
                dobUtc : new Date(res.dob),
                country : res.country,
                province : res.province,
                city : res.city,
                postalCode : res.postalCode,
                company : res.company,
                imageId : res.imageId,
                imageVer : res.imageVer,
                socialMediaList : [],
                ver : res.ver,
                isActive : res.isActive
            })

            for(let i = 0; i < this.getSocmed.length ; i++ ){
                // console.log(this.getSocmed[i].socialMediaId);

                this.socialMediaList?.push(this.fb.group({

                    profileSocialMediaId : this.getSocmed[i].profileSocialMediaId,
                    socialMediaId : this.getSocmed[i].socialMediaId,
                    platformName : this.getSocmed[i].platformName,
                    url : this.getSocmed[i].url,
                    ver:this.getSocmed[i].ver,
                    isActive: this.getSocmed[i].isActive
                }))
            }
        })

    }

    onLogOut(){
      localStorage.clear()
      this.router.navigateByUrl("/")
    }


    ngOnInit(): void {
       this.initPostion()
       this.initIndustry()
       this.initBankPayment()
       this.selectedCountry()
       this.initProfile()
       this.initSocialMedia()
       this.initUpcomingEvents()
      this.memberStatus =  this.userService.getMemberCode()
      this.imageIdProfile = this.userService.getIdFotoProfile()
      this.fullNameLogin = this.userService.getFullName()
    }

    ngOnDestroy(): void {
        // position$?.unsubscribe()
        // industry$?.unsubscribe()
        // bankPaymnet$?.unsubscribe()
        // location$?.unsubscribe()
        // profile$?.unsubscribe()
        // socmed$?.unsubscribe()
    }


}
