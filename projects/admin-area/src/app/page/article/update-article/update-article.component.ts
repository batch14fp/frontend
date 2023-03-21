import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormArray, FormBuilder } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { ArticleUpdateReq } from "@dto/article/article-update-req";
import { ArticlesService } from "@service/articles.service";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-update-article',
    templateUrl: './update-article.component.html'
})

export class UpdateArticleComponent implements OnInit, OnDestroy {
    private articles$?: Subscription
    private updateArticle$?: Subscription

    constructor(private fb: FormBuilder, private title: Title, private articleService: ArticlesService,
        private router: Router, private activedRouter: ActivatedRoute) {
        this.title.setTitle('Article')
    }

    updateArticle = this.fb.group({
        articleId: [""],
        title: [""],
        content: [""],
        ver: [0],
        active: [true],

        fileId: [""],
        fileContent: [""],
        fileExtension: [""],
        fileVer: [0]
    })

    imageArticleId!: string

    ngOnInit(): void {
        this.activedRouter.params.subscribe(res => {
            const params = res as any
            this.updateArticle.patchValue({
                articleId: params.articleId
            })
            this.articles$ = this.articleService.getArticleByIdForAdmin(params.id).subscribe(res => {
                console.log(params.id)
                this.updateArticle.patchValue({
                    articleId:res.articleId,
                    title: res.title,
                    content: res.content,
                    ver: res.ver,
                    active: res.isActive,
                    fileId:res.fileId,
                    fileContent:res.fileContent,
                    fileExtension:res.fileExtension,
                    fileVer:res.fileVer
                })
                
            })
        })
    }

    addFiles(fileContent: string, fileExtension: string) {
        this.updateArticle.patchValue({
            fileId: (this.updateArticle.value.fileId),
            fileContent: (fileContent),
            fileExtension: (fileExtension),
            fileVer: (this.updateArticle.value.fileVer)
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

    onUpdateArticle(): void {
        const data: ArticleUpdateReq = {
            articleId: this.updateArticle.value.articleId!,
            title: this.updateArticle.value.title!,
            content: this.updateArticle.value.content!,
            ver: this.updateArticle.value.ver!,
            isActive: this.updateArticle.value.active!,
            fileId:this.updateArticle.value.fileId!,
            fileContent:this.updateArticle.value.fileContent!,
            fileExtension:this.updateArticle.value.fileExtension!,
            fileVer:this.updateArticle.value.fileVer!
        }
        this.updateArticle$ = this.articleService.updateArticle(data).subscribe(res=>{
            this.router.navigateByUrl('/admin/article')
        })
    }

    ngOnDestroy(): void {
        this.updateArticle$?.unsubscribe()
    }
}