import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from './guards/auth.guard';
import { NavWrapComponent } from '../nav-wrap/components/nav-wrap.component';
import { NavWrapModule } from '../nav-wrap/nav-wrap.module';
import { OverviewComponent } from '../pages/overview/overview.component';
import { BudgetComponent } from '../pages/budget/budget.component';
import { SettingsComponent } from '../pages/settings/settings.component';
import { PagesModule } from '../pages/pages.module';

const routes: Routes = [
  {
    path: 'app',
    component: NavWrapComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'overview',
        component: OverviewComponent,
        canActivate: [AuthGuard],
        pathMatch: 'full',
      },
      { path: 'budget', component: BudgetComponent, pathMatch: 'full' },
      { path: 'settings', component: SettingsComponent, pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forChild(routes), NavWrapModule, PagesModule],
  exports: [RouterModule],
})
export class UserRoutingModule {}
