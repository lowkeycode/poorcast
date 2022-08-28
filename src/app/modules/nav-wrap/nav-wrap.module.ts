import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavWrapComponent } from './components/nav-wrap.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
// import { NavWrapRoutingModule } from './nav-wrap-routing.module';
// import { PagesModule } from '../pages/pages.module';

const components = [
  NavWrapComponent,
  SideNavComponent,
  TopBarComponent,
]


@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
    // NavWrapRoutingModule,
    // PagesModule
  ],
  exports: [
    ...components
  ]
})
export class NavWrapModule { }
