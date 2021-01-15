import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { API } from './constant';

@Injectable({
  providedIn: 'root'
})
export class ServiceManagementService {

  constructor(private http: HttpClient) { }

  serviceList(){
    return this.http.get(API.SERVICE_LIST);
  }

  serviceAdd(data: any){
    return this.http.post(API.SERVICE_ADD, data);
  }

  serviceUpdate(data: any){
    return this.http.put(API.SERVICE_UPDATE, data);
  }

  serviceDelete(serviceId: number){
    return this.http.delete(API.SERVICE_DELETE + '?serviceId=' + serviceId);
  }
}
