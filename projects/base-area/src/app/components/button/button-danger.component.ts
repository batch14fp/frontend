import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: "app-button-danger",
    template:
    `<button pButton pRipple
    type="button"
    [label]="label"
    class="p-button-round bg-red-600 hover:bg-red-800 border-transparent text-white py-2 text-md font-base w-full h-full"> <i class="pi pi-trash"></i>
    </button>`,
})

export class ButtonDanger{
   @Output() clickButton = new EventEmitter<void>()
   @Input() label = ""
   


  class: string = ""

   onClickButton(): void {
    this.clickButton.emit()
   }
}
