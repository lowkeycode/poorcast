import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  @Output() pageNameChange = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.pageNameChange.emit('overview')
  }

  onPageNameChange($event: string) {
    this.pageNameChange.emit($event)
  }

}
