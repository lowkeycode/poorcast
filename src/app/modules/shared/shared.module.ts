
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from './components/logo/logo.component';
import { FieldsetComponent } from './components/forms/fieldset/fieldset.component';
import { TextInputComponent } from './components/forms/text-input/text-input.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { SoloIconComponent } from './components/solo-icon/solo-icon.component';

const components = [
  LogoComponent,
  FieldsetComponent,
  TextInputComponent,
  UserProfileComponent,
  SoloIconComponent
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
