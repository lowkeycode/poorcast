import { UserRoutingModule } from './../user-routing.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { SignUpComponent } from './components/sign-in-page/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in-page/sign-in/sign-in.component';
import { SignInPageComponent } from './components/sign-in-page/sign-in-page.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const components = [
  SignInPageComponent,
  SignInComponent,
  SignUpComponent
]

const modules = [
  CommonModule,
  SharedModule,
  RouterModule,
  UserRoutingModule
]

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    ...modules
  ],
  exports: [
    ...components
  ]
})
export class UserModule { }
