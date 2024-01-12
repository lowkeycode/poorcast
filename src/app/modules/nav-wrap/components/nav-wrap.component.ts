import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-wrap',
  templateUrl: './nav-wrap.component.html',
  styleUrls: ['./nav-wrap.component.scss'],
})
export class NavWrapComponent {
  pageName = 'overview';
  isNavOpen = true;

  onPageNameChange($event: string) {
    this.pageName = $event;
  }

  updateNavStyles($event: boolean) {
    this.isNavOpen = $event;
  }
}
