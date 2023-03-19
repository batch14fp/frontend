import { AccordionModule } from 'primeng/accordion';
import { ActivatedRouteSnapshot } from '@angular/router';
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

@Component({
    selector : 'app-post-member',
    templateUrl : './post.component.html'
})

export class PostComponent implements OnInit{

  private caetgories$?: Subscription
  private postTypes$?: Subscription

  categories!: CategoryRes[]
  postTypes!: PostTypeGetRes[]

  today = new Date()


  constructor(private fb: FormBuilder, private _sanitizer: DomSanitizer,  private categoryService: CategoryService,
    private postTypeService: PostTypeService){}


  postFb = this.fb.group({
    description: ["",  Validators.required],
    files: this.fb.array([]),
    category: [{},  Validators.required],
    postType: [{},  Validators.required],
    pollingTitle:["",  Validators.required],
    endAt:[Date,  Validators.required],
    pollingOptions: this.fb.array([])
  })

  get pollingOptions(): any{
    return this.postFb.get('pollingOptions') as FormArray
  }

  addOption() {
    const option = new FormControl('');
    this.pollingOptions.push(option);
    console.log(this.pollingOptions.value);
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

  onPost(){

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
