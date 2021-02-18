import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';
import {catchError, finalize, tap} from 'rxjs/operators';
import {NgxSpinnerService} from 'ngx-spinner';
import {Observable} from 'rxjs';
import {UserServiceService} from './user-service.service';


@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {
  count = 0;

  constructor(private router: Router,
              private spinner: NgxSpinnerService,
              private userServiceService: UserServiceService) {

  }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const reqh = request.clone({
        headers: request.headers.append(
          'Authorization', (token ? 'bearer ' + token : '')
        )
      });
      this.spinner.show();
      this.count++;

      return next.handle(reqh) .pipe (
        catchError((err: any) => {
          this.removeSpinner();
          this.logoutUser();
          return Observable.throw(err);
        }), finalize(() => {
          this.removeSpinner();
        })
      );

      // return next.handle(reqh)
      //   .catch((error: HttpErrorResponse) => {
      //     if ((error as HttpErrorResponse).status === 419) {
      //       this.removeSpinner();
      //       this.logoutUser();
      //       return Observable.throw(error);
      //     } else if ((error as HttpErrorResponse).status === EStatusCode.UNAUTHORIZED) {
      //       this.removeSpinner();
      //       this.logoutUser();
      //       return Observable.throw(error);
      //     } else {
      //       this.removeSpinner();
      //       this.logoutUser();
      //       return Observable.throw(error);
      //     }
      //   }).finally(() => {
      //     this.removeSpinner();
      //     return ;
      //   });
    } else {
      let reqh = request;
      this.router.navigate(['/login']);

      this.spinner.show();
      this.count++;

      return next.handle(reqh) .pipe (
        finalize(() => {
          this.removeSpinner();
        })
      );
    }

  }

  // tslint:disable-next-line:typedef
  logoutUser() {
    localStorage.clear();
    this.router.navigate(['/login']);
    this.userServiceService.updateIsUserLogged.next(false);
    return Observable.throw('');
  }
  removeSpinner() {
    this.count--;

    if ( this.count === 0 ) {
      this.spinner.hide ();
    }
  }
}
