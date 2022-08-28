import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-wrap',
  templateUrl: './nav-wrap.component.html',
  styleUrls: ['./nav-wrap.component.scss']
})
export class NavWrapComponent implements OnInit {
  pageName = 'overview';

  constructor() { }

  ngOnInit(): void {
  }

  onPageNameChange($event: string) {
    this.pageName = $event;
  }

}
