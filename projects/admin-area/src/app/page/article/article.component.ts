import { Component } from "@angular/core";

@Component({
    selector : 'app-article',
    templateUrl : 'article.component.html'
})

export class ArticleComponent{
    articles  = [
        { image :'industry', title : 'title artikel', content : 'content article', createdAt: '20:00'},
        { image :'industry', title : 'title artikel', content : 'content article', createdAt: '20:00'},
        { image :'industry', title : 'title artikel', content : 'content article', createdAt: '20:00'},
        { image :'industry', title : 'title artikel', content : 'content article', createdAt: '20:00'},
        { image :'industry', title : 'title artikel', content : 'content article', createdAt: '20:00'},
    ]
}