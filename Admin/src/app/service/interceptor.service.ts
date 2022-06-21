
import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHandler } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {
  token: any;
  omitCalls = ['auth'];
  skipInterceptor = false;
  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.omitCalls.forEach(api => {
      if (req.url.includes(api)) {
        this.skipInterceptor = true;

      }
    });
    this.token = localStorage.getItem('token');
    if (this.token || this.skipInterceptor) {
      const tokenizedReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + this.token) });
      return next.handle(tokenizedReq).pipe(map((event: any) => {

        console.log("fasdfasdfasdfasdfasdfasdfasdfA", event.status);

        if (event instanceof HttpResponse) {
          if (event.status === 401) {
            localStorage.removeItem('token')
            this.router.navigateByUrl('/login');

          }
        }
        return event;
      }));
    } else {
      localStorage.removeItem('token')
      this.router.navigateByUrl('');
    }
    return next.handle(req);
  }
}
