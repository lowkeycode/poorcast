import { Component, OnInit } from '@angular/core';
import { DateRangeService } from '../date-range.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  testCategories = ['Rent', 'Groceries', 'Utilities', 'Dining Out', 'Savings'];

  isDateFilterOpen$ = this.dateRangeService.isOpen$;

  single: any[] = [{
    "name": "Rent",
    "value": 894
  }];

  view: [number, number] = [200, 200];

  // options
  showLegend: boolean = true;
  showLabels: boolean = true;

  colorScheme: any = {
    domain: ['#070907']
  };

  list = [
    {
      billName: 'Rent',
      billAmount: 1700,
      billDate: Date.now()
    },
    {
      billName: 'Groceries',
      billAmount: 300,
      billDate: Date.now()
    },
    {
      billName: 'Dining Out',
      billAmount: 100,
      billDate: Date.now()
    },
    {
      billName: 'Internet',
      billAmount: 130,
      billDate: Date.now()
    },
    {
      billName: 'Electric',
      billAmount: 200,
      billDate: Date.now()
    },
    {
      billName: 'Phone',
      billAmount: 80,
      billDate: Date.now()
    },
    {
      billName: 'Heat',
      billAmount: 95,
      billDate: Date.now()
    },
    {
      billName: 'Water',
      billAmount: 60,
      billDate: Date.now()
    },
    {
      billName: 'Transit',
      billAmount: 40,
      billDate: Date.now()
    },
  ]

  constructor(private dateRangeService: DateRangeService) {
  }

  ngOnInit(): void {
  }


  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

}
