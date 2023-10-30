import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TuiSizeXL } from '@taiga-ui/core';

@Component({
  selector: 'app-arc-chart',
  templateUrl: './arc-chart.component.html',
  styleUrls: ['./arc-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArcChartComponent {
  readonly value = [40];
  size: TuiSizeXL = 'm'
  maxValue = 100;
 
  activeItemIndex = NaN;
}
