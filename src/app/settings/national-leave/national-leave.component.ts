import {Component, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { LeaveManagementService } from 'src/app/service/setting-service/leave-management.service';
import {DialogComponent} from "../../service-management/dialog/dialog.component";

@Component({
  selector: 'app-national-leave',
  templateUrl: './national-leave.component.html',
  styleUrls: ['./national-leave.component.scss']
})
export class NationalLeaveComponent implements OnInit {

  dataSource = new MatTableDataSource();
  nationalLeaveForm: FormGroup;
  @ViewChild('picker') picker: any;
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
  dateStartDate: any = { showDate: new Date() };

  constructor(public formBuilder: FormBuilder,
    public leaveManagementService: LeaveManagementService,
    private toastr: ToastrService,
    public dialog: MatDialog) {
      this.columnTitle = ['National Holiday', 'Date', 'Action'];
      this.nationalLeaveForm = this.formBuilder.group({
        nationalLeaves: ['', Validators.compose([Validators.pattern(/.*\S.*/), Validators.required])],
        date: ['', Validators.compose([Validators.pattern(/.*\S.*/), Validators.required])]
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
      if (res.statusCode === 200){
        this.dataSource = res.list;
        this.rowCount = res.count;
      }
    });
  }

  addUpdateNationalLeave(){
    if (this.nationalLeaveForm.invalid) {
      return;
    } else {

      if (this.isUpdate) {
        let data = {
          id: this.nationalId,
          nationalLeaves: this.nationalLeaveForm.value.nationalLeaves,
          date: this.nationalLeaveForm.value.date
        };
        this.isUpdate = false;

        this.leaveManagementService.updateNationalHoliday(data).subscribe((res: any) => {
          if (res.statusCode === 200) {
            this.toastr.success('', res.message);
            this.nationalLeaveForm.patchValue({
              nationalLeaves: '',
              date: ''
            });
            this.getNationalHoliday(0, 0);
          } else {
            this.toastr.error('', res.message);
          }
        });

      } else {
        this.leaveManagementService.addNationalHoliday(this.nationalLeaveForm.value).subscribe((res: any) => {
          if (res.statusCode === 201) {
            console.log(res);
            this.toastr.success('', res.message);
            this.nationalLeaveForm.patchValue({
              nationalLeaves: '',
              date: ''
            });
            this.getNationalHoliday(0, 0);
          } else {
            this.toastr.error('', res.message);
          }
        });
      }

    }
  }

  deleteNationalLeave(value: any) {

    const dialogRef = this.dialog.open(DialogComponent, {
      width: "35vw",
      height: "30vh",
      data: { id: value.id, nationalLeaves: value.nationalLeaves}
    });


    dialogRef.afterClosed().subscribe((res: any) => {
      if(res){
          this.leaveManagementService.removeNationalHoliday(value.id).subscribe((data: any) => {
          if(data.statusCode === 200){
            this.toastr.success('', data.message);
            this.getNationalHoliday(0, 0);

          } else {
            this.toastr.error('', data.message);
          }
        });
      }
    });

  }

  cancel(){
    this.nationalLeaveForm.reset();
  }
}
