import { NgModule } from '@angular/core';
import { ShareModule } from '../../share.module';
import {SkeletonModule} from 'primeng/skeleton';
import { CourseCardSkeletonComponent } from './course-card-skeleton/course-card-skeleton';


@NgModule({
    declarations: [
      CourseCardSkeletonComponent,
    ],
    imports: [
      SkeletonModule
    ],
    exports:[
      CourseCardSkeletonComponent,
    ]
})

export class CustomSkeletonModule{

}
