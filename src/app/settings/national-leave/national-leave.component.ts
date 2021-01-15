import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { LeaveManagementService } from 'src/app/service/setting-service/leave-management.service';

@Component({
  selector: 'app-national-leave',
  templateUrl: './national-leave.component.html',
  styleUrls: ['./national-leave.component.scss']
})
export class NationalLeaveComponent implements OnInit {

  dataSource = new MatTableDataSource();
  nationalLeaveForm: FormGroup;
  columnTitle: string[] | undefined;
  rowCount: number = 0;
  pageSize: number = 15;
  prevPageIndex: number | undefined = 0;
  start: number = 0;
  limit: number = 15;
  event: any;
  pageSizeArray = [15, 50, 100];
  isUpdate = false;
  nationalId: any;
  
  constructor(public formBuilder: FormBuilder,
    public leaveManagementService: LeaveManagementService) {
      this.columnTitle = ['National Holiday', 'Date', 'Action'];
      this.nationalLeaveForm = this.formBuilder.group({
        nationalLeaves: ['', Validators.compose([Validators.pattern(/.*\S.*/), Validators.required])],
        date: ['', Validators.required]
      });
     }

  ngOnInit(): void {
    this.getNationalHoliday(0);
  }

  onChange(event: any) {
    this.event = event.pageIndex;
    if (this.limit !== event.pageSize) {
      this.start -= event.pageSize;
      this.limit = event.pageSize;
      this.pageSize = event.pageSize;
    }
    this.prevPageIndex = event.previousPageIndex;
    this.getNationalHoliday(event.pageIndex, event.previousPageIndex);
  }

  editNationalLeave(data: any) {
    this.isUpdate = true;
    this.nationalId = data.id;
    this.nationalLeaveForm.patchValue({
      nationalLeaves: data.nationalLeaves,
      date: data.date
    });
  }

  getNationalHoliday(count = 0, previousPageIndex = 0){

    if (count === 0) {
      if (count <= previousPageIndex) {
        this.start = 0;
      } else {
        this.start += this.pageSize;
      }
    } else {
      this.start = count * this.pageSize;
    }
   
    this.leaveManagementService.nationalHolidayList(this.start, this.limit).subscribe( (res: any) => {
      if(res.statusCode === 200){
        this.dataSource = res.list;
        this.rowCount = res.count;
      }
    });
  }

  addUpdateNationalLeave(){
    if(this.isUpdate){
      let data = {
        id: this.nationalId,
        nationalLeaves: this.nationalLeaveForm.value.nationalLeaves,
        date: this.nationalLeaveForm.value.date
      }
      this.isUpdate = false;

      this.leaveManagementService.updateNationalHoliday(data).subscribe( (res: any) => {
        if(res.statusCode === 200){
          console.log(res);
          this.getNationalHoliday(0, 0);
        } else {
          console.log(res);
        }
      });

    } else {
      this.leaveManagementService.addNationalHoliday(this.nationalLeaveForm.value).subscribe( (res: any) => {
        if(res.statusCode === 201){
          console.log(res);
          this.getNationalHoliday(0, 0);
        } else {
          console.log(res);

        }
      });
    }

  }

  deleteNationalLeave(id: number) {
    this.leaveManagementService.removeNationalHoliday(id).subscribe((res: any) => {
      if(res.statusCode === 200){
        console.log(res);
        this.getNationalHoliday(0, 0);
      }
    })

  }

  cancel(){
    this.nationalLeaveForm.reset();
  }

}
