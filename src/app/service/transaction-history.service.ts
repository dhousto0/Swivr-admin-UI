import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { API } from './constant';

@Injectable({
  providedIn: 'root'
})

export class transactionHistoryService {

  constructor(private http: HttpClient) { }

  getTransactionHistory(data: any){
    return this.http.get(API.TRANSACTION_HISTORY + '?start=' + data.start + '&limit=' + data.limit);
  }
}
