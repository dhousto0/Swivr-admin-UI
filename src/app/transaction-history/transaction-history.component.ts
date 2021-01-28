import { Component, OnInit } from '@angular/core';
import {transactionHistoryService} from '../service/transaction-history.service';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.scss']
})
export class TransactionHistoryComponent implements OnInit {
  dataSource:any = [];
  columnTitle: string[] | undefined;
  rowCount: number = 0;
  pageSize: number = 15;
  prevPageIndex: number | undefined = 0;
  start: number = 0;
  limit: number = 10;
  event: any;
  pageSizeArray = [15, 50, 100];
  // private data:;

  constructor(private transactionHistoryService: transactionHistoryService) {
    this.columnTitle = ['Customer Profile', 'Customer Name', 'Transaction Id', 'Appointment Id', 'Cosmetologist Name', 'Message', 'Action'];
  }

  ngOnInit(): void {
    this.getTransactionHistory(this.limit, this.start)
  }

  getTransactionHistory(limit: number, start: number){
    let data = {
      start : start,
      limit : limit
    };
    this.transactionHistoryService.getTransactionHistory(data).subscribe((res: any) => {
      if (res.statusCode === 200) {
        this.dataSource = this.dataSource.concat(res.transactionDetails);
      } else {
        this.dataSource = [];
      }

    });
  }

  onChange(event: any) {
    this.event = event.pageIndex;
    if (this.limit !== event.pageSize) {
      this.start -= event.pageSize;
      this.limit = event.pageSize;
      this.pageSize = event.pageSize;
    }
    this.prevPageIndex = event.previousPageIndex;
    // this.getServiceList(event.pageIndex, event.previousPageIndex);
  }

  onScroll() {
    this.start = this.start + 1;
    this.getTransactionHistory(this.limit, ((this.start * this.limit) + 1));
  }

}
