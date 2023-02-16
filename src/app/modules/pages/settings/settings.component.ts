import { Component } from '@angular/core';
import { AuthService } from '../../user/services/auth.service';

type DeleteStates = 'delete' | 'confirm' | 'success';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  deleteState: DeleteStates = 'delete';

  constructor(private pcAuth: AuthService) {}

  onDelete() {
    this.deleteState = 'confirm';
  }

  onConfirm() {
    this.deleteState = 'success';
    
  }

  onCancel() {
    this.deleteState = 'delete';
  }
}
