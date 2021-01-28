import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import {ServiceManagementService} from '../service/service-management.service';
import { UserServiceService } from '../service/user-service.service';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-service-management',
  templateUrl: './service-management.component.html',
  styleUrls: ['./service-management.component.scss']
})
export class ServiceManagementComponent implements OnInit {
  dataSource = new MatTableDataSource();
  servicesList: any;
  serviceForm: FormGroup;
  columnTitle: string[] | undefined;
  rowCount: number = 0;
  pageSize: number = 15;
  prevPageIndex: number | undefined = 0;
  start: number = 0;
  limit: number = 15;
  event: any;
  pageSizeArray = [15, 50, 100];
  serviceText: string | undefined;
  public isUpdate: boolean = false;
  private serviceId: any;
  uploadedFiles: Array<File> = [] ;
  profileUrl: any = '';

  constructor(public formBuilder: FormBuilder,
              public serviceManagementService: ServiceManagementService,
              public userServiceService: UserServiceService,
              private toastr: ToastrService,
              public dialog: MatDialog) {
    this.columnTitle = ['Service Image', 'Service Name', 'Action'];
    this.serviceForm = this.formBuilder.group({
      serviceName: ['', Validators.required],
      serviceImage: ['']
    });
  }

  ngOnInit() {
    this.serviceText = 'Create Service';
    this.getServiceList(0, 0);
  }

  getServiceList(count = 0, previousPageIndex = 0) {

    if (count === 0) {
      if (count <= previousPageIndex) {
        this.start = 0;
      } else {
        this.start += this.pageSize;
      }
    } else {
      this.start = count * this.pageSize;
    }
    let filter = {
      limit: this.limit,
      start: this.start,
      search: '',
    };

    this.serviceManagementService.serviceList().subscribe((data: any) => {
      if (data.statusCode === 200) {
        this.servicesList = data.list;
        this.dataSource.data = data.list;
        this.rowCount = data.list.length;
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
    this.getServiceList(event.pageIndex, event.previousPageIndex);
  }

  addUpdateService() {
    if(this.serviceForm.invalid) {
      return;
    } else {

      if (this.isUpdate) {
        let data = {
          id: this.serviceId,
          serviceName: this.serviceForm.value.serviceName,
          serviceImageUrl: this.serviceForm.value.serviceImage
        };
        if (this.uploadedFiles.length) {
          let formData = new FormData();
          for (var i = 0; i < this.uploadedFiles.length; i++) {
            formData.append("file", this.uploadedFiles[i], this.uploadedFiles[i].name);
          }
          this.userServiceService.imageUpload('SERVICES', formData).subscribe((res: any) => {
            if (res.statusCode === 200) {
              data.serviceImageUrl = res.url;
              this.serviceManagementService.serviceUpdate(data).subscribe((data: any) => {
                if (data.statusCode === 200) {
                  this.serviceText = 'Create Service';
                  this.serviceForm.reset();
                  this.getServiceList(0, 0);
                  this.toastr.success('', data.message)
                } else {
                  this.toastr.error('', data.message)
                }
              });
            } else {
              this.toastr.error('', res.message);
            }
          });
        } else {
          this.serviceManagementService.serviceUpdate(data).subscribe((data: any) => {
            if (data.statusCode === 200) {
              this.serviceText = 'Create Service';
              this.serviceForm.reset();
              this.getServiceList(0, 0);
              this.toastr.success('', data.message)
            } else {
              this.toastr.error('', data.message)
            }
          });
        }
      } else {
        let data = {
          serviceName: this.serviceForm.value.serviceName,
          serviceImageUrl: this.serviceForm.value.serviceImage
        };
        if (this.uploadedFiles.length) {
          let formData = new FormData();
          for (var i = 0; i < this.uploadedFiles.length; i++) {
            formData.append("file", this.uploadedFiles[i], this.uploadedFiles[i].name);
          }
          this.userServiceService.imageUpload('SERVICES', formData).subscribe((res: any) => {
            if (res.statusCode === 200) {
              data.serviceImageUrl = res.url;
              this.serviceManagementService.serviceAdd(data).subscribe((data: any) => {
                if (data.statusCode === 201) {
                  this.serviceText = 'Create Service';
                  this.serviceForm.reset();
                  this.toastr.success('', data.message)
                  this.getServiceList(0, 0);
                } else {
                  this.toastr.error('', data.message);
                }
              });
            } else {
              this.toastr.error('', res.message);
            }

          });
        } else {
          this.serviceManagementService.serviceAdd(data).subscribe((data: any) => {
            if (data.statusCode === 201) {
              this.serviceText = 'Create Service';
              this.serviceForm.reset();
              this.toastr.success('', data.message);
              this.getServiceList(0, 0);
            } else {
              this.toastr.error('', data.message);
            }
          });
        }

      }
    }

  }


  cancel() {
    this.serviceText = 'Create Service';
    this.serviceId = 0;
    this.isUpdate = false;
    this.serviceForm.reset();
  }

  editUpdate(data: any) {
    this.serviceText = 'Update Service';
    this.serviceId = data.id;
    this.isUpdate = true;
    this.profileUrl = data.profileUrl;
    this.serviceForm.patchValue( {
      serviceName: data.serviceName,
      // serviceImage: data.serviceImageUrl
    });
    this.serviceForm.value.serviceImage = data.serviceImageUrl;
  }

  serviceDelete(value: any) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: "35vw",
      height: "30vh",
      data: { serviceId: value.id, serviceName: value.serviceName}
    });

    dialogRef.afterClosed().subscribe((res: any) => {
      if(res){
          this.serviceManagementService.serviceDelete(value.id).subscribe((data: any) => {
          if(data.statusCode === 200){
            this.toastr.success('', data.message);
            this.getServiceList(0, 0);
          } else {
            this.toastr.error('', data.Message);
          }
        });
      }
    });

  }

  fileChange(element: any) {
    this.uploadedFiles = element.target.files;
  }

  setDefaultPic() {
      this.profileUrl = '/assets/img/user_profile.jpg';
  }
}
