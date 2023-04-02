import { AccordionModule } from 'primeng/accordion';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { faBook, faHeart, faNewspaper, faPeopleGroup } from '@fortawesome/free-solid-svg-icons';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription, min } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { convertUTCToLocalDateISO, convertUTCToLocalDateTimeISO } from 'projects/base-area/src/app/utils/dateutil';
import { UserService } from '../../../../../../base-area/src/app/services/user.service';
import { PostTypeService } from '@service/posttype.service';
import { CategoryRes } from '@dto/category/category-res';
import { ActivityService } from '@service/activity.service';
import { CategoryService } from '@service/category.service';
import { PostService } from '@service/post.service';
import { ActivityTypeService } from '@service/activitytype.service';
import { ActivityReq } from '@dto/activity/activity-req';
import { ACTIVITY_TYPE } from 'projects/base-area/src/app/constant/activity-type';


@Component({
    selector : 'app-create-course',
    templateUrl : './course-create.component.html'
})

export class CreateCourseComponent implements OnInit, OnDestroy{

  courseFb = this.fb.group({
    title: ["",  [Validators.required, Validators.minLength(40)]],
    description: ["",  Validators.required, Validators.minLength(40)],
    provider: ["",  Validators.required],
    location: ["",  Validators.required],
    price: [0,  Validators.required],
    imageCover: this.fb.group({
      fileTitle: [""],
      contentFile:[""],
      fileExt:[""]
    }),
    category: [{},  Validators.required],
    startDateCourse:["",  Validators.required],
    endDateCourse:["",  Validators.required],
    codeVoucher:[""],
    limit:[0],
    expiredDate:[""],
    discount:[0],
  })



  private categories$?: Subscription
  private activity$?: Subscription

  categories!: CategoryRes[]
  today = new Date()
  startDate = new Date()
  activityTypeId!: string

  imageSource!:SafeResourceUrl


  constructor(private fb: FormBuilder, private _sanitizer: DomSanitizer,  private categoryService: CategoryService,
    private postTypeService: PostTypeService, private postService: PostService, private activityTypeService: ActivityTypeService,
    private activityService: ActivityService, private userService: UserService){}


    faHeart = faHeart
    faBook = faBook
    faNewspaper = faNewspaper
    faPeopleGroup = faPeopleGroup

    memberStatus!: string

    initCategories(){
      this.categories$ = this.categoryService.getAllCategory().subscribe(res => this.categories = res)
    }

    onRemoveImageCover(){
      this.imageSource = ""
      this.courseFb.get('imageCover')?.reset()
    }

    addFiles(contentFile: string, fileExt: string) {
      this.courseFb.get('imageCover')?.patchValue({
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

    onCreateCourse(){
      const courseStartDate = this.courseFb.value.startDateCourse && convertUTCToLocalDateTimeISO(this.courseFb.value.startDateCourse)
      const courseEndDate = this.courseFb.value.startDateCourse && convertUTCToLocalDateTimeISO(this.courseFb.value.endDateCourse)
      const data:ActivityReq = {
        title : this.courseFb.value.title!,
        content: this.courseFb.value.description!,
        providers: this.courseFb.value.provider!,
        typeId: this.activityTypeId!,
        activityLocation: this.courseFb.value.location!,
        price: this.courseFb.value.price!,
        categoryId: this.courseFb.value.category!['categoryId']!,
        startDate: courseStartDate!,
        endDate: courseEndDate!,
        limitApplied: this.courseFb.value.limit!,
        voucherCode: this.courseFb.value.codeVoucher!,
        endAt: this.courseFb.value.expiredDate!,
        discountPercent: this.courseFb.value.discount!,
        file: {
          fileContent: this.courseFb.get('imageCover')?.value.contentFile!,
          extension: this.courseFb.get('imageCover')?.value.fileExt!
        }
      }

      this.activity$ = this.activityService.insertActivity(data).subscribe(res =>{
        console.log(res)
      })

    }


    // onCreateArticle(){
    //   const data:ArticleReq={
    //     title:this.createArticle.value.title!,
    //     content:this.createArticle.value.content!
    //   }
    //   const files = this.createArticle.value.imageArticle
    //     data.fileContent = files?.contentFile!
    //     data.extensions = files?.fileExt!
    //   this.createArticle$ = this.articleService.insertArticle(data).subscribe(res=>{
    //     alert('create article success')
    //     this.router.navigateByUrl('admin/article')
    //   })
    // }

    ngOnInit(): void {
    this.initCategories()
    this.courseFb.get("startDateCourse")?.valueChanges.subscribe(res => this.startDate = new Date(res!) )
    this.activity$ = this.activityTypeService.getActivityTypeByCode(ACTIVITY_TYPE.COURSE).subscribe(res => this.activityTypeId = res.activityTypeId)
    this.memberStatus =  this.userService.getMemberCode()
  }

  ngOnDestroy(): void {
    this.categories$?.unsubscribe()
  }
}
