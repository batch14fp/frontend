import { AnimationOptions } from 'ngx-lottie';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OnInit } from '@angular/core';
import { AnimationItem } from 'lottie-web';
@Component({
    selector: "app-email-send",
    templateUrl: "./email-send.component.html",
})

export class EmailSendAnimationComponent implements OnInit{
  options: AnimationOptions = {

    path: '../../../../assets/animation/130189-email.json',
  };

  ngOnInit(): void {
  }
}
