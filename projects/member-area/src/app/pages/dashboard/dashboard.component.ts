import { AccordionModule } from 'primeng/accordion';
import { Component, OnInit } from "@angular/core";
import { MenuItem } from "primeng/api";
import { faHeart, faComment, faBook, faNewspaper, faPeopleGroup } from '@fortawesome/free-solid-svg-icons';
import { PostService } from '../../../../../base-area/src/app/services/post.service';
import { Subscription } from 'rxjs';
import { AllPostRes } from '@dto/post/all-post-res';

@Component({
    selector : 'app-dashboard-user',
    templateUrl : './dashboard.component.html'
})

export class DashboardComponent implements OnInit{
  private posts$?: Subscription

    items!: MenuItem[];
    posts!:AllPostRes[]

    faHeart = faHeart
    faBook = faBook
    faNewspaper = faNewspaper
    faPeopleGroup = faPeopleGroup

    constructor(private postService: PostService){}

    initPosts(){
      this.posts$ = this.postService.getAllPost(1, 5).subscribe(res => this.posts = res)
      console.log(this.posts)
    }

    ngOnInit() {
      this.initPosts()
        this.items = [
            {label: 'Thread', routerLink: ['thread']},
            {label: 'Calendar'}
        ];
    }

}
