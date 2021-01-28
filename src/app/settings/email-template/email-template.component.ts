import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailTemplateService } from 'src/app/service/setting-service/email-template.service';

@Component({
  selector: 'app-email-template',
  templateUrl: './email-template.component.html',
  styleUrls: ['./email-template.component.scss']
})
export class EmailTemplateComponent implements OnInit {

  emailTemplatesForm: FormGroup;
  ckeConfig: any;
  templateList: any[] = [];
  isUpdate: boolean = false;
  selectedTemplate: any;

  constructor(private fb: FormBuilder, private emailTemplateService: EmailTemplateService) {
    this.emailTemplatesForm = this.fb.group({
      templatetype: ['', Validators.compose([Validators.pattern(/.*\S.*/), Validators.required])],
      templateSubject: ['', Validators.compose([Validators.pattern(/.*\S.*/), Validators.required])],
      emailTemplateBody: ['']
    });
    this.getCkEditorConfig();
    this.getEmailTemplate();
  }

  formValid() {
    this.emailTemplatesForm = this.fb.group({
      templatetype: ['', Validators.compose([Validators.pattern(/.*\S.*/), Validators.required])],
      templateSubject: ['', Validators.compose([Validators.pattern(/.*\S.*/), Validators.required])],
      emailTemplateBody: ['']
    });
  }

  ngOnInit(): void {
  }

  getCkEditorConfig() {
    this.ckeConfig = {
      fullPage: true,
      protectedSource: [/<head[\s\S]*?\/head>/gi],
      allowedContent: true,
      extraAllowedContent: 'head;',
      extraPlugins: 'divarea',
      forcePasteAsPlainText: true,
      disableNativeSpellChecker: false,
      scayt_autoStartup: true,
      removePlugins: 'save,print,preview,new',
      height: '300px'
    };
  }

  getEmailTemplate(){
    this.emailTemplateService.getEmailTemplate().subscribe( (res: any) => {
      if(res.statuscode === 200){
        this.templateList = res.list;
        if(!this.isUpdate){
          this.selectedTemplate = res.list[0];
          this.emailTemplatesForm.patchValue({
            templatetype: res.list[0].emailType,
            templateSubject: res.list[0].subject,
            emailTemplateBody: res.list[0].templateBody
          });
        }
        this.isUpdate = true;
      } else {
        this.templateList = [];
      }

    });
  }

  saveTemplateSettings(){

    if(this.emailTemplatesForm.valid){
      let data = {
        emailType: this.emailTemplatesForm.value.templatetype,
        subject: this.emailTemplatesForm.value.templateSubject,
        templateBody: this.emailTemplatesForm.value.emailTemplateBody
      }
      this.emailTemplateService.updateEmailTemplate(data).subscribe( (res: any) => {
        if(res.statusCode === 200){
          this.getEmailTemplate();
        } else {
          this.templateList = [];
        }

      });

    } else {
      console.log("Form is not valid");
    }
  }

  getTemplate(data: any) {
    this.selectedTemplate = data;
    this.isUpdate = true;

    this.emailTemplatesForm.patchValue({
      templatetype: data.emailType,
      templateSubject: data.subject,
      emailTemplateBody: data.templateBody
    });

  }

  addTemplate() {
    this.emailTemplatesForm.reset();
    // this.emailTemplatesForm.controls.templatetype.setErrors(null);
    // this.emailTemplatesForm.controls.templateSubject.updateValueAndValidity();
    // this.emailTemplatesForm.controls.emailTemplateBody.setErrors(null);
    // console.log(this.emailTemplatesForm)
    this.isUpdate = false;
    this.getDefaultEmailTemplate();
  }

  getDefaultEmailTemplate(){
    this.emailTemplateService.defaultEmailTemplate().subscribe((res: any) => {
      if(res.statusCode === 200){
        this.emailTemplatesForm.patchValue({
          templatetype: '',
          templateSubject: '',
          emailTemplateBody: res.data.templateBody
        });
        // this.emailTemplatesForm.value.emailTemplateBody = res.data.templateBody;
      }
    })
  }
}
