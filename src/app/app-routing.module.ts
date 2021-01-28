import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {PasswordResetComponent} from './password-reset/password-reset.component';
import {ProfileComponent} from './profile/profile.component';
import {ServiceManagementComponent} from './service-management/service-management.component';
import {CosmetologistListComponent} from './cosmetologist-management/cosmetologist-list/cosmetologist-list.component';
import {CosmetologistDetailsComponent} from './cosmetologist-management/cosmetologist-details/cosmetologist-details.component';
import {TransactionHistoryComponent} from './transaction-history/transaction-history.component';
import {ClientListComponent} from './client-management/client-list/client-list.component';
import {ClientDetailsComponent} from './client-management/client-details/client-details.component';
import {SettingsComponent} from './settings/settings.component';
import { PayoutManagementComponent } from './payout-management/payout-management.component';
import {AuthGuard} from './service/app.authGuard.service';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'password-reset', component: PasswordResetComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'services', component: ServiceManagementComponent},
  {path: 'cosmetologist', component: CosmetologistListComponent},
  {path: 'cosmetologist/details/:id', component: CosmetologistDetailsComponent},
  {path: 'transactionHistory', component: TransactionHistoryComponent},
  {path: 'client', component: ClientListComponent},
  {path: 'client/details/:id', component: ClientDetailsComponent},
  {path: 'settings', component: SettingsComponent},
  {path: 'payout', component: PayoutManagementComponent},
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
