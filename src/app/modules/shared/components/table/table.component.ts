import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() listItems: any[];
  @Input() isEditable: boolean;
  @Input() collectionName: string;

  constructor() { }

  ngOnInit(): void {
  }

}
