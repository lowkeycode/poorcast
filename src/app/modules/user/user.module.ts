import { UserRoutingModule } from './user-routing.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { SignUpComponent } from './components/sign-in-page/sign-up/sign-up.component';
import { SignInFormComponent } from './components/sign-in-page/sign-in-form/sign-in-form.component';
import { SignInPageComponent } from './components/sign-in-page/sign-in-page.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleSigninDirective } from './directives/google-signin.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { NavWrapModule } from '../nav-wrap/nav-wrap.module';

const components = [
  SignInPageComponent,
  SignInFormComponent,
  SignUpComponent
]


@NgModule({
  declarations: [
    ...components,
    GoogleSigninDirective
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    UserRoutingModule,
    ReactiveFormsModule,
    NavWrapModule
  ],
  exports: [
    ...components,
    GoogleSigninDirective
  ]
})
export class UserModule { }
