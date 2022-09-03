import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  @Output() pageNameChange = new EventEmitter<string>();
  @Output() isNavOpen = new EventEmitter<boolean>();
  isOpen = true;


  constructor() { }

  ngOnInit(): void {
    this.pageNameChange.emit('overview')
  }

  onPageNameChange($event: string) {
    this.pageNameChange.emit($event)
  }

  toggleSideNavOpen() {
    this.isOpen = !this.isOpen;
    this.isNavOpen.emit(this.isOpen);
  }

}
