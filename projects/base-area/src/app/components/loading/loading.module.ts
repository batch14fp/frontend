import { WelcomeComponent } from './welcome/welcome';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { NgModule } from '@angular/core';
import { ShareModule } from '../../share.module';
import { EmailSendAnimationComponent } from './email-send/email-sendcomponent';
import { SearchDataComponent } from './search-data/search-data.componenet';
import { LoadingDotComponent } from './loading-dot/loading-dot.component';



export function playerFactory(): any {
  return import('lottie-web');
}

@NgModule({
    declarations: [
      EmailSendAnimationComponent, SearchDataComponent, LoadingDotComponent, WelcomeComponent
    ],
    imports: [
     LottieModule.forRoot({ player: playerFactory }),
    ],
    exports:[
      EmailSendAnimationComponent, SearchDataComponent, LoadingDotComponent, WelcomeComponent
    ]
})

export class LoadingModule{

}
