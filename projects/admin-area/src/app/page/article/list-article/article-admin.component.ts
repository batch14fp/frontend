import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { ArticleResData } from "@dto/article/article-res-data";
import { LazyLoadEvent } from "primeng/api";
import { ArticleRes } from "projects/base-area/src/app/dto/article/article-res";
import { ArticlesService } from "projects/base-area/src/app/services/articles.service";
import { UserService } from "projects/base-area/src/app/services/user.service";
import { truncateString } from "projects/base-area/src/app/utils/turncateString";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-article-admin',
  templateUrl: './article-admin.component.html'
})

export class ArticleAdminComponent implements OnInit, OnDestroy {
  private arcticles$?: Subscription
  private deleteArticles$?:Subscription

  articleAdmin: ArticleRes[] = []

  startPage: number = 0
  maxPage: number = 3
  totalData: number = 0
  query?: string
  loading: boolean = true

  // strContent(str:string){
  //   truncateString(str,50)
  // }


  constructor(private articleService: ArticlesService, private title: Title,
    private router: Router) {
    this.title.setTitle("Article")
  }

  loadData(event: LazyLoadEvent) {
    console.log(event)
    this.getData(event.first, event.rows, event.globalFilter)
  }

  getData(startPage: number = this.startPage, maxPage: number = this.maxPage, query?: string): void {
    this.loading = true;
    this.startPage = startPage
    this.maxPage = maxPage
    this.query = query

    this.arcticles$ = this.articleService.getAllArticle(startPage, maxPage, query).subscribe(
      result => {
        const resultData: any = result
        this.articleAdmin = resultData.data
        this.loading = false
        this.totalData = resultData.total
        console.log(resultData)
      },
    )
  }
  idArticle!:string

  displayDelete!:boolean
  showDeleteDialog(article:ArticleResData){
    console.log(article.title)
      this.displayDelete = true
      this.idArticle = article.articleId
  }


  onDeleteArticle(){
    this.deleteArticles$ = this.articleService.deleteArticle(this.idArticle).subscribe(res=>{
        alert('Delete Success')
        this.getData()
    })
}

  ngOnInit(): void {
    // this.arcticles$ = this.articleService.getAllArticle().subscribe(res=>{
    //     this.articleAdmin = res
    // })
  }

  ngOnDestroy(): void {
    this.arcticles$?.unsubscribe()
    this.deleteArticles$?.unsubscribe()
  }
}