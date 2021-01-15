import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API} from './constant';

@Injectable({
  providedIn: 'root'
})
export class ClientServiceService {

  constructor(private http: HttpClient) { }

  clientList(start: number, limit: number){
    return this.http.get(API.CLIENT_LIST + '?start=' + start + '&limit=' + limit);
  }

  clientDetails(userKey: string | undefined){
    return this.http.get(API.CLIENT_DETAILS + '?custKey=' + userKey);
  }

  getAppointmentList(key: any, type: any, start: number, limit: number, timeZone: string){
      timeZone = timeZone.replace('+', '%2B');
    return this.http.get(API.GET_CLIENT_APPOINTMENT_LIST + '?key=' + key + '&type=' + type + '&start=' + start + '&limit=' + limit + '&timeZone=' + timeZone);
  }
}
