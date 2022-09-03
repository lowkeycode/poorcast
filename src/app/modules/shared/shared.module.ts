
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from './components/logo/logo.component';
import { FieldsetComponent } from './components/forms/fieldset/fieldset.component';
import { TextInputComponent } from './components/forms/text-input/text-input.component';
import { SideNavIconComponent } from './components/side-nav-icon/side-nav-icon.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

const components = [
  LogoComponent,
  FieldsetComponent,
  TextInputComponent,
  SideNavIconComponent,
  UserProfileComponent
]


@NgModule({
  declarations: [
    ...components,
    UserProfileComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ...components
  ]
})
export class SharedModule { }
