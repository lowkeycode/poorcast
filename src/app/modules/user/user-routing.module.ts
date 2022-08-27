import { Routes, RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';
import { AuthGuard } from './guards/auth.guard';
import { NavWrapComponent } from '../nav-wrap/components/nav-wrap.component';
import { NavWrapModule } from '../nav-wrap/nav-wrap.module';


const routes: Routes = [
    { path: 'overview', component: NavWrapComponent,  }
]

const modules = [
  NavWrapModule
]

@NgModule({
  imports: [
  RouterModule.forChild(routes),
    ...modules
  ],
  exports: [RouterModule]
})
export class UserRoutingModule {}