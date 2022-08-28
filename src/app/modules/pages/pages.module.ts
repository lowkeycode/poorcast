import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from './overview/overview.component';
import { PayBillComponent } from './pay-bill/pay-bill.component';
import { AccountsComponent } from './accounts/accounts.component';
import { TransferComponent } from './transfer/transfer.component';



@NgModule({
  declarations: [
    OverviewComponent,
    PayBillComponent,
    AccountsComponent,
    TransferComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PagesModule { }
