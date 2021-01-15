import { Injectable } from '@angular/core';
import {API} from './constant';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  public updateIsUserLogged = new BehaviorSubject(false);
  public headerNameUpdate = new BehaviorSubject('');

  constructor(private http: HttpClient) { }

  login(data: any){
    return this.http.post(API.LOGIN, data);
  }

  resetPassword(data: any){
    return this.http.post(API.RESET_PASSWORD, data);
  }

  profileView(){
    return this.http.get(API.PROFILE_VIEW);
  }

  profileUpdate(data: {}){
    return this.http.post(API.PROFILE_UPDATE, data);
  }

  imageUpload(type: string, file: any){
    return this.http.post(API.IMAGE_UPLOAD + '?type=' + type, file);
  }

  getPayoutDetails(){
    return this.http.get(API.PAYOUT_DETAILS);
  }

  addUpdatePayout(data: any) {
    return this.http.post(API.ADD_UPDATE_PAYOUT, data) 
  }
}
