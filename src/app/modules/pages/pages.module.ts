import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from './overview/overview.component';
import { BudgetComponent } from './budget/budget.component';
import { SettingsComponent } from './settings/settings.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { UpcomingCardComponent } from './overview/upcoming-card/upcoming-card.component';
import { BudgetAcctsComponent } from './budget/budget-accts/budget-accts.component';
import { BillsComponent } from './budget/bills/bills.component';
import { BillsRowComponent } from './budget/bills/bills-row/bills-row.component';
import { TuiCalendarRangeModule } from '@taiga-ui/kit';

const components = [
  OverviewComponent,
  BudgetComponent,
  SettingsComponent,
  UpcomingCardComponent,
  BudgetAcctsComponent
];

@NgModule({
  declarations: [...components, BillsComponent, BillsRowComponent],
  imports: [CommonModule, NgxChartsModule, SharedModule, TuiCalendarRangeModule],
  exports: [...components],
})
export class PagesModule {}
