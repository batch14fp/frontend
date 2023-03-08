import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: "app-button-primary",
    template:
    `<button pButton pRipple
    type="button"
    [label]="label"
    class="p-button-rounded bg-indigo-600 hover:bg-indigo-800 border-transparent 
    text-white px-6 py-2 text-md font-base w-full h-full">
    </button>`,
})

export class ButtonPrimary{
   @Output() clickButton = new EventEmitter<void>()
   @Input() label = ""
   @Input() height = ""
   @Input() width = ""


  class: string = ""

   onClickButton(): void {
    this.clickButton.emit()
   }
}
