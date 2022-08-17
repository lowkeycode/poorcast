import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.scss']
})
export class OverviewPageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  signOut() {
    this.router.navigate(['/signin'])
  }

}
