import { Component, OnInit } from "@angular/core";

@Component({
    selector : 'app-profile',
    templateUrl : 'profile.component.html'
})



export class ProfileComponent implements OnInit{

  countries!: any[]

  constructor(){}


  ngOnInit(): void {
    const countryService= require('countrycitystatejson')
    console.log(countryService.getCountries())
    console.log(countryService.getStatesByShort('ID'))
    console.log(countryService.getCities('ID', 'Jakarta'))
  }



}
