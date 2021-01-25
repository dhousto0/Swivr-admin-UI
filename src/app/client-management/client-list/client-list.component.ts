import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import {ClientServiceService} from '../../service/client-service.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {
  dataSource = new MatTableDataSource();
  columnTitle: string[] | undefined;
  rowCount: number = 0;
  pageSize: number = 15;
  prevPageIndex: number | undefined = 0;
  start: number = 0;
  limit: number = 15;
  event: any;
  pageSizeArray = [15, 50, 100];

  constructor(private clientServiceService: ClientServiceService,
    private spinner: NgxSpinnerService) {
    this.columnTitle = ['Client Profile', 'Client Name', 'Email', 'Phone', 'Action'];
  }

  ngOnInit(): void {
    this.getClientList(0, 0);
  }

  getClientList(count = 0, previousPageIndex = 0) {

    this.spinner.show();
    if (count === 0) {
      if (count <= previousPageIndex) {
        this.start = 0;
      } else {
        this.start += this.pageSize;
      }
    } else {
      this.start = count * this.pageSize;
    }

    this.clientServiceService.clientList(this.start, this.limit).subscribe((data: any) => {
      if (data.statusCode === 200) {
        this.dataSource.data = data.list;
        this.rowCount = data.count;
      }
      this.spinner.hide();
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
    this.getClientList(event.pageIndex, event.previousPageIndex);
  }

  setDefaultPic(index: number) {
    // @ts-ignore
    this.dataSource.data[index].profileUrl = '/assets/img/user_profile.jpg';

  }
}
