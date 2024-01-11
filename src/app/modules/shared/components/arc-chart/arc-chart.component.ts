import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { TuiSizeXL } from '@taiga-ui/core';
import { AppState, selectUserExpenses } from 'src/app/store/user-account/user-account.selectors';

@Component({
  selector: 'app-arc-chart',
  templateUrl: './arc-chart.component.html',
  styleUrls: ['./arc-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArcChartComponent {
  @Input() maxValue;
  @Input() maxLabel;
  @Input () minLabel;
  value: number[];
  size: TuiSizeXL = 'l'
  
  constructor(private store: Store<AppState>){
    this.store.select(selectUserExpenses).subscribe(expenses => this.value = [expenses.reduce((acc, cur) => {
      acc += cur.amount;
      return acc;
    }, 0)]);
  }
}
