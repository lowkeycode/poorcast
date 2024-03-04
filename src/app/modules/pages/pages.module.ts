import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from './overview/overview.component';
import { BudgetComponent } from './budget/budget.component';
import { SettingsComponent } from './settings/settings.component';
import { UpcomingCardComponent } from './overview/upcoming-card/upcoming-card.component';
import { BudgetAcctsComponent } from './budget/budget-accts/budget-accts.component';
import { ExpensesComponent } from './budget/expenses/expenses.component';


const components = [
  OverviewComponent,
  BudgetComponent,
  SettingsComponent,
  UpcomingCardComponent,
  BudgetAcctsComponent,
  ExpensesComponent,
];

@NgModule({
  declarations: [...components],
  imports: [CommonModule, SharedModule],
  exports: [...components],
})
export class PagesModule {}
