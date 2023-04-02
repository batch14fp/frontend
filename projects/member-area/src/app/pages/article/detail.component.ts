import { Component, OnDestroy, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { ActivityUpcomingAllRes } from "@dto/activity/activity-upcoming-all-res";
import { ArticleResData } from "@dto/article/article-res-data";
import { faHeart, faComment, faBook, faNewspaper, faPeopleGroup,faPenToSquare, faGlobe} from '@fortawesome/free-solid-svg-icons';
import { ActivityService } from "@service/activity.service";
import { ArticlesService } from "@service/articles.service";
import { UserService } from "@service/user.service";
import { MenuItem } from "primeng/api";
import { MEMBER_STATUS } from "projects/base-area/src/app/constant/member-status";
import { getInitials } from "projects/base-area/src/app/utils/getInitial";
import { truncateString } from "projects/base-area/src/app/utils/turncateString";
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
    memberStatus!: string
    imageIdProfile= ""
    fullNameLogin=""
    memberReguler = MEMBER_STATUS.REGULAR

    detail$? : Subscription
    upcomingEvents$?: Subscription
    upcomingEvents?:ActivityUpcomingAllRes
    detailArticle!: ArticleResData
    accountMenu: MenuItem[] = [
      { label: 'Profile', icon: 'pi pi-fw pi-user', command: e=> this.router.navigateByUrl("/profile") },
      { label: 'My Transaction', icon: 'pi pi-fw pi-credit-card', command: e=> this.router.navigateByUrl("/my-transaction") },
      { label: 'Report Activity', icon: 'pi pi-fw pi-chart-bar', command: e=> this.router.navigateByUrl("/report-activity") },
      { label: 'Report Income', icon: 'pi pi-fw pi-dollar', command: e=> this.router.navigateByUrl("/report-income") },
      { label: 'My Course', icon: 'pi pi-fw pi-book', command: e=> this.router.navigateByUrl("/my-course") },
      { label: 'My Events', icon: 'pi pi-fw pi-calendar', command: e=> this.router.navigateByUrl("/my-event") },
      { label: 'My Bookmark', icon: 'pi pi-fw pi-bookmark', command: e=> this.router.navigateByUrl("/my-bookmark") },
      { label: 'Change Password', icon: 'pi pi-fw pi-lock', command: e=> this.router.navigateByUrl("/change-password") },
      { label: 'Logout', icon: 'pi pi-fw pi-sign-out', command: e=> this.onLogOut() },
    ];

    constructor(
        private title: Title,
        private activetedRouter:ActivatedRoute,
        private articleService:ArticlesService,
        private activityService:ActivityService,
        private userService:UserService,
        private router:Router){

        }


    initDetail(){
        this.activetedRouter.params.subscribe(res => {
            console.log(res);
            this.detail$ = this.articleService.getArticleIdForMember(res['id']).subscribe(result => {
                this.detailArticle = result
            })
        })
    }

    initUpcomingEvents(){
      this.upcomingEvents$ = this.activityService.getUpcomingEvent(0,3).subscribe(res =>{
        this.upcomingEvents = res
        console.log(res)
      })
    }

    fotoName(name: string){
      return getInitials(name)
    }

    turncate(str:string){
      return truncateString(str, 20)
    }

    onLogOut(){
      localStorage.clear()
      this.router.navigateByUrl("/")
    }

    ngOnInit(): void {
        this.initDetail()
        this.initUpcomingEvents()
        this.memberStatus =  this.userService.getMemberCode()
        this.imageIdProfile = this.userService.getIdFotoProfile()
        this.fullNameLogin = this.userService.getFullName()
    }

    ngOnDestroy(): void {
        this.detail$?.unsubscribe()
        this.upcomingEvents$?.unsubscribe()
    }

}
