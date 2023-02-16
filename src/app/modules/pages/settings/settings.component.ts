import { Component } from '@angular/core';

type DeleteStates = 'delete' | 'confirm' | 'success';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  deleteState: DeleteStates = 'delete';

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
