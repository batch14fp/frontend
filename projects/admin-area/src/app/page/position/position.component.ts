import { Component } from "@angular/core";

@Component({
    selector: 'app-position',
    templateUrl: 'position.component.html'
})

export class PositionComponent{
    positions = [
        {code:'po', name :'position'},
       {code:'po', name :'position'},
       {code:'po', name :'position'},
       {code:'po', name :'position'},
       {code:'po', name :'position'},
    ]
}