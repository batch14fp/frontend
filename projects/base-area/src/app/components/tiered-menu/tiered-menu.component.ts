import { CommonModule } from "@angular/common";
import { Component, ContentChild, ElementRef, EventEmitter, Input, Output, TemplateRef } from "@angular/core";
import { MenuItem } from "primeng/api";

import { TieredMenuModule } from 'primeng/tieredmenu';

@Component({
    selector: 'app-tiered-menu',
    template: `
    <div >
        <div style="display: inline-block; position: relative;">
            <div (click)="toggle()">
                <ng-container *ngTemplateOutlet="content"></ng-container>
            </div>

            <div *ngIf="showContent" [style]="contentStyle" class="shadow-4 overflow-hidden border-round-md z-2">
                <p-tieredMenu [model]="model" (click)="toggle()" [autoDisplay]="true"></p-tieredMenu>
            </div>
        </div>
    </div>
    `,
    standalone: true,
    imports: [
        CommonModule, TieredMenuModule
    ]
})
export class TieredMenuCustomComponent {

    @Input() model: MenuItem[] = []

    @Input() rightSpace = '5px'
    @Input() topSpace = '0'

    @Output() toggleClick = new EventEmitter<void>()

    @ContentChild(TemplateRef) content!: TemplateRef<any>

    contentStyle = ''
    showContent = false
    documentClickListener: any

    constructor(public el: ElementRef) { }

    ngOnChanges(): void {
        this.contentStyle = `right: ${this.rightSpace}; margin-top : ${this.topSpace}; position: absolute;`
    }

    toggle(): void {
        this.showContent = !this.showContent
        if (this.showContent) this.bindDocumentClickListener()
        else this.unbindDocumentClickListener()
    }

    bindDocumentClickListener() {
        if (!this.documentClickListener) {
            this.documentClickListener = (event: any) => {
                if (this.el && !this.el.nativeElement.contains(event.target)) {
                    this.toggle()
                    this.unbindDocumentClickListener();
                }
            };

            document.addEventListener('click', this.documentClickListener);
        }
    }

    unbindDocumentClickListener() {
        if (this.documentClickListener) {
            document.removeEventListener('click', this.documentClickListener);
            this.documentClickListener = null;
        }
    }
}
