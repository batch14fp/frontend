import { AnimationOptions } from 'ngx-lottie';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OnInit } from '@angular/core';
import { AnimationItem } from 'lottie-web';
@Component({
    selector: "app-search-data",
    templateUrl: "./search-data.componenet.html",
})

export class SearchDataComponent implements OnInit{
  options: AnimationOptions = {

    path: '../../../../assets/animation/99297-loading-files.json',
  };

  ngOnInit(): void {
  }
}
