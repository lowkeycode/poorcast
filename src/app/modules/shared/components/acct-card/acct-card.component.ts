import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-acct-card',
  templateUrl: './acct-card.component.html',
  styleUrls: ['./acct-card.component.scss']
})
export class AcctCardComponent implements OnInit {
  @Input() isBudgetCard = false;

  constructor() { }

  ngOnInit(): void {
  }

}
