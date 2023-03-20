import { AccordionModule } from 'primeng/accordion';
import { ActivatedRouteSnapshot, RouterLink } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from "primeng/api";
import { faHeart, faComment, faBook, faNewspaper, faPeopleGroup } from '@fortawesome/free-solid-svg-icons';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { CategoryRes } from '../../../../../base-area/src/app/dto/category/category-res';
import { CategoryService } from '../../../../../base-area/src/app/services/category.service';
import { PostTypeGetRes } from '../../../../../base-area/src/app/dto/posttype/post-type-res';
import { PostService } from '../../../../../base-area/src/app/services/post.service';
import { PostTypeService } from '../../../../../base-area/src/app/services/posttype.service';
import { PostReq } from '@dto/post/post-req';
import { AttachmentPostInsertReq } from '../../../../../base-area/src/app/dto/post/attachment-post-insert-req';
import { PollingInsertReq } from '@dto/post/polling-insert-req';
import { PollingOptionRes } from '../../../../../base-area/src/app/dto/post/polling-option-res';
import { convertLocalDateToUTCISO, convertUTCToLocalDateISO } from 'projects/base-area/src/app/utils/dateutil';

@Component({
    selector : 'app-post-member',
    templateUrl : './post.component.html'
})

export class PostComponent implements OnInit{

  private caetgories$?: Subscription
  private postTypes$?: Subscription

  categories!: CategoryRes[]
  postTypes!: PostTypeGetRes[]
  uploadedFiles: any[] = []

  today = new Date()


  constructor(private fb: FormBuilder, private _sanitizer: DomSanitizer,  private categoryService: CategoryService,
    private postTypeService: PostTypeService, private postService: PostService){}


  postFb = this.fb.group({
    title: ["",  Validators.required],
    description: ["",  Validators.required],
    files: this.fb.array([]),
    category: [{},  Validators.required],
    postType: [{},  Validators.required],
    pollingTitle:["",  Validators.required],
    endAt:["",  Validators.required],
    pollingOptions: this.fb.array([])
  })

  get pollingOptions(): any{
    return this.postFb.get('pollingOptions') as FormArray
  }

  addOption() {
    const option = new FormControl('');
    this.pollingOptions.push(option);
    // console.log(this.pollingOptions.value);
  }

  removeOption(index: number) {
    this.pollingOptions.removeAt(index);
    console.log(this.pollingOptions.value);
  }


  type = this.postFb.value.postType!['postTypeCode']

  faHeart = faHeart
  faBook = faBook
  faNewspaper = faNewspaper
  faPeopleGroup = faPeopleGroup


  get uploads(){
    return this.postFb.get("files") as FormArray
  }

  addFiles(contentFile: string, fileExt:string){
    this.uploads.push(new FormGroup({
      fileTitle : new FormControl(Date.now().toString()),
      contentFile: new FormControl(contentFile),
      fileExt: new FormControl(fileExt),

    }))
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

    for (let file of event.files) {
      toBase64(file).then(result => {
        const resultBase64 = result.substring(result.indexOf(",") + 1, result.length)
        const resultExtension = file.name.substring(file.name.lastIndexOf(".") + 1, file.name.length)

        this.addFiles(resultBase64,resultExtension)
        // this.base64Image(resultBase64)
        // console.log(this.base64Image)
      })
    }
  }

  onRemove(event: any) {
    const filter = this.uploadedFiles.map((f, i) => {
        if (f.name == event.file.name) {
            return i
        } else {
            return -1
        }
    }).filter(f => f != -1)

    if (filter && filter.length) {
        this.uploads.removeAt(filter[0])
        this.uploadedFiles.splice(filter[0], 1)
    }
}

onClear() {
  this.uploadedFiles = []
  this.postFb.value.files = []
}

  onPost(){
    const pollingOptions:PollingOptionRes[] = []
    const attachmentPost:AttachmentPostInsertReq[] = []
    console.log(this.pollingOptions.value);

    // console.log("upload files: " +JSON.stringify(this.uploads.value))

    const files = this.uploads.value

    for (const file of files) {
      attachmentPost.push(
        {
          fileContent : file.contentFile,
          extensions: file.fileExt
        }
      )
    }

  //   if (this.files.length) {
  //     data.file = []
  //     this.file.value.forEach((f: any) => {
  //         const fileTemp = f as any
  //         data.file?.push({ ...fileTemp })
  //     })
  // }

    // console.log("file to upload: " + JSON.stringify(files))

    const options = this.pollingOptions.value
    for (const option of options) {
      pollingOptions.push({
        pollingContent : option
      })
    }
    console.log("polling Option : " + JSON.stringify(pollingOptions))

    // const dateStr = this.postFb.value.endAt?.toString().split("T")
    // console.log(dateStr)
    const strDate = this.postFb.value.endAt && convertUTCToLocalDateISO(this.postFb.value.endAt)
    console.log(strDate)
    const pollingInsert:PollingInsertReq = {
      pollingTitle: this.postFb.value.pollingTitle!,
      endAt: strDate!,
      pollingOptions,
    }

    const dataInsert: PostReq = {
      title: this.postFb.value.title!,
      content: this.postFb.value.description!,
      typeId: this.postFb.value.postType!['postTypeId'],
      categoryId: this.postFb.value.category!['categoryId'],
      attachmentPost,
      pollingInsert
    }

      this.postService.insertPost(dataInsert).subscribe(res => {
        // this.routerLink.navigateByUrl
        console.log(res)
      })


  }

  initCategories(){
    this.caetgories$ = this.categoryService.getAllCategory().subscribe(res => this.categories = res)
  }

  initPostType(){
    this.postTypes$ = this.postTypeService.getAllPostType().subscribe(res => this.postTypes = res)
  }

  ngOnInit(): void {

   this.initCategories()
   this.initPostType()
   console.log(this.postTypes)
  }

}
