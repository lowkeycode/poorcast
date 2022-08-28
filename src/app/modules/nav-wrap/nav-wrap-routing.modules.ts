import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { OverviewComponent } from "../pages/overview/overview.component";

const routes: Routes = [
  {path: '', component: OverviewComponent},
  {path: 'paybill', component: OverviewComponent},
  {path: 'accounts', component: OverviewComponent},
  {path: 'transfer', component: OverviewComponent},
];

@NgModule({
imports: [
  RouterModule.forChild(routes)
],
exports: [RouterModule]
})
export class NavWrapRoutingModule {}