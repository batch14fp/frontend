import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { ActivityReq } from "@dto/activity/activity-req";
import { ActivityUpcomingAllRes } from "@dto/activity/activity-upcoming-all-res";
import { CategoryRes } from "@dto/category/category-res";
import { faBook, faHeart, faNewspaper, faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import { ActivityService } from "@service/activity.service";
import { ActivityTypeService } from "@service/activitytype.service";
import { CategoryService } from "@service/category.service";
import { PostService } from "@service/post.service";
import { PostTypeService } from "@service/posttype.service";
import { UserService } from "@service/user.service";
import { MenuItem } from "primeng/api";
import { ACTIVITY_TYPE } from "projects/base-area/src/app/constant/activity-type";
import { MEMBER_STATUS } from "projects/base-area/src/app/constant/member-status";
import { convertUTCToLocalDateTimeISO } from "projects/base-area/src/app/utils/dateutil";
import { getInitials } from "projects/base-area/src/app/utils/getInitial";
import { truncateString } from "projects/base-area/src/app/utils/turncateString";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-create-event',
    templateUrl: './event-create.component.html'
})

export class EventCreateComponent implements OnInit, OnDestroy {
    private event$?: Subscription
    private categories$?: Subscription
    private activity$?: Subscription
    private upcomingEvents$?: Subscription

    upcomingEvents?:ActivityUpcomingAllRes
    categories!: CategoryRes[]
    today = new Date()
    startDate = new Date()
    activityTypeId!: string
    memberStatus!: string
    imageIdProfile= ""
    fullNameLogin=""
    memberReguler = MEMBER_STATUS.REGULAR

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

    imageSource!: SafeResourceUrl
    constructor(private fb: FormBuilder, private _sanitizer: DomSanitizer, private categoryService: CategoryService,
        private postTypeService: PostTypeService, private postService: PostService, private activityTypeService: ActivityTypeService,
        private activityService: ActivityService, private router:Router, private userService: UserService) { }


    faHeart = faHeart
    faBook = faBook
    faNewspaper = faNewspaper
    faPeopleGroup = faPeopleGroup

    createEvents = this.fb.group({
        title: ["", Validators.required],
        description: ["", Validators.required],
        provider: ["", Validators.required],
        location: ["", Validators.required],
        price: [0, Validators.required],
        imageCover: this.fb.group({
            fileTitle: [""],
            contentFile: [""],
            fileExt: [""]
        }),
        category: [{}, Validators.required],
        startDateEvent: ["", Validators.required],
        endDateEvent: ["", Validators.required],
        codeVoucher: ["", Validators.required],
        limit: [0, Validators.required],
        expiredDate: ["", Validators.required],
        discount: [0, Validators.required],
    })

    initCategories() {
        this.categories$ = this.categoryService.getAllCategory().subscribe(res => this.categories = res)
    }

    onRemoveImageCover() {
        this.imageSource = ""
        this.createEvents.get('imageCover')?.reset()
    }

    addFiles(contentFile: string, fileExt: string) {
        this.createEvents.get('imageCover')?.patchValue({
            fileTitle: (Date.now().toString()),
            contentFile: (contentFile),
            fileExt: (fileExt),

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

    onCreateEvents() {
        const eventStartDate = this.createEvents.value.startDateEvent && convertUTCToLocalDateTimeISO(this.createEvents.value.startDateEvent)
        const eventEndDate = this.createEvents.value.startDateEvent && convertUTCToLocalDateTimeISO(this.createEvents.value.endDateEvent)
        const data: ActivityReq = {
            title: this.createEvents.value.title!,
            content: this.createEvents.value.description!,
            providers: this.createEvents.value.provider!,
            typeId: this.activityTypeId!,
            activityLocation: this.createEvents.value.location!,
            price: this.createEvents.value.price!,
            categoryId: this.createEvents.value.category!['categoryId']!,
            startDate: eventStartDate!,
            endDate: eventEndDate!,
            limitApplied: this.createEvents.value.limit!,
            voucherCode: this.createEvents.value.codeVoucher!,
            endAt: this.createEvents.value.expiredDate!,
            discountPercent: this.createEvents.value.discount!,
            file: {
                fileContent: this.createEvents.get('imageCover')?.value.contentFile!,
                extension: this.createEvents.get('imageCover')?.value.fileExt!
            }
        }

        this.activity$ = this.activityService.insertActivity(data).subscribe(res => {
            console.log(res)
            this.router.navigateByUrl("/events")
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

    onLogOut(){
      localStorage.clear()
      this.router.navigateByUrl("/")
    }

    ngOnDestroy(): void {
        this.event$?.unsubscribe()
    }
    ngOnInit(): void {
      this.initUpcomingEvents()
      this.memberStatus =  this.userService.getMemberCode()
      this.imageIdProfile = this.userService.getIdFotoProfile()
      this.fullNameLogin = this.userService.getFullName()
        this.initCategories()
        this.createEvents.get("startDateEvent")?.valueChanges.subscribe(res => this.startDate = new Date(res!))
        this.activity$ = this.activityService.getActivityTypeByCode(ACTIVITY_TYPE.EVENT).subscribe(res => this.activityTypeId = res.activityTypeId)
    }

}
