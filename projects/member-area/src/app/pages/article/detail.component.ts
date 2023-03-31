import { Component, OnDestroy, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { ArticleResData } from "@dto/article/article-res-data";
import { faHeart, faComment, faBook, faNewspaper, faPeopleGroup,faPenToSquare, faGlobe} from '@fortawesome/free-solid-svg-icons';
import { ArticlesService } from "@service/articles.service";
import { Subscription } from "rxjs";

@Component({
    selector : 'app-article-detail',
    templateUrl : 'detail.component.html'
})

export class ArticleDetailComponent implements OnInit, OnDestroy{

    faHeart = faHeart
    faComment = faComment
    faBook = faBook
    faNewspaper = faNewspaper
    faPeopleGroup = faPeopleGroup
    faPenToSquare = faPenToSquare
    faGlobe = faGlobe

    detail$? : Subscription

    detailArticle!: ArticleResData 

    constructor(
        private title: Title,
        private activetedRouter:ActivatedRoute,
        private articleService:ArticlesService){
        
        }
    

    initDetail(){
        this.activetedRouter.params.subscribe(res => {
            console.log(res);
            this.detail$ = this.articleService.getArticleIdForMember(res['id']).subscribe(result => {
                this.detailArticle = result
                
            })
            
        })
    }
    ngOnInit(): void {
       this.initDetail()
    }

    ngOnDestroy(): void {
        this.detail$?.unsubscribe
    }

}