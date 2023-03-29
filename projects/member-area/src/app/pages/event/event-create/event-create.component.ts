import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { ActivityReq } from "@dto/activity/activity-req";
import { CategoryRes } from "@dto/category/category-res";
import { faBook, faHeart, faNewspaper, faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import { ActivityService } from "@service/activity.service";
import { ActivityTypeService } from "@service/activitytype.service";
import { CategoryService } from "@service/category.service";
import { PostService } from "@service/post.service";
import { PostTypeService } from "@service/posttype.service";
import { ACTIVITY_TYPE } from "projects/base-area/src/app/constant/activity-type";
import { convertUTCToLocalDateTimeISO } from "projects/base-area/src/app/utils/dateutil";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-create-event',
    templateUrl: './event-create.component.html'
})

export class EventCreateComponent implements OnInit, OnDestroy {
    private event$?: Subscription
    private categories$?: Subscription
    private activity$?: Subscription

    categories!: CategoryRes[]
    today = new Date()
    startDate = new Date()
    activityTypeId!: string

    imageSource!: SafeResourceUrl
    constructor(private fb: FormBuilder, private _sanitizer: DomSanitizer, private categoryService: CategoryService,
        private postTypeService: PostTypeService, private postService: PostService, private activityTypeService: ActivityTypeService,
        private activityService: ActivityService, private router:Router) { }


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

    ngOnDestroy(): void {
        this.event$?.unsubscribe()
    }
    ngOnInit(): void {
        this.initCategories()
        this.createEvents.get("startDateEvent")?.valueChanges.subscribe(res => this.startDate = new Date(res!))
        this.activity$ = this.activityTypeService.getActivityTypeByCode(ACTIVITY_TYPE.EVENT).subscribe(res => this.activityTypeId = res.activityTypeId)
    }

}