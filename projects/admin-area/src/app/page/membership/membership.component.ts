import { Component } from "@angular/core";

@Component({
    selector : 'app-membership',
    templateUrl : 'membership.component.html'
})

export class MembershipComponent{
    memberhips = [
        {code:'po', name :'position', periode : '0'},
       {code:'po', name :'position', periode : '30'},
       {code:'po', name :'position', periode : '60'},
       {code:'po', name :'position', periode : '90'},
    ]
}