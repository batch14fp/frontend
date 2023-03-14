import { Component } from "@angular/core";
import { Title } from "@angular/platform-browser";

@Component({
    selector : 'app-article',
    templateUrl : 'article.component.html'
})

export class ArticleComponent{
    constructor(private title:Title){
        this.title.setTitle('Article Page')
    }
}