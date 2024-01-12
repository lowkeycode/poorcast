import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {
  @Output() isNavOpen = new EventEmitter<boolean>();
  isOpen = true;

  toggleSideNavOpen() {
    this.isOpen = !this.isOpen;
    this.isNavOpen.emit(this.isOpen);
  }

}
