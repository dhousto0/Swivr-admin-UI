import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {UserServiceService} from '../service/user-service.service';
import {EStatusCode} from "../service/constant";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  userProfileImg: any;
  public errorClose: boolean | undefined;
  private timezone: string | undefined;

  constructor(private fb: FormBuilder,
              private userServiceService: UserServiceService,
              private router: Router,
              private toastr: ToastrService) {
    this.loginForm = this.fb.group({
      username: [''],
      password: ['']
    });
  }

  ngOnInit(): void {
    if (localStorage.getItem('accessToken')) {
      this.router.navigate(['services']);
    }
    let offset = new Date().getTimezoneOffset();

    if (offset < 0) {
      let extraZero = '';
      if (-offset % 60 < 10)
        extraZero = '0';
      this.timezone = '+' + Math.ceil(offset / - 60) + ':' + extraZero + (-offset % 60);
    } else {
      let extraZero = '';
      if (offset % 60 < 10)
        extraZero = '0';

      this.timezone = '-' + Math.floor(offset / 60) + ':' + extraZero + (offset % 60);
    }
  }

  onSubmit() {
    if (!this.loginForm.value.username || !this.loginForm.value.password) {
      this.errorClose = true;
    } else {
      var data = {
        userName: this.loginForm.value.username,
        password: this.loginForm.value.password,
        timeZone: this.timezone
      };
      this.userServiceService.login(data).subscribe((data: any) => {
        if (data.statusCode === EStatusCode.OK) {
          this.toastr.success('', data.message);
          this.userServiceService.updateIsUserLogged.next(true);
          localStorage.setItem('accessToken', data.accessToken);
          localStorage.setItem('fullName', data.admin.fullName);
          localStorage.setItem('adminProfile', data.admin.adminProfile);
          this.router.navigate(['/services']).then(() => {
            window.location.reload();
          });
        } else {
          this.toastr.error('', data.message ? data.message : 'Something went wrong');
        }
      });
    }
  }
}
