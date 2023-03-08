import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { NgModule } from '@angular/core';
import { ShareModule } from '../../share.module';
import { EmailSendAnimationComponent } from './email-send/email-sendcomponent';



export function playerFactory(): any {
  return import('lottie-web');
}

@NgModule({
    declarations: [
      EmailSendAnimationComponent
    ],
    imports: [
     LottieModule.forRoot({ player: playerFactory }),
    ],
    exports:[
      EmailSendAnimationComponent
    ]
})

export class LoadingModule{

}
