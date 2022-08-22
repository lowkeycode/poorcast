import { OverviewPageComponent } from './overview/components/overview-page/overview-page.component';
import { OverviewModule } from './overview/overview.module';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";
import { AuthGuard } from './user/guards/auth.guard';


const routes: Routes = [
    { path: 'overview', component: OverviewPageComponent, canActivate: [AuthGuard] }
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