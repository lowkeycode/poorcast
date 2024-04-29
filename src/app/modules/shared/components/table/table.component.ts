import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() listItems: any[];
  @Input() isEditable: boolean;
  @Input() collectionName: string;
  @Input() selectOptions: {[key: string]: string[]};
}
