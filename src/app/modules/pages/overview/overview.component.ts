import { AfterViewInit, Component, OnInit } from '@angular/core';
let testData = [
  {
    "name": "Income",
    "value": '8940000'
  },
  {
    "name": "Spending",
    "value": '5000000'
  },

]

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  data: any[] = [
    {
      "name": "Rent",
      "value": '1650'
    },
    {
      "name": "Entertainment",
      "value": '452'
    },
    {
      "name": "Travel",
      "value": '214'
    },
    {
      "name": "Groceries",
      "value": '273'
    },
  
  ];
  view = [900, 200] as any;

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;

  colorScheme: any = {
    domain: ['#353535', '#9E9E9E', '#096C1F', '#EEEEEE', '#CACACA', '#313131']
  };

  list = [1,2,3,4,5];

  constructor() {
  }

  ngOnInit(): void {
  }


  formatValue = (val) => {
    let formatter = new Intl.NumberFormat('en-us', {
      style: 'currency',
      currency: 'CAD',
      currencyDisplay: "narrowSymbol"
    });
    return formatter.format(val)
  }

  formatPercentage = (value) => {
    return Math.round(value)    
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
