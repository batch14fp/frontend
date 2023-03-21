import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { ArticleReq } from "@dto/article/article-req";
import { ArticlesService } from "@service/articles.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html'
})

export class CreateArticleComponent implements OnInit, OnDestroy {
  private createArticle$?: Subscription

  constructor(private fb: FormBuilder, private title: Title, private articleService: ArticlesService,
    private router: Router) {
    this.title.setTitle('Article')
  }

  createArticle = this.fb.group({
    title: [""],
    content: [""],
    imageArticle: this.fb.group({
      fileTitle: [""],
      contentFile:[""],
      fileExt:[""]
    })
  })

  addFiles(contentFile: string, fileExt: string) {
    this.createArticle.get('imageArticle')?.patchValue({
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

    for (let file of event.files) {
      toBase64(file).then(result => {
        const resultBase64 = result.substring(result.indexOf(",") + 1, result.length)
        const resultExtension = file.name.substring(file.name.lastIndexOf(".") + 1, file.name.length)

        this.addFiles(resultBase64, resultExtension)
      })
    }
  }

  onCreateArticle(){
    const data:ArticleReq={
      title:this.createArticle.value.title!,
      content:this.createArticle.value.content!
    }
    const files = this.createArticle.value.imageArticle
      data.fileContent = files?.contentFile!
      data.extensions = files?.fileExt!
    this.createArticle$ = this.articleService.insertArticle(data).subscribe(res=>{
      alert('create article success')
      this.router.navigateByUrl('admin/article')
    })
  }

  ngOnInit(): void {
   
  }
  ngOnDestroy(): void {
    this.createArticle$?.unsubscribe()
  }
}