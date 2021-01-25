import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import {UserServiceService} from '../service/user-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public userId: string | null | undefined;
  public vendorDetails: any;
  profileForm: FormGroup;
  isUpdate: boolean = false;
  public profileDetails: any;
  uploadedFiles: Array<File> = [] ;

  constructor(private fb: FormBuilder,
              private userServiceService: UserServiceService,
              private spinner: NgxSpinnerService,
              private toastr: ToastrService) {
    this.profileForm = this.fb.group({
      userName: [],
      email: [],
      contact: [],
      image: [],
      fullName: []
    });
  }
  ngOnInit(): void {
    this.spinner.show();
    this.profileView();
    this.userId = localStorage.getItem('userId');

  }

  profileView() {
    this.userServiceService.profileView().subscribe((data: any) => {
      if (data.statusCode === 200) {
        this.profileDetails = data.admin;
        localStorage.setItem('fullName', this.profileDetails.fullName);
        localStorage.setItem('adminProfile', this.profileDetails.adminProfileUrl);
      }
      this.spinner.hide();

    });
  }

  fileChange(element: any) {
    this.uploadedFiles = element.target.files;
  }

  profileUpdate() {
    this.spinner.show();

    if (this.uploadedFiles.length) {
      let formData = new FormData();
      for (var i = 0; i < this.uploadedFiles.length; i++) {
        formData.append("file", this.uploadedFiles[i], this.uploadedFiles[i].name);
      }
      this.userServiceService.imageUpload('ADMIN', formData).subscribe((res: any) => {
        if (res.statusCode === 200) {
          let data = {
            fullName: this.profileForm.value.fullName,
            userName: this.profileForm.value.userName,
            email: this.profileForm.value.email,
            phone: this.profileForm.value.contact,
            adminProfile: res.url
          };
          this.userServiceService.profileUpdate(data).subscribe((data: any) => {
            if (data.statusCode === 200) {
              this.isUpdate = false;
              this.toastr.success('', data.message);

              this.uploadedFiles = [];
              this.profileView();
            } else {
              this.toastr.error('', data.message);
              this.spinner.hide();
            }
          });
        } else {
          this.toastr.error('', res.message);
          this.spinner.hide();
        }
      });
    } else {
      let data = {
        fullName: this.profileForm.value.fullName,
        email: this.profileForm.value.email,
        phone: this.profileForm.value.contact,
        userName: this.profileForm.value.userName,
        adminProfile: this.profileDetails.adminProfile
      };
      this.userServiceService.profileUpdate(data).subscribe((data: any) => {
        if (data.statusCode === 200) {
          this.isUpdate = false;
          this.toastr.success('', data.message);
          this.profileView();
        } else {
          this.toastr.error('', data.message);
          this.spinner.hide();
        }

      });
    }
  }

  editUpdate(type: string) {
    this.isUpdate = type === 'edit';
    this.profileForm.patchValue({
      userName: this.profileDetails.userName,
      email: this.profileDetails.email,
      contact: this.profileDetails.phone,
      fullName: this.profileDetails.fullName
    });
  }

  setDefaultPic() {
    if (this.profileDetails) {
      this.profileDetails.adminProfileUrl = '/assets/img/user_profile.jpg';
    }
  }
}
