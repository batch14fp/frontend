import { AccordionModule } from 'primeng/accordion';
import { Component, OnInit } from "@angular/core";
import { MenuItem } from "primeng/api";
import { faHeart, faComment, faBook, faNewspaper, faPeopleGroup } from '@fortawesome/free-solid-svg-icons';
import { PostService } from '../../../../../base-area/src/app/services/post.service';
import { Subscription } from 'rxjs';
import { AllPostRes } from '@dto/post/all-post-res';
import { getInitials } from '../../../../../base-area/src/app/utils/getInitial';
import { LikeInsertReq } from '../../../../../base-area/src/app/dto/post/like-insert-req';
// import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService, ConfirmEventType, MessageService} from 'primeng/api';



@Component({
    selector : 'app-dashboard-user',
    templateUrl : './dashboard.component.html',
    providers: [MessageService]
})

export class DashboardComponent implements OnInit{
  private posts$?: Subscription
  private like$?: Subscription
  private postDelete$?: Subscription


    items!: MenuItem[];
    posts!:AllPostRes[]
    showPostOption = false
    postIdToDelete = ""


    faHeart = faHeart
    faBook = faBook
    faNewspaper = faNewspaper
    faPeopleGroup = faPeopleGroup

    constructor(private postService: PostService, private confirmationService: ConfirmationService,
      private messageService: MessageService){}


    initPosts(){
      this.posts$ = this.postService.getAllPost(1, 5).subscribe(res => this.posts = res)

      console.log(this.posts)
    }

    onLike(postId: string){
      const data:LikeInsertReq = {
        postId
      }
      this.like$ = this.postService.insertPostLike(data).subscribe(res=> this.initPosts())
    }

    onShowOption(postId: string){
      this.showPostOption = !this.showPostOption
      this.postIdToDelete = postId
      console.log(this.postIdToDelete)
      console.log(this.showPostOption)
    }

    onHideOption(){
      this.showPostOption = false
    }

    confirm2() {
      this.showPostOption = false
      this.confirmationService.confirm({
          message: 'Do you want to delete this post?',
          header: 'Delete Confirmation',
          icon: 'pi pi-info-circle',
          accept: () => {
            this.postDelete$ = this.postService.deletePost(this.postIdToDelete).subscribe(res => this.initPosts())
              this.messageService.add({severity:'info', summary:'Confirmed', detail:'Record deleted'});
              this.postIdToDelete = ""
          },
          reject: (type: any) => {
              switch(type) {
                  case ConfirmEventType.REJECT:
                      this.messageService.add({severity:'error', summary:'Rejected', detail:'You have rejected'});
                  break;
                  case ConfirmEventType.CANCEL:
                      this.messageService.add({severity:'warn', summary:'Cancelled', detail:'You have cancelled'});
                  break;
              }
          }
      });
  }

    ngOnInit() {
      this.initPosts()
        this.items = [
            {label: 'Thread', routerLink: ['thread']},
            {label: 'Calendar'}
        ];
    }

}
