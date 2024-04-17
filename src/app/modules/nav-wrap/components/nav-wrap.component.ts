import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../shared/services/loading.service';

@Component({
  selector: 'app-nav-wrap',
  templateUrl: './nav-wrap.component.html',
  styleUrls: ['./nav-wrap.component.scss'],
})
export class NavWrapComponent {
  pageName = 'overview';
  isNavOpen = true;

  isLoading$ = this.loadingService.isLoading;

  constructor(private loadingService: LoadingService){}

  onPageNameChange($event: string) {
    this.pageName = $event;
  }

  updateNavStyles($event: boolean) {
    this.isNavOpen = $event;
  }
}
