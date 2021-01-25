import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-national-leave',
  templateUrl: './dialog-national-leave.component.html',
  styleUrls: ['./dialog-national-leave.component.scss']
})
export class DialogNationalLeaveComponent implements OnInit {

  constructor(public dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogNationalLeaveComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {
  }

  deleteNationalHoliday() {
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(false);
  }

}
