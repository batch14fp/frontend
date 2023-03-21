import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { ArticleReq } from "@dto/article/article-req";
import { ArticlesService } from "@service/articles.service";
import { Subscription } from "rxjs";

@Component({
    selector:'app-create-article',
    templateUrl:'./create-article.component.html'
})

export class CreateArticleComponent implements OnInit, OnDestroy{
    private createArticle$?:Subscription

    constructor(private fb:FormBuilder, private title:Title, private articleService:ArticlesService,
        private router:Router){
            this.title.setTitle('Article')
    }

    createArticle = this.fb.group({
        title:[""],
        content:[""],
        imageArticle:this.fb.array([])
    })

    get uploads(){
        return this.createArticle.get("imageArticle") as FormArray
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
          })
        }
      }
    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }
    ngOnDestroy(): void {
        throw new Error("Method not implemented.");
    }
}