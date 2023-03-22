import { AnimationOptions } from 'ngx-lottie';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OnInit } from '@angular/core';
import { AnimationItem } from 'lottie-web';
@Component({
    selector: "app-like",
    templateUrl: "./like.component.html",
})

export class LikeComponent implements OnInit{
  options: AnimationOptions = {

    path: '../../../../assets/animation/67021-love-animation-with-particle.json',
  };

  ngOnInit(): void {
  }
}
