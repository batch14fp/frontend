import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ArticleComponent } from "./article.component";
import { ArticleDetailComponent } from "./detail.component";

const articleRoutes:Routes = [
    {
        path : '',
        component : ArticleComponent
    },
    {
        path : 'detail/:id',
        component : ArticleDetailComponent
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(articleRoutes)
    ],
    exports:[
        RouterModule
    ]
})

export class ArticleRouting{}