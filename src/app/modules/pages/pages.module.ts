import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from './overview/overview.component';
import { PayBillComponent } from './pay-bill/pay-bill.component';
import { AccountsComponent } from './accounts/accounts.component';
import { TransferComponent } from './transfer/transfer.component';
import { SettingsComponent } from './settings/settings.component';

const components = [
  OverviewComponent,
  PayBillComponent,
  AccountsComponent,
  TransferComponent,
  SettingsComponent
]

@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ...components
  ]
})
export class PagesModule { }
