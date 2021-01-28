import {Injectable,OnInit} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {

  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot) {

    if (localStorage.getItem('accessToken')) {
      if (state.url === '/login') {
          this.router.navigate(['/services']);
          return false;
      } else if (state.url === '/') {
        this.router.navigate(['/services']);
        return false;
      } else {
        this.router.navigate([state.url]);
        return false;
      }

    } else {
      console.log('state.url', state.url);  //nope
      localStorage.setItem("redirectUrl",state.url);
      this.router.navigate(['/login']);
      return false;
    }

  }
}
