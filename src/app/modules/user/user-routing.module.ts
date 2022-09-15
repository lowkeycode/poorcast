import { Routes, RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";
import { AuthGuard } from './guards/auth.guard';
import { NavWrapComponent } from '../nav-wrap/components/nav-wrap.component';
import { NavWrapModule } from '../nav-wrap/nav-wrap.module';
import { OverviewComponent } from '../pages/overview/overview.component';
import { PayBillComponent } from '../pages/pay-bill/pay-bill.component';
import { AccountsComponent } from '../pages/accounts/accounts.component';
import { TransferComponent } from '../pages/transfer/transfer.component';
import { SettingsComponent } from '../pages/settings/settings.component';
import { PagesModule } from '../pages/pages.module';


const routes: Routes = [
    { path: 'app', component: NavWrapComponent, canActivate: [AuthGuard],  children: [
      {path: 'overview', component: OverviewComponent, pathMatch: 'full'},
      {path: 'paybill', component: PayBillComponent, pathMatch: 'full'},
      {path: 'accounts', component: AccountsComponent, pathMatch: 'full'},
      {path: 'transfer', component: TransferComponent, pathMatch: 'full'},
      {path: 'settings', component: SettingsComponent, pathMatch: 'full'},
    ]}
]


@NgModule({
  imports: [
  RouterModule.forChild(routes),
  NavWrapModule,
  PagesModule
  ],
  exports: [RouterModule]
})
export class UserRoutingModule {}