import { Component } from "@angular/core";

@Component({
    selector : 'app-setting',
    templateUrl : 'salesseting.component.html'
})

export class SalesSettingComponent{
    
    settings = [
        {tax: "0.8", systemIncome : "0.6", memberIncome : "0.3"},
        {tax: "0.8", systemIncome : "0.6", memberIncome : "0.3"},
        {tax: "0.8", systemIncome : "0.6", memberIncome : "0.3"}
    ]
}