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
import { PollingsService } from '../../../../../base-area/src/app/services/pollings.service';
import { PollingVoteReqInsert } from '../../../../../base-area/src/app/dto/post/polling-vote-req';
import { PostCommentInsertReq } from '../../../../../base-area/src/app/dto/post/post-comment-insert-req';
import { FormBuilder, Validators } from '@angular/forms';
import { PostCommentRes } from '@dto/post/all-post-comment-res';
import { UserService } from '../../../../../base-area/src/app/services/user.service';
import { PostBookmarkReq } from '../../../../../base-area/src/app/dto/post/post-bookmark-req';



@Component({
    selector : 'app-dashboard-user',
    templateUrl : './dashboard.component.html',
    providers: [MessageService]
})

export class DashboardComponent implements OnInit{
  private posts$?: Subscription
  private like$?: Subscription
  private postDelete$?: Subscription
  private vote$?: Subscription
  private insertComment$?: Subscription
  private getComment$?: Subscription
  private insertBookmark$?: Subscription


    items!: MenuItem[];
    posts!:AllPostRes[]
    commentPost!: PostCommentRes[]
    userIdlogin:string = this.userService.getIdLogin().toString()
    showPostOption = false
    showInsertComment = false
    postIdToDelete = ""
    postIdToComment = ""

    faHeart = faHeart
    faBook = faBook
    faNewspaper = faNewspaper
    faPeopleGroup = faPeopleGroup

    commentFb = this.fb.group({
      contentComment: ["",  Validators.required],
    })

    constructor(private postService: PostService, private confirmationService: ConfirmationService,
      private messageService: MessageService, private pollingsService: PollingsService,
      private fb: FormBuilder, private userService: UserService){}

      COMMENT_POST_LIMIT =5
      commentPostPage = 0
      isMoreComments = false
      loadedComment = 0
      commentPostLength = 0

      POST_LIMIT = 3
      postPage = 1
      onScroll() : void {
        console.log("scrolled")
        console.log(this.postPage)
        this.posts$ = this.postService.getAllPost(++this.postPage, this.POST_LIMIT).subscribe(result => {
          if(this.posts.length) {
            this.posts = [...this.posts, ...result]
          } else {
            this.posts = result
          }
          this.posts.map(p => {
            // p.showComment = false

          })
        })
      }
      onLoadMoreComment(postId: string) : void {
        console.log("scrolled")
        this.posts$ = this.postService.getAllCommentByPostId(postId, ++this.commentPostPage, this.COMMENT_POST_LIMIT).subscribe(result => {
          if(this.posts.length) {
            this.commentPost = [...this.commentPost, ...result]
        this.loadedComment += this.COMMENT_POST_LIMIT
          } else {
            this.commentPost = result
          }
          // this.posts.map(p => {
          //   p.showComment = false
          // })
        })
      }


    initPosts(){
      this.posts$ = this.postService.getAllPost(this.postPage, this.POST_LIMIT).subscribe(res => this.posts = res)
      console.log(this.posts)
    }

    initComment(postId: string){
      this.getComment$  = this.postService.getAllCommentByPostId(postId, this.commentPostPage, this.COMMENT_POST_LIMIT).subscribe(res => {
        this.commentPost = res
        // this.commentPostLength = this.commentPost.length
        this.isMoreComments = this.commentPost.length >= this.COMMENT_POST_LIMIT
      })
    }

    onComment(postId: string){
      const dataInsert: PostCommentInsertReq = {
        contentComment: this.commentFb.value.contentComment!,
        postId
      }
      this.insertComment$ = this.postService.insertComment(dataInsert).subscribe(res => {
        // this.initPosts()
        this.posts.map(p => {
          p.countPostComment++
          this.commentFb.reset()
          // if(p.id === postId){
          //   if(p.like){
          //     p.like = !p.like
          //     p.countPostLike--
          //   }else{
          //     p.like = !p.like
          //     p.countPostLike++
          //   }
          // }
        })


        this.initComment(postId)
      })
    }

    onShowInsertComment(postId: string){
      this.postIdToComment = postId
     this.initComment(postId)
      this.showInsertComment = !this.showInsertComment
      if(!this.showInsertComment){
        this.postIdToComment = ""
      }
      console.log(this.commentPost)
    }



    onInsertBookmark(postId: string){
      const dataInsert: PostBookmarkReq ={
        postId
      }
      this.insertBookmark$ = this.postService.insertPostBookmark(dataInsert).subscribe(res => {
        this.posts.map(p => {
          if(p.id === postId){
            if(p.bookmark){
              p.bookmark = !p.bookmark
              // p.countPostbookmark--
            }else{
              p.bookmark = !p.bookmark
              // p.countPostLike++
            }
          }
          })
      })
    }

    likeClick = false
    likedPostId = ""
    onLike(postId: string, isLike: boolean){
      const data:LikeInsertReq = {
        postId
      }
      this.like$ = this.postService.insertPostLike(data).subscribe(res=> {
        this.likedPostId = postId
          this.posts.map(p => {
            if(p.id === postId){
              if(p.like){
                p.like = !p.like
                p.countPostLike--
              }else{
                p.like = !p.like
                p.countPostLike++
              }
            }
          })

        // this.initPosts()
      })
      this.likeClick = !this.likeClick
      // if(isLike){
      // }
      // this.like$ = this.postService.deletePostLike(postId).subscribe(res => this.initPosts())

    }

    onShowOption(postId: string){
      this.postIdToDelete = postId
      this.showPostOption = !this.showPostOption
      console.log(this.postIdToDelete)
      console.log(this.postIdToDelete)
      console.log(this.showPostOption)
    }

    onHideOption(){
      this.showPostOption = false
    }

    onVote(pollingOptionId: string){
      const data:PollingVoteReqInsert = {
        pollingOptionId
      }
      console.log(pollingOptionId)
      this.vote$ = this.pollingsService.insertVote(data).subscribe(res => this.initPosts())

    }

    confirmDelete() {
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
