import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ServiceManagementService } from 'src/app/service/service-management.service';
import {EStatusCode} from "../../service/constant";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  serviceId: number = 0;
  public serviceImageLists: any = [];
  image: any;

  constructor(public dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private serviceManagementService: ServiceManagementService,
    private toaster: ToastrService
    ) {
      this.serviceId = this.data.serviceId;
      if(data.type && data.type === 'service'){
        this.serviceImagesList();
      }
     }

  ngOnInit(): void {
  }

  serviceImagesList() {

    this.serviceManagementService.serviceImageList().subscribe( (res: any) => {
      if(res.statusCode === EStatusCode.OK){
        res.list.forEach( (obj: any) => {
          obj.isSelected = false;
        });
        this.serviceImageLists = res.list;
      } else {
        this.serviceImageLists = [];
      }
    })

  }

  deleteService(){
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(false);
  }

  chooseImage(image: any){
    this.serviceImageLists.forEach( (list: any) => {
      if(list.categoryName === image.categoryName){
        list.isSelected = list.isSelected ? false : true;
        this.image = list;
      } else {
        list.isSelected = false;
      }
    });
    // image.isSelected = image.isSelected ? false : true;
    // this.image = image;
  }

  addImage(){
    if(this.image && this.image.isSelected){
      this.dialogRef.close(this.image);
    } else {
      this.toaster.error('', 'Please Choose Service Image');
    }
  }
}
