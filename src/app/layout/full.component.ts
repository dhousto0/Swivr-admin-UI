import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserServiceService} from '../service/user-service.service';
import {ISubscription} from 'rxjs-compat/Subscription';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss']
})
export class FullComponent implements OnInit {
public type: string = '';
  private isUserLoggedSubscription: ISubscription;

  constructor(public router: Router,
              private userServiceService: UserServiceService,
              private spinner: NgxSpinnerService) {
    this.isUserLoggedSubscription = this.userServiceService.headerNameUpdate.subscribe((isUserLogged: string) => {
      this.type = '';
      this.type = isUserLogged;
    });
  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
    });
  }

  ngOnDestroy(): void {
  }

  navigateMenu(url: string) {
    this.spinner.show();
    this.type = '';
    this.router.navigate([url]);
  }
}
