import { UserRoutingModule } from './user-routing.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { SignInFormComponent } from './components/sign-in-page/sign-in-form/sign-in-form.component';
import { SignInPageComponent } from './components/sign-in-page/sign-in-page.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleSigninDirective } from './directives/google-signin.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { NavWrapModule } from '../nav-wrap/nav-wrap.module';
import { PagesModule } from '../pages/pages.module';

const components = [
  SignInPageComponent,
  SignInFormComponent,
]

const directives = [
  GoogleSigninDirective
]


@NgModule({
  declarations: [
    ...components,
    ...directives
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    UserRoutingModule,
    ReactiveFormsModule,
    NavWrapModule,
    PagesModule,
  ],
  exports: [
    ...components,
    ...directives
  ]
})
export class UserModule { }
