import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http"
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, tap } from "rxjs";
import { UserService } from "../services/user.service";
import { MessageService } from 'primeng/api';



@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
    constructor(private userService : UserService, private router : Router,
      private messageService: MessageService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(req).pipe(
            tap({
                next : (event) => {
                    if(event instanceof HttpResponse) {
                        console.log(event.body)
                        if(event.status !== 200){
                          this.messageService.add({severity:'success', summary: 'Success', detail:event.body.message});
                        }

                    }
                },
                error : (event) => {
                    if(event instanceof HttpErrorResponse) {
                        if(event.status == 401) {
                          this.messageService.add({severity:'error', summary: 'Error', detail: event.error});
                          localStorage.clear()
                            this.router.navigateByUrl('/member/login')
                        }
                        console.log(event.error)
                        // this.router.navigateByUrl("/login")
                        // localStorage.clear()
                    }
                },
                complete : () => {},
                // error : () => {}
            })
        )
        // throw new Error("Method not implemented.");
    }
}
