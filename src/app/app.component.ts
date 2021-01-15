import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {UserServiceService} from './service/user-service.service';
import {ISubscription} from 'rxjs-compat/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private isUserLoggedSubscription: ISubscription;
  isUserLoggedIn = true;

  constructor(public router: Router, private userServiceService: UserServiceService) {
    this.isUserLoggedSubscription = this.userServiceService.updateIsUserLogged.subscribe((isUserLogged: boolean) => {
      this.isUserLoggedIn = isUserLogged;
    });
  }


  ngOnInit() {
    this.isUserLoggedIn = !!localStorage.getItem('accessToken');
  }

}
