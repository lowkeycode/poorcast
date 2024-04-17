import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../user/services/auth.service';
import { LoadingService } from '../../shared/services/loading.service';

type DeleteStates = 'delete' | 'confirm' | 'success';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  isLoading$ = this.loadingService.isLoading;
  deleteState: DeleteStates = 'delete';

  constructor(private pcAuth: AuthService, private loadingService: LoadingService) {}

  ngOnInit(): void {
      setTimeout(() => this.loadingService.isLoading.next(false))
  }

  onDelete() {
    this.deleteState = 'confirm';
  }

  onConfirm() {
    this.deleteState = 'success';
    this.pcAuth.deleteAccount();
  }

  onCancel() {
    this.deleteState = 'delete';
  }
}
