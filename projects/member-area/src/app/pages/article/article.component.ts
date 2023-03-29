import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { Subscription } from "rxjs";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from '@service/user.service';
import { CategoryService } from '@service/category.service';
import { faHeart, faComment, faBook, faNewspaper, faPeopleGroup,faPenToSquare, faGlobe} from '@fortawesome/free-solid-svg-icons';
import { ArticlesService } from '@service/articles.service';


@Component({
    selector:'app-article',
    templateUrl: './article.component.html'
})


export class ArticleComponent{

  // allArticle : 

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



}
