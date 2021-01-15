import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {UserServiceService} from '../../service/user-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userProfileImg: string | null | undefined;
  public fullname: string | null = '';

  constructor(private router: Router,
              private userServiceService: UserServiceService) {
  }

  ngOnInit(): void {
    this.userProfileImg = localStorage.getItem('adminProfile');
    this.fullname = localStorage.getItem('fullName');
  }

  logout() {
    localStorage.clear();
    this.userServiceService.updateIsUserLogged.next(false);
    this.router.navigate(['/login']);
  }


  ngOnDestroy() {
  }

  userProfile(type: string) {
    if(type === 'profile') {
      this.router.navigate(['profile']);
    } else {
      this.router.navigate(['password-reset']);
    }
  }
}
