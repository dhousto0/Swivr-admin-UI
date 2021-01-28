import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSelectModule} from '@angular/material/select';
import { LoginComponent } from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatTooltipModule} from '@angular/material/tooltip';
import {FullLayoutModule} from './layout/full-layout.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import {HttpsRequestInterceptor} from './service/HttpRequestInterceptor';
import {MatDialogModule} from '@angular/material/dialog';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { ProfileComponent } from './profile/profile.component';
import { ServiceManagementComponent } from './service-management/service-management.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { CosmetologistListComponent } from './cosmetologist-management/cosmetologist-list/cosmetologist-list.component';
import { CosmetologistDetailsComponent } from './cosmetologist-management/cosmetologist-details/cosmetologist-details.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import {TreeTableModule} from 'primeng/treetable';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import { ClientListComponent } from './client-management/client-list/client-list.component';
import { ClientDetailsComponent } from './client-management/client-details/client-details.component';
import { SettingsComponent } from './settings/settings.component';
import { PayoutManagementComponent } from './payout-management/payout-management.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { EmailTemplateComponent } from './settings/email-template/email-template.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { NationalLeaveComponent } from './settings/national-leave/national-leave.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { DialogComponent } from './service-management/dialog/dialog.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PasswordResetComponent,
    ProfileComponent,
    ServiceManagementComponent,
    CosmetologistListComponent,
    CosmetologistDetailsComponent,
    TransactionHistoryComponent,
    ClientListComponent,
    ClientDetailsComponent,
    SettingsComponent,
    PayoutManagementComponent,
    EmailTemplateComponent,
    NationalLeaveComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatListModule,
    FlexLayoutModule,
    MatTabsModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatTooltipModule,
    HttpClientModule,
    FullLayoutModule,
    MatCardModule,
    MatDialogModule,
    BrowserModule,
    MatPaginatorModule,
    TreeTableModule,
    InfiniteScrollModule,
    MatGridListModule,
    CKEditorModule,
    NgxSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpsRequestInterceptor,
      multi: true
    }
  ],
  entryComponents: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
