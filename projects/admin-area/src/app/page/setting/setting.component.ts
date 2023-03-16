import { Component } from "@angular/core";

@Component({
    selector : 'app-setting',
    templateUrl : 'setting.component.html' 
})

export class SettingComponent{
    settings = [
        {code:'po', name :'position'},
       {code:'po', name :'position'},
       {code:'po', name :'position'},
       {code:'po', name :'position'},
    ]
}