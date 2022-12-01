import { Component, OnInit, Input, ContentChildren, QueryList, AfterContentInit, ElementRef, Renderer2 } from '@angular/core';
import { UpcomingCardComponent } from '../../../pages/overview/upcoming-card/upcoming-card.component';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit, AfterContentInit {
  @ContentChildren('caroItem', { read: ElementRef }) caroItems: QueryList<ElementRef<UpcomingCardComponent>>
  @Input() title: string;
  @Input() list: any[];
  displayList: any[];
  listStartIndex = 0;
  listEndIndex = 4;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    console.log(this.listStartIndex);
    console.log(this.listEndIndex);
  }

  // ! Think about increasing the width of each card component to add a padding that will act as space, then increase the side fader widths to incorporate & maybe then translateX will work without much adjustment. Then incorporate into animations

  ngAfterContentInit() {
    this.caroItems.forEach((item, i) => {
      this.renderer.setStyle(item.nativeElement, 'transform', `translateX(${i * 100}%)`);
    })
    // this.clipListEnds();
  }

  clipListEnds() {
    this.caroItems.forEach((item, i) => {
      if (i < this.listStartIndex || i > this.listEndIndex) {
        this.renderer.setStyle(item.nativeElement, 'display', 'none');
      } else {
        this.renderer.setStyle(item.nativeElement, 'display', 'block');
      }
    })
  }

  onPrev() {
    if (this.listStartIndex === 0) return;
    this.listStartIndex--;
    this.listEndIndex--;
    // this.clipListEnds();
    console.log(this.listStartIndex);
    console.log(this.listEndIndex);
    
  }

  onNext() {
    if (this.listEndIndex === this.list.length - 1) return;
    this.listStartIndex++;
    this.listEndIndex++;
    // this.clipListEnds();
    console.log(this.listStartIndex);
    console.log(this.listEndIndex);
  }

  

}
