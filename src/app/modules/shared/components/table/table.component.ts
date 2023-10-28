import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() listItems: any[];
  //! Remove this after. Make listItems an object with an isEditable property;
  @Input() isEditable: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
