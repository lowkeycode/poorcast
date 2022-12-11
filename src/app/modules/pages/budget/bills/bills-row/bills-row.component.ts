import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bills-row',
  templateUrl: './bills-row.component.html',
  styleUrls: ['./bills-row.component.scss']
})
export class BillsRowComponent implements OnInit {
  bill = {
    name: 'Rent',
    amount: 850,
    remaining: 450,
    due: new Date(Date.now()).toISOString(),
    notes: 'Pay the rest on payday',
    tag: 'Rent'
  }

  constructor() { }

  ngOnInit(): void {
  }

}
