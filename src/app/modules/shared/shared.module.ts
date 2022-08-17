
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldsetComponent } from './components/fieldset/fieldset.component';
import { LogoComponent } from './components/logo/logo.component';

const components = [
  FieldsetComponent,
  LogoComponent
]


@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ...components
  ]
})
export class SharedModule { }
