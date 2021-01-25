import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  serviceId: number = 0;

  constructor(public dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
      this.serviceId = this.data.serviceId;
     }

  ngOnInit(): void {
  }

  deleteService(){
    this.dialogRef.close(true)
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
