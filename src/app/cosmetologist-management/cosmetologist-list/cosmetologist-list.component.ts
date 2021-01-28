import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {CosmetologistServiceService} from '../../service/cosmetologist-service.service';

@Component({
  selector: 'app-cosmetologist-list',
  templateUrl: './cosmetologist-list.component.html',
  styleUrls: ['./cosmetologist-list.component.scss']
})
export class CosmetologistListComponent implements OnInit {
  dataSource = new MatTableDataSource();
  columnTitle: string[] | undefined;
  rowCount: number = 0;
  pageSize: number = 15;
  prevPageIndex: number | undefined = 0;
  start: number = 0;
  limit: number = 15;
  event: any;
  pageSizeArray = [15, 50, 100];

  constructor(private cosmetologistServiceService: CosmetologistServiceService) {
    this.columnTitle = ['Cosmetologist Profile', 'Cosmetologist Name', 'Email', 'Phone', 'Shop name', 'Action'];
  }

  ngOnInit(): void {
    this.getCosmetologistList(0, 0);
  }

  getCosmetologistList(count = 0, previousPageIndex = 0) {

    if (count === 0) {
      if (count <= previousPageIndex) {
        this.start = 0;
      } else {
        this.start += this.pageSize;
      }
    } else {
      this.start = count * this.pageSize;
    }

    this.cosmetologistServiceService.cosmetologistList(this.start, this.limit).subscribe((data: any) => {
      if (data.statusCode === 200) {
        this.dataSource.data = data.list;
        this.rowCount = data.count;
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
    this.getCosmetologistList(event.pageIndex, event.previousPageIndex);
  }

  setDefaultPic(index: number) {
    // @ts-ignore
    this.dataSource.data[index].profileUrl = '/assets/img/user_profile.jpg';
  }
}
