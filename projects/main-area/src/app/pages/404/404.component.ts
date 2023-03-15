import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { getInitials } from '../../../../../base-area/src/app/utils/getInitial';
import { Subscription } from "rxjs";
import { FormBuilder, Validators } from "@angular/forms";
import { UserService } from '../../../../../base-area/src/app/services/user.service';
import { Router } from "@angular/router";
import { CategoryService } from '../../../../../base-area/src/app/services/category.service';
import { CategoryRes } from '../../../../../base-area/src/app/dto/category/category-res';


@Component({
    selector:'app-404-not-found',
    templateUrl: './404.component.html'
})


export class NotFoundComponent{
  constructor(private title: Title, private fb: FormBuilder,
    private userService: UserService,  private router: Router,private categoryService: CategoryService){
      this.title.setTitle("Not Found")
    }

    private category$?: Subscription


}
