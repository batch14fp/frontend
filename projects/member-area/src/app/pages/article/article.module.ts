import { NgModule } from "@angular/core";
import { ShareModule } from "projects/base-area/src/app/share.module";
import { ArticleComponent } from "./article.component";
import { ArticleRouting } from "./article.routing";
import { ArticleDetailComponent } from "./detail.component";

@NgModule({
    declarations:[
        ArticleComponent,ArticleDetailComponent
    ],
    imports: [
        ShareModule,ArticleRouting
    ]
})

export class ArticleModule{}