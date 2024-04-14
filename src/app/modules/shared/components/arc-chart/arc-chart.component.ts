import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { TuiSizeXL } from '@taiga-ui/core';
import {
  AppState,
  selectUserExpenses,
} from 'src/app/store/user-account/user-account.selectors';

@Component({
  selector: 'app-arc-chart',
  templateUrl: './arc-chart.component.html',
  styleUrls: ['./arc-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArcChartComponent implements OnInit {
  @Input() maxValue;
  @Input() maxLabel;
  @Input() minLabel;
  value: number[];
  size: TuiSizeXL = 'l';

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.select(selectUserExpenses).subscribe((expenses) => {
      this.value = [
        expenses.reduce((acc, cur) => {
          const addedValue = acc + cur.remaining;
          return addedValue;
        }, 0),
      ];
    });
  }
}
