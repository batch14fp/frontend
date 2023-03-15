import { AnimationOptions } from 'ngx-lottie';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OnInit } from '@angular/core';
import { AnimationItem } from 'lottie-web';
@Component({
    selector: "app-welcome",
    templateUrl: "./welcome.html",
})

export class WelcomeComponent implements OnInit{
  options: AnimationOptions = {
    path: '../../../../assets/animation/96757-genio-welcome.json'
  };

  ngOnInit(): void {
  }
}
