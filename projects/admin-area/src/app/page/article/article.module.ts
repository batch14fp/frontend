import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TableModule } from "primeng/table";
import { ShareModule } from "projects/base-area/src/app/share.module";
import { ArticleRouting } from "./article.routing";
import { CreateArticleComponent } from "./create-article/create-article.component";
import { ArticleAdminComponent } from "./list-article/article-admin.component";
import { UpdateArticleComponent } from "./update-article/update-article.component";

@NgModule({
    declarations:[
        CreateArticleComponent,
        ArticleAdminComponent,
        UpdateArticleComponent
    ],
    imports:[
        ArticleRouting,CommonModule, ReactiveFormsModule,FormsModule, HttpClientModule,
        ShareModule,TableModule
    ]
})

export class ArticleModule{}