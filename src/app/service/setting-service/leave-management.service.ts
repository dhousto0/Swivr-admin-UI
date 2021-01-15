import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../constant';

@Injectable({
  providedIn: 'root'
})
export class LeaveManagementService {

  constructor(private http: HttpClient) { }

  addNationalHoliday(data: any) {
    return this.http.post(API.ADD_NATIONAL_HOLIDAY, data)
  }

  updateNationalHoliday(data: any){
    return this.http.put(API.UPDATE_NATIONAL_HOLIDAY, data);
  }

  removeNationalHoliday(id: number){
    return this.http.delete(API.REMOVE_NATIONAL_HOLIDAY + '?id=' + id);
  }

  nationalHolidayList(start: number, limit: number) {
    return this.http.get(API.NATIONAL_HOLIDAY_LIST + "?start=" + start + "&limit=" + limit);
  }
}
