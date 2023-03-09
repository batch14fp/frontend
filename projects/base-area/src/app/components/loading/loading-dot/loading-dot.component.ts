import { AnimationOptions } from 'ngx-lottie';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OnInit } from '@angular/core';
import { AnimationItem } from 'lottie-web';
@Component({
    selector: "app-loading-dot",
    templateUrl: "./loading-dot.componenet.html",
})

export class LoadingDotComponent implements OnInit{
  options: AnimationOptions = {

    path: '../../../../assets/animation/97930-loading-dot.json',
  };

  ngOnInit(): void {
  }
}
