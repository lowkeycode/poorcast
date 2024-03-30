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
import { ModalComponent } from './components/modal/modal.component';
import { SelectInputComponent } from './components/forms/select-input/select-input.component';
import { TableComponent } from './components/table/table.component';
import { TableRowComponent } from './components/table-row/table-row.component';
import { ArcChartComponent } from './components/arc-chart/arc-chart.component';
import { TuiArcChartModule } from '@taiga-ui/addon-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormatDatePipe } from './pipes/format-date.pipe';

const components = [
  LogoComponent,
  FieldsetComponent,
  TextInputComponent,
  SelectInputComponent,
  UserProfileComponent,
  SoloIconComponent,
  SnackComponent,
  AcctCardComponent,
  ModalComponent,
  TableComponent,
  TableRowComponent,
  ArcChartComponent
];

const directives = [IconDirective];
const pipes = [FormatDatePipe];

@NgModule({
  declarations: [...components, ...directives, ...pipes],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TuiArcChartModule],
  exports: [...components, ...directives, ...pipes],
})
export class SharedModule {}
