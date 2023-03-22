import { Component, OnDestroy, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { AllUserRes } from "@dto/user/all-user-res";
import { UserService } from "@service/user.service";
import { LazyLoadEvent } from "primeng/api";
import { Subscription } from "rxjs";

@Component({
    selector : 'app-user',
    templateUrl : './user.component.html'
})

export class UserComponent implements OnInit, OnDestroy{
    private users$?:Subscription

    allUsers:AllUserRes[] = []

    startPage: number = 0
    maxPage: number = 3
    totalData: number = 0
    query?: string
    loading: boolean = true
    
    constructor(private userService: UserService, private title: Title,
        private router: Router) {
        this.title.setTitle("User")
    }

    loadData(event: LazyLoadEvent) {
        console.log(event)
        this.getData(event.first, event.rows, event.globalFilter)
    }

    
  getData(startPage: number = this.startPage, maxPage: number = this.maxPage, query?: string): void {
    this.loading = true;
    this.startPage = startPage
    this.maxPage = maxPage
    this.query = query

    this.users$ = this.userService.getAllUser(startPage, maxPage, query).subscribe(
      result => {
        const resultData: any = result
        this.allUsers = resultData.data
        this.loading = false
        this.totalData = resultData.total
        console.log(resultData)
      },
    )
  }

    ngOnInit(): void {
       
    }

    ngOnDestroy(): void {
        this.users$?.unsubscribe()
    }
}