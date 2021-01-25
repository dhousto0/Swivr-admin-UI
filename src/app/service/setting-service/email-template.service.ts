import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../constant';

@Injectable({
  providedIn: 'root'
})
export class EmailTemplateService {

  constructor(private http: HttpClient) { }

  updateEmailTemplate(data: {}) {
    return this.http.post(API.ADD_UPDATE_EMAIL_TEMPLATE, data);
  }

  getEmailTemplate(){
    return this.http.get(API.GET_EMAIL_TEMPLATE);
  }

  deleteEmailTemplate(emailType: string) {
    return this.http.delete(API.DELETE_EMAIL_TEMPLATE + '?emailType=' + emailType);
  }

  defaultEmailTemplate(){
    return this.http.get(API.DEFAULT_EMAIL_TEMPLATE);
  }
}
