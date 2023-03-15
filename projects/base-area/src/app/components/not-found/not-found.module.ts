import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { NgModule } from '@angular/core';
import {  NotFoundAnimationComponent } from './not-found-animation.component';



export function playerFactory(): any {
  return import('lottie-web');
}

@NgModule({
    declarations: [
      NotFoundAnimationComponent
    ],
    imports: [
     LottieModule.forRoot({ player: playerFactory }),
    ],
    exports:[
      NotFoundAnimationComponent
    ]
})

export class NotFoundModule{

}
