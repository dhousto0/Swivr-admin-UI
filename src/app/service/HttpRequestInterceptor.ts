import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {BehaviorSubject} from "rxjs";
import {Router} from '@angular/router';
import {catchError, finalize, tap} from 'rxjs/operators';
import {Observable} from "rxjs";
import {NgxSpinnerService} from "ngx-spinner";


@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {
  count = 0;

  constructor(private router: Router,
              private spinner: NgxSpinnerService) {

  }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // const currentUser = localStorage.getItem('login');
    // if(currentUser === 'true') {
    // } else {
    //   this.router.navigate(['/login']);
    // }
    const token = localStorage.getItem('accessToken');
    if (token) {
      const reqh = request.clone({
        headers: request.headers.append(
          'Authorization', (token ? 'bearer ' + token : '')
        )
      });
      this.spinner.show();
      this.count++;

      return next.handle(reqh) .pipe ( tap (

        ), finalize(() => {
        this.count--;

        if ( this.count === 0 ) {
          this.spinner.hide ();
        }
        })
      );
    } else {
      let reqh = request;
      this.router.navigate(['/login']);

      this.spinner.show();
      this.count++;

      return next.handle(reqh) .pipe ( tap (

        ), finalize(() => {
        this.count--;

        if ( this.count === 0 ) {
          this.spinner.hide ();
        }
        })
      );
    }

  }


}
