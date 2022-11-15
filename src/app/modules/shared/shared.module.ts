
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from './components/logo/logo.component';
import { FieldsetComponent } from './components/forms/fieldset/fieldset.component';
import { TextInputComponent } from './components/forms/text-input/text-input.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { SoloIconComponent } from './components/solo-icon/solo-icon.component';
import { SnackComponent } from './components/snack/snack.component';
import { IconDirective } from './directives/icon.directive';
import { AcctCardComponent } from './components/acct-card/acct-card.component';

const components = [
  LogoComponent,
  FieldsetComponent,
  TextInputComponent,
  UserProfileComponent,
  SoloIconComponent,
  SnackComponent,
]

const directives = [
  IconDirective,
]


@NgModule({
  declarations: [
    ...components,
    ...directives,
    AcctCardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ...components,
    ...directives
  ]
})
export class SharedModule { }
