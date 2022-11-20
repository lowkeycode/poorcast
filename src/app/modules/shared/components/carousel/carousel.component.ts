import { Component, OnInit, Input, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { UpcomingCardComponent } from '../../../pages/overview/upcoming-card/upcoming-card.component';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit, AfterContentInit {
  @Input() title: string;
  @Input() listLength: number;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterContentInit() {
  }

}
