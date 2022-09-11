
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from './components/logo/logo.component';
import { FieldsetComponent } from './components/forms/fieldset/fieldset.component';
import { TextInputComponent } from './components/forms/text-input/text-input.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { SoloIconComponent } from './components/solo-icon/solo-icon.component';
import { SnackComponent } from './components/snack/snack.component';

const components = [
  LogoComponent,
  FieldsetComponent,
  TextInputComponent,
  UserProfileComponent,
  SoloIconComponent,
  SnackComponent
]


@NgModule({
  declarations: [
    ...components,
    UserProfileComponent,
    SnackComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ...components
  ]
})
export class SharedModule { }
