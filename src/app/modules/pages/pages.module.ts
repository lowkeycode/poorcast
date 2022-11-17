import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from './overview/overview.component';
import { BillsComponent } from './bills/bills.component';
import { SettingsComponent } from './settings/settings.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { UpcomingCardComponent } from './overview/upcoming-card/upcoming-card.component';


const components = [
  OverviewComponent,
  BillsComponent,
  SettingsComponent,
]

@NgModule({
  declarations: [
    ...components,
    UpcomingCardComponent,
  ],
  imports: [
    CommonModule,
    NgxChartsModule,
    SharedModule
  ],
  exports: [
    ...components
  ]
})
export class PagesModule { }
