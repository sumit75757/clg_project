import { Injectable } from "@angular/core";
import { HttpErrorResponse, HttpInterceptor } from "@angular/common/http";
import { HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { HttpHandler } from "@angular/common/http";
import { HttpEvent } from "@angular/common/http";
import { HttpResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { catchError, map, tap } from "rxjs/operators";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";

@Injectable({
  providedIn: "root",
})
export class InterceptorService {

  token: any;
    skipInterceptor = false;
    constructor(private router: Router,private toastr: ToastrService, public spiner: NgxSpinnerService) {}

    intercept(
      req: HttpRequest<any>,
      next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status == 401 && error.statusText == "Unauthorized") {

          this.spiner.show()
          localStorage.removeItem("token")
          localStorage.removeItem("userData")
          this.router.navigate(["/login"])
          this.toastr.error('Somthing Wrong! ',"Unauthorized 401")
          setTimeout(() => {

            this.spiner.hide()
          }, 600);
        } else {

        }
        console.log(error);
        let err = error;
        return Observable.throw(error);
      })
    );
  }
}
