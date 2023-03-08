import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OnInit } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
@Component({
    selector: "app-email-send",
    templateUrl: "./email-send.component.html",
})

export class EmailSendAnimationComponent implements OnInit{

  @Input() options: AnimationOptions = {
    path: '../../../../assets/animation/130189-email.json'
  };

  ngOnInit(): void {
  }

  onAnimate(animationItem: AnimationItem): void {
    console.log(animationItem);
  }
}
