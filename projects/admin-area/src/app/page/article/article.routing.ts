import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreateArticleComponent } from "./create-article/create-article.component";
import { ArticleAdminComponent } from "./list-article/article-admin.component";

const articleRoutes:Routes =[
    {
        path:'',
        component:ArticleAdminComponent
    },
    {
        path:'create',
        component:CreateArticleComponent
    }
]

@NgModule({
    imports:[
        RouterModule.forChild(articleRoutes)
    ],
    exports:[
        RouterModule
    ]
})
export class ArticleRouting{}