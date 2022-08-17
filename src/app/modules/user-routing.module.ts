import { OverviewPageComponent } from './overview/components/overview-page/overview-page.component';
import { OverviewModule } from './overview/overview.module';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";


const routes: Routes = [
    { path: 'overview', component: OverviewPageComponent }
]

const modules = [
  OverviewModule
]

@NgModule({
  imports: [
  RouterModule.forChild(routes),
    ...modules
  ],
  exports: [RouterModule]
})
export class UserRoutingModule {}