import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {BehaviorSubject} from "rxjs";
import {Router} from '@angular/router';
import {catchError, finalize, tap} from 'rxjs/operators';
import {Observable} from "rxjs";


@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {

  constructor(private router: Router) {

  }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // const currentUser = localStorage.getItem('login');
    // if(currentUser === 'true') {
    // } else {
    //   this.router.navigate(['/login']);
    // }
    const token = localStorage.getItem('accessToken');
    const reqh = request.clone({
        headers: request.headers.append(
          'Authorization', (token ? 'bearer ' + token : '')
        )
      });

    return next.handle(reqh) .pipe ( tap (

        ), finalize(() => {
        })
      );
  }


}
