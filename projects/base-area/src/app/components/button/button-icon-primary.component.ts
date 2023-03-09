import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: "app-button-icon",
    template:
    `<button pButton pRipple
    type="button"
    [label]="label"
    class="p-button-round bg-indigo-600 hover:bg-indigo-800 border-transparent text-white text-md font-base w-full h-full"><i class="pi pi-pencil"></i>
    </button>`,
})

export class ButtonIconPrimary{
   @Output() clickButton = new EventEmitter<void>()
   @Input() label = ""


  class: string = ""

   onClickButton(): void {
    this.clickButton.emit()
   }
}
