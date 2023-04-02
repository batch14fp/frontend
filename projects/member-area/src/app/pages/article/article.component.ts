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
import { LazyLoadEvent, MenuItem } from 'primeng/api';
import { ActivityUpcomingAllRes } from '@dto/activity/activity-upcoming-all-res';
import { ActivityService } from '@service/activity.service';
import { MEMBER_STATUS } from 'projects/base-area/src/app/constant/member-status';
import { getInitials } from 'projects/base-area/src/app/utils/getInitial';
import { truncateString } from 'projects/base-area/src/app/utils/turncateString';


@Component({
    selector:'app-article',
    templateUrl: './article.component.html'
})


export class ArticleComponent implements OnInit, OnDestroy{

  article$? : Subscription
  popArticle$? : Subscription
  upcomingEvents$?: Subscription

  upcomingEvents?:ActivityUpcomingAllRes
  allArticle! : ArticleResData[]
  populerArticle! : ArticleResData[]
  memberStatus!: string
  imageIdProfile= ""
  fullNameLogin=""
  memberReguler = MEMBER_STATUS.REGULAR


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

  accountMenu: MenuItem[] = [
    { label: 'Profile', icon: 'pi pi-fw pi-user', command: e=> this.router.navigateByUrl("/profile") },
    { label: 'My Transaction', icon: 'pi pi-fw pi-credit-card', command: e=> this.router.navigateByUrl("/my-transaction") },
    { label: 'Report Acivity', icon: 'pi pi-fw pi-chart-bar', command: e=> this.router.navigateByUrl("/report-activity") },
    { label: 'Report Income', icon: 'pi pi-fw pi-dollar', command: e=> this.router.navigateByUrl("/report-activity") },
    { label: 'My Course', icon: 'pi pi-fw pi-book', command: e=> this.router.navigateByUrl("/my-course") },
    { label: 'My Events', icon: 'pi pi-fw pi-calendar', command: e=> this.router.navigateByUrl("/my-event") },
    { label: 'My Bookmark', icon: 'pi pi-fw pi-bookmark', command: e=> this.router.navigateByUrl("/my-bookmark") },
    { label: 'Change Password', icon: 'pi pi-fw pi-lock', command: e=> this.router.navigateByUrl("/change-password") },
    { label: 'Logout', icon: 'pi pi-fw pi-sign-out', command: e=> this.onLogOut() },
  ];


  constructor(
    private title: Title, private activityService: ActivityService, private router: Router,
    private articleService: ArticlesService, private userService:UserService){
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

  onLogOut(){
    localStorage.clear()
    this.router.navigateByUrl("/")
  }


  fotoName(name: string){
    return getInitials(name)
  }

  turncate(str:string){
    return truncateString(str, 20)
  }


 articlePopuler(){
  this.popArticle$ = this.articleService.getAllByMostViewer(this.articlePage, this.ARTICLE_LIMIT).subscribe(res => {
    this.populerArticle = res
    // this.isMoreArticle
  })
 }

 initUpcomingEvents(){
  this.upcomingEvents$ = this.activityService.getUpcomingEvent(0,3).subscribe(res =>{
    this.upcomingEvents = res
    console.log(res)
  })
}


  ngOnInit(): void {
   this.initArticle()
   this.articlePopuler()
   this.initUpcomingEvents()
    this.memberStatus =  this.userService.getMemberCode()
    this.imageIdProfile = this.userService.getIdFotoProfile()
    this.fullNameLogin = this.userService.getFullName()
  }

  ngOnDestroy(): void {
    this.article$?.unsubscribe()
  }
}
