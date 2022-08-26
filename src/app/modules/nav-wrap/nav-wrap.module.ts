import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavWrapComponent } from './components/nav-wrap.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';



@NgModule({
  declarations: [
    NavWrapComponent,
    SideNavComponent,
    TopBarComponent
  ],
  imports: [
    CommonModule
  ]
})
export class NavWrapModule { }
