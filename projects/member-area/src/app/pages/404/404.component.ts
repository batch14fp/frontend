import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { Subscription } from "rxjs";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from '@service/user.service';
import { CategoryService } from '@service/category.service';



@Component({
    selector:'app-404-not-found',
    templateUrl: './404.component.html'
})


export class NotFoundComponent{
  constructor(private title: Title, private fb: FormBuilder,
    private userService: UserService,  private router: Router,private categoryService: CategoryService){
      this.title.setTitle("Not Found")
    }


}
