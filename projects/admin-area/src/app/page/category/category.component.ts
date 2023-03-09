import { Component } from "@angular/core";

@Component({
    selector : 'app-category',
    templateUrl : 'category.component.html'
})

export class CategoryComponent{

    categorys  = [
       {code:'po', name :'category'},
       {code:'po', name :'category'},
       {code:'po', name :'category'},
       {code:'po', name :'category'},
       {code:'po', name :'category'},
    ]

}
