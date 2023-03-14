import { Component, OnDestroy, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { ArticleRes } from "projects/base-area/src/app/dto/article/article-res";
import { ArticlesService } from "projects/base-area/src/app/services/articles.service";
import { UserService } from "projects/base-area/src/app/services/user.service";
import { Subscription } from "rxjs";

@Component({
    selector : 'app-article-admin',
    templateUrl : './article-admin.component.html'
})

export class ArticleAdminComponent implements OnInit, OnDestroy{
    private arcticles$?:Subscription
    article:ArticleRes[]=[]

    constructor(private userService:UserService, private articleService:ArticlesService, private title:Title,
        private router:Router){
            this.title.setTitle("Article")
    }
   
    ngOnInit(): void {
        this.arcticles$ = this.articleService.getAllArticle().subscribe(res=>{

        this.article = res
        })
    }

    ngOnDestroy(): void {
        this.arcticles$?.unsubscribe()
    }
}