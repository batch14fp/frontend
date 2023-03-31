import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { Subscription } from "rxjs";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from '@service/user.service';
import { CategoryService } from '@service/category.service';
import { faHeart, faComment, faBook, faNewspaper, faPeopleGroup,faPenToSquare, faGlobe} from '@fortawesome/free-solid-svg-icons';
import { ArticlesService } from '@service/articles.service';
import { ArticleResData } from '@dto/article/article-res-data';
import { LazyLoadEvent } from 'primeng/api';


@Component({
    selector:'app-article',
    templateUrl: './article.component.html'
})


export class ArticleComponent implements OnInit, OnDestroy{

  article$? : Subscription
  popArticle$? : Subscription

  allArticle! : ArticleResData[]
  populerArticle! : ArticleResData[]
  

  startPage : number = 0
  maxPage: number = 3
  query? : string
  totalData : number = 0
  loading: boolean = true

  faHeart = faHeart
  faComment = faComment
  faBook = faBook
  faNewspaper = faNewspaper
  faPeopleGroup = faPeopleGroup
  faPenToSquare = faPenToSquare
  faGlobe = faGlobe

  constructor(
    private title: Title,
    private articleService: ArticlesService){
      this.title.setTitle("Artikel")
    }
 
    // loadData(event: LazyLoadEvent) {
    //   console.log(event)
    //   this.getData(event.first, event.rows, event.globalFilter)
    // }

  ARTICLE_LIMIT = 3
  articlePage = 1
  isLoading = false
  loadArticle = 0
  isMoreArticle = false
  
  onLoadMoreArticle() : void {
    console.log("scrolled terbaru");
    this.article$ = this.articleService.getAll(this.articlePage++, this.ARTICLE_LIMIT).subscribe(res =>{
      if(this.allArticle?.length){
        this.allArticle = [...this.allArticle, ...res]
      }else{
        this.allArticle = res
      }

    })
    
  }

  initArticle(){
    this.isLoading = true
    this.article$ = this.articleService.getAll(this.articlePage, this.ARTICLE_LIMIT).subscribe(res => {
      // this.isLoading = false
      this.allArticle = res
      this.isMoreArticle = this.allArticle.length >= this.ARTICLE_LIMIT
    })

  }

  onLoadMorePopular() : void {
    console.log("scrolled populer");
    this.popArticle$ = this.articleService.getAllByMostViewer(this.articlePage++, this.ARTICLE_LIMIT).subscribe(res => {
      if(this.populerArticle?.length){
        this.populerArticle = [...this.populerArticle, ...res]
      }else{
        this.populerArticle = res
      }
    })
  }


 articlePopuler(){
  this.popArticle$ = this.articleService.getAllByMostViewer(this.articlePage, this.ARTICLE_LIMIT).subscribe(res => {
    this.populerArticle = res
    // this.isMoreArticle
  })
 }

  ngOnInit(): void {
   this.initArticle()
   this.articlePopuler()
  }

  ngOnDestroy(): void {
    this.article$?.unsubscribe()
  }
}
