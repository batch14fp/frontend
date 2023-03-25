import { AccordionModule } from 'primeng/accordion';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { faBook, faHeart, faNewspaper, faPeopleGroup } from '@fortawesome/free-solid-svg-icons';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { FormBuilder, Validators } from '@angular/forms';
import { PostTypeService } from '../../../../../../base-area/src/app/services/posttype.service';
import { PostService } from '../../../../../../base-area/src/app/services/post.service';
import { CategoryService } from '../../../../../../base-area/src/app/services/category.service';
import { Subscription } from 'rxjs';
import { CategoryRes } from '../../../../../../base-area/src/app/dto/category/category-res';

@Component({
    selector : 'app-create-course',
    templateUrl : './course-create.component.html'
})

export class CreateCourseComponent implements OnInit, OnDestroy{

  courseFb = this.fb.group({
    title: ["",  Validators.required],
    description: ["",  Validators.required],
    provider: ["",  Validators.required],
    location: ["",  Validators.required],
    price: [0,  Validators.required],
    imageCover: this.fb.group({
      fileTitle: [""],
      contentFile:[""],
      fileExt:[""]
    }),
    category: [{},  Validators.required],
    startDateVoucher:["",  Validators.required],
    endDateVoucher:["",  Validators.required],
    codeVoucher:["",  Validators.required],
    limit:[0,  Validators.required],
    expiredDate:["",  Validators.required],
    discount:[0,  Validators.required],
  })



  private categories$?: Subscription

  categories!: CategoryRes[]

  today = new Date()
  startDate = new Date()

  imageSource!:SafeResourceUrl


  constructor(private fb: FormBuilder, private _sanitizer: DomSanitizer,  private categoryService: CategoryService,
    private postTypeService: PostTypeService, private postService: PostService){}


    faHeart = faHeart
    faBook = faBook
    faNewspaper = faNewspaper
    faPeopleGroup = faPeopleGroup

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
    this.courseFb.get("startDateVoucher")?.valueChanges.subscribe(res => this.startDate = new Date(res!) )
  }

  ngOnDestroy(): void {
    this.categories$?.unsubscribe()
  }
}
