import { Injectable } from '@angular/core';
import {API} from './constant';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CosmetologistServiceService {

  constructor(private http: HttpClient) { }

  cosmetologistList(start: number, limit: number){
    return this.http.get(API.COSMETOLOGIST_LIST + '?start=' + start + '&limit=' + limit);
  }

  cosmetologistDetails(userKey: string | undefined){
    return this.http.get(API.COSMETOLOGIST_DETAILS + '?userKey=' + userKey);
  }

  getAppointmentList(key: any, type: any, start: number, limit: number, timeZone: string){
    timeZone = timeZone.replace('+', '%2B');
    return this.http.get(API.GET_APPOINTMENT_LIST + '?key=' + key + '&type=' + type + '&start=' + start + '&limit=' + limit + '&timeZone=' + timeZone);
  }
}
