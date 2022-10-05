import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from './overview/overview.component';
import { BillsComponent } from './bills/bills.component';
import { SettingsComponent } from './settings/settings.component';

const components = [
  OverviewComponent,
  BillsComponent,
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
