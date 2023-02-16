import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Component, Input} from '@angular/core';
import { DateRangeService } from 'src/app/modules/pages/date-range.service';
import { AuthService } from 'src/app/modules/user/services/auth.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent {
  @Input() pageName: string;



  constructor(public pcAuth: AuthService, private dateRangeService: DateRangeService) { }

  onToggleDateFilter() {
    this.dateRangeService.toggleDateRange();
  }

}
