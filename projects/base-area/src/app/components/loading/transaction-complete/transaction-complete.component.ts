import { AnimationOptions } from 'ngx-lottie';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OnInit } from '@angular/core';
import { AnimationItem } from 'lottie-web';
@Component({
    selector: "app-transaction-complete",
    templateUrl: "./transaction-complete.component.html",
})

export class TransactionCompleteComponent implements OnInit{
  options: AnimationOptions = {

    path: '../../../../assets/animation/112147-pay-now.json',
  };

  ngOnInit(): void {
  }
}
