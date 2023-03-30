import { AccordionModule } from 'primeng/accordion';
import { Component, OnInit, OnDestroy } from '@angular/core';
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
import { MEMBER_STATUS } from '../../../../../base-area/src/app/constant/member-status';
import { PostCommentReqUpdate } from '../../../../../base-area/src/app/dto/post/post-comment-req-update';
import { Router } from '@angular/router';
import { FileResPost } from '../../../../../base-area/src/app/dto/file/file-res';
import { Title } from '@angular/platform-browser';


@Component({
    selector : 'app-dashboard-user',
    templateUrl : './dashboard.component.html',
    providers: [MessageService]
})

export class DashboardComponent implements OnInit, OnDestroy{
  private posts$?: Subscription
  private singlePost$?: Subscription
  private like$?: Subscription
  private postDelete$?: Subscription
  private vote$?: Subscription
  private unVote$?: Subscription
  private insertComment$?: Subscription
  private editComment$?: Subscription
  private deleteComment$?: Subscription
  private getComment$?: Subscription
  private insertBookmark$?: Subscription
  private myBookmark$?: Subscription


    images!: FileResPost[];

    items!: MenuItem[];
    posts!:AllPostRes[]
    myBookmarks!:AllPostRes[]
    commentPost!: PostCommentRes[]
    showPostOption = false
    showCommentOption = false
    showInsertComment = false
    postIdToDelete = ""
    postIdToComment = ""
    isLoading = false
    memberStatus!: string
    userIdlogin:string = this.userService.getIdLogin().toString()
    memberReguler = MEMBER_STATUS.REGULAR
    imageIdProfile= ""
    fullNameLogin=""

    // commentIdSelected =""
    commentIdxEdit!: number

    displayBasic!: boolean

    onShowGallery(data:FileResPost[]){
      console.log("show")
      this.images = data

      this.responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 5
        },
        {
            breakpoint: '768px',
            numVisible: 3
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ]

      this.displayBasic = true
    }

    responsiveOptions: any[] = [
      {
          breakpoint: '1500px',
          numVisible: 5
      },
      {
          breakpoint: '1024px',
          numVisible: 3
      },
      {
          breakpoint: '768px',
          numVisible: 2
      },
      {
          breakpoint: '560px',
          numVisible: 1
      }
  ];


    optionPost = {
      postId: "",
      idx: 0
    }

    onOptionPost(postId:string, idx:number){
      this.optionPost.postId = postId
      this.optionPost.idx =idx
    }

    faHeart = faHeart
    faBook = faBook
    faNewspaper = faNewspaper
    faPeopleGroup = faPeopleGroup

    commentFb = this.fb.group({
      contentComment: ["",  Validators.required],
    })

    editCommentFb = this.fb.group({
      contentComment: ["",  Validators.required],
    })

    constructor(private postService: PostService, private confirmationService: ConfirmationService,
      private messageService: MessageService, private pollingsService: PollingsService,
      private fb: FormBuilder, private userService: UserService, private router: Router, private title: Title){
        title.setTitle("Dashboard")
      }


      COMMENT_POST_LIMIT =5
      commentPostPage = 0
      isMoreComments = false
      loadedComment = 0
      commentPostLength = 0
      editComment = false


    accountMenu: MenuItem[] = [
        { label: 'Profile', icon: 'pi pi-fw pi-user', command: e=> this.router.navigateByUrl("/profile") },
        { label: 'My Transaction', icon: 'pi pi-fw pi-credit-card', command: e=> this.router.navigateByUrl("/profile") },
        { label: 'Report', icon: 'pi pi-fw pi-chart-bar', command: e=> this.router.navigateByUrl("/profile") },
        { label: 'My Course', icon: 'pi pi-fw pi-book', command: e=> this.router.navigateByUrl("/profile") },
        { label: 'My Events', icon: 'pi pi-fw pi-calendar', command: e=> this.router.navigateByUrl("/profile") },
        { label: 'My Bookmark', icon: 'pi pi-fw pi-bookmark', command: e=> this.router.navigateByUrl("/profile") },
        { label: 'Change Password', icon: 'pi pi-fw pi-lock', command: e=> this.router.navigateByUrl("/profile") },
        { label: 'Logout', icon: 'pi pi-fw pi-sign-out', command: e=> this.onLogOut() },
      ];



      optionMenuDelete: MenuItem[] = [
        { label: 'Delete', icon: 'pi pi-fw pi-trash', command: e=> this.confirmDelete(this.optionPost.idx) },
        { label: 'Save', icon: 'pi pi-fw pi-bookmark', command: e=> this.onInsertBookmark(this.optionPost.postId, this.optionPost.idx) }
      ];
      optionMenuSave: MenuItem[] = [
        { label: 'Save', icon: 'pi pi-fw pi-bookmark', command: e=> this.onInsertBookmark(this.optionPost.postId, this.optionPost.idx) }
      ];

      optionCommentDelete: MenuItem[] = [
        { label: 'Delete', icon: 'pi pi-fw pi-trash', command: e=> this.confirmDelete(this.optionPost.idx) },
        { label: 'Edit', icon: 'pi pi-fw pi-pencil', command: e=> this.onEditComment() },
        { label: 'Hide', icon: 'pi pi-fw pi-eye-slash', command: e=> this.onInsertBookmark(this.optionPost.postId, this.optionPost.idx) },
      ];
      optionCommentSave: MenuItem[] = [
        { label: 'Hide', icon: 'pi pi-fw pi-eye-slash', command: e=> this.onInsertBookmark(this.optionPost.postId, this.optionPost.idx) }
      ];


      onCancelEdit(){
        this.commentIdx = -1
      }

      commentIdx!:number
      onShowEditComment(idx:number){
        this.commentIdxEdit = idx
        // this.commentIdSelected = postCommentId
        // console.log(this.commentPost[this.commentIdxEdit].contentComment)
      }

      onEditComment(){
        this.commentIdx = this.commentIdxEdit
        console.log(this.commentPost[this.commentIdx].contentComment)
        this.editCommentFb.patchValue({
          contentComment: this.commentPost[this.commentIdx].contentComment
        })
        // this.editCommentFb.patchValue({contentComment: this.commentPost[this.commentIdx].contentComment })
        // this.editCommentFb.value.contentComment = this.commentPost[this.commentIdx].contentComment
      //  this.commentIdEdit = this.commentIdSelected
      }

      onSaveEditComment(comment:PostCommentRes, postId:string){
        const data:PostCommentReqUpdate = {
          contentComment: this.editCommentFb.value.contentComment!,
          ver:comment.ver,
          postCommentId: comment.postCommentId
        }
        this.editComment$ = this.postService.updateComment(data).subscribe(res => {
          this.commentIdx = -1
          this.initComment(postId)
        })

      }


      POST_LIMIT = 3
      postPage = 1
      onScroll() : void {
        console.log("scrolled")
        console.log(this.postPage)
        this.posts$ = this.postService.getAllPost(++this.postPage, this.POST_LIMIT).subscribe(result => {
          if(this.posts?.length) {
            this.posts = [...this.posts, ...result]
          } else {
            this.posts = result
          }
          console.log(this.posts)
          // this.posts.map(p => {
            // p.showComment = false

          // })
        })
      }

      fotoName(name: string){
        return getInitials(name)
      }

      onLoadMoreComment(postId: string) : void {
        console.log("scrolled")
        this.posts$ = this.postService.getAllCommentByPostId(postId, ++this.commentPostPage, this.COMMENT_POST_LIMIT).subscribe(result => {
          if(result.length) {
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

      postUpdate!: AllPostRes[]
    initPosts(){
      this.isLoading = true
      this.posts$ = this.postService.getAllPost(this.postPage, this.POST_LIMIT).subscribe(res => {
        this.isLoading = false
        this.posts = res
      })
      console.log(this.posts)
    }

    calculateDiff(endAt:string){
      let date = new Date(endAt);
      let currentDate = new Date();

      let days = Math.floor((currentDate.getTime() - date.getTime()) / 1000 / 60 / 60 / 24);
      return days*-1;
    }

    getPercent(count:number, totalCount:number){
      return (count/totalCount)* 100
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

    onDeleteComment(commentId:string, postId: string){
      this.deleteComment$ = this.postService.deletePostComment(commentId).subscribe(res =>{
        this.posts.map(p => {
          p.countPostComment--
          this.commentFb.reset()
        })

        this.initComment(postId)
      })
    }

    onShowInsertComment(postId: string, idx:number){
      this.postIdToComment = postId
     this.initComment(postId)
     this.posts[idx].showInsertComment = !this.posts[idx].showInsertComment
      // this.showInsertComment = !this.showInsertComment
      // if(!this.showInsertComment){
      //   this.postIdToComment = ""
      // }
      console.log(this.commentPost)
    }



    onInsertBookmark(postId: string, idx?:number){
      const postUpdate = []
      for (const post of this.posts) {
        post.showPostOption = false
        postUpdate.push(post)
      }
      this.posts = postUpdate
    //  if(idx){
    //   this.posts[idx].showPostOption = !this.posts[idx].showPostOption
    //  }

      const dataInsert: PostBookmarkReq ={
        postId
      }
      this.insertBookmark$ = this.postService.insertPostBookmark(dataInsert).subscribe(res => {
        this.initBookmarks()
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

    onShowOption(postId: string, idx: number){
      const postUpdate = []
      for (const post of this.posts) {
        post.showPostOption = false
        postUpdate.push(post)
      }
      this.posts = postUpdate
     this.posts[idx].showPostOption = !this.posts[idx].showPostOption
      console.log(this.posts[idx])

      // this.postIdToDelete = postId
      // this.showPostOption = !this.showPostOption
      // console.log(this.postIdToDelete)
      // console.log(this.postIdToDelete)
      // console.log(this.showPostOption)
    }

    onHideOption(){
      this.showPostOption = false
    }

    onUnvote(pollingResponseId:string, postId: string){
      this.unVote$ = this.pollingsService.unvotePolling(pollingResponseId).subscribe(res =>{
        this.singlePost$ = this.postService.getPostById(postId).subscribe(res =>{
          const postUpdate: AllPostRes[] = []
          for (const post of this.posts) {
            if(res.id === post.id){
              postUpdate.push(res)
            }else{
              postUpdate.push(post)
            }
          }
          this.posts = []
          this.posts = [...postUpdate]
        })
      })
    }

    randomColor() {
    let color = '#';
    const letters = '0123456789ABCDEF';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

    onVote(pollingOptionId: string, index:number, postId:string){
      const data:PollingVoteReqInsert = {
        pollingOptionId
      }
      console.log("Polling option id: "+pollingOptionId)
      this.vote$ = this.pollingsService.insertVote(data).subscribe(res => {
        this.singlePost$ = this.postService.getPostById(postId).subscribe(res =>{
          const postUpdate: AllPostRes[] = []
          for (const post of this.posts) {
            if(res.id === post.id){
              postUpdate.push(res)
            }else{
              postUpdate.push(post)
            }
          }
          this.posts = []
          this.posts = [...postUpdate]
        })


        // const postUpdate: AllPostRes[] = []
        // for (const post of this.posts) {
        //   for (const polling of post.pollingOption) {
        //     if(polling.pollingOptionId === pollingOptionId){

        //       post.isVote = !post.isVote
        //         console.log("sama polling option id")
        //     }
        //   }
        //   postUpdate.push(post)
        // }
        // this.posts = []
        // this.posts = [...postUpdate]
        // console.log(this.posts)

    //     this.postIdToComment = postId
    //  this.initComment(postId)
    //  this.posts[idx].showInsertComment = !this.posts[idx].showInsertComment


        // this.initPosts()
      })

    }

    confirmDelete(idx?:number) {
      if(idx){
        this.posts[idx].showPostOption = !this.posts[idx].showPostOption
      }
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

  onLogOut(){
    localStorage.clear()
    this.router.navigateByUrl("/")
  }

  initBookmarks(){
    this.myBookmark$ = this.postService.getMyBookmarks(1,3).subscribe(res =>{
      this.myBookmarks = res
      console.log(res)
    })
  }

    ngOnInit() {
      this.initPosts()
      this.initBookmarks()
        this.items = [
            {label: 'Thread', routerLink: ['thread']},
            {label: 'Calendar'}
        ];

        this.memberStatus =  this.userService.getMemberCode()
        this.imageIdProfile = this.userService.getIdFotoProfile()
        this.fullNameLogin = this.userService.getFullName()
    }

    ngOnDestroy(): void {
      this.posts$?.unsubscribe()
      this.like$?.unsubscribe()
      this.postDelete$?.unsubscribe()
      this.vote$?.unsubscribe()
      this.insertComment$?.unsubscribe()
      this.getComment$?.unsubscribe()
      this.insertBookmark$?.unsubscribe
    }

}
