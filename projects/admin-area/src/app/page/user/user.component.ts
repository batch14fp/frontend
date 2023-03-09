import { Component } from "@angular/core";

@Component({
    selector : 'app-user',
    templateUrl : 'user.component.html'
})

export class UserComponent{

    users = [
        {fullname : "ari", email: "ari@gmail.com",phoneNumber : '0876345278',country : 'indonesia', province : 'DKI Jakarta', city : 'jakarta selatan', postalCode : '15315', company : 'PT.Lawencon',industryId : 'IT',positionId : 'Fullstack Developer'},
        {fullname : "ari", email: "ari@gmail.com",phoneNumber : '0876345278',country : 'indonesia', province : 'DKI Jakarta', city : 'jakarta selatan', postalCode : '15315', company : 'PT.Lawencon',industryId : 'IT',positionId : 'Fullstack Developer'},
        {fullname : "ari", email: "ari@gmail.com",phoneNumber : '0876345278',country : 'indonesia', province : 'DKI Jakarta', city : 'jakarta selatan', postalCode : '15315', company : 'PT.Lawencon',industryId : 'IT',positionId : 'Fullstack Developer'},
        {fullname : "ari", email: "ari@gmail.com",phoneNumber : '0876345278',country : 'indonesia', province : 'DKI Jakarta', city : 'jakarta selatan', postalCode : '15315', company : 'PT.Lawencon',industryId : 'IT',positionId : 'Fullstack Developer'},
    ]
}