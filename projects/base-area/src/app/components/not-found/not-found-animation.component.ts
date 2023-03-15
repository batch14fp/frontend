import { ActivatedRouteSnapshot } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OnInit } from '@angular/core';
import { AnimationItem } from 'lottie-web';
@Component({
    selector: "app-not-found-animation",
    templateUrl: "./not-found-animation.component.html",
})

export class NotFoundAnimationComponent implements OnInit{
  options: AnimationOptions = {
    path: '../../../assets/animation/108851-page-not-found.json'
  };

  ngOnInit(): void {
  }
}
