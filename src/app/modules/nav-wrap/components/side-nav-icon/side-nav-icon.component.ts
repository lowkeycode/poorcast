import { animate, animation, style, transition, trigger } from '@angular/animations';
import { Component, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { IconAbstract } from 'src/app/models/classes/icon.abstract';
import { sources } from 'src/app/models/data';


@Component({
  selector: 'app-side-nav-icon',
  templateUrl: './side-nav-icon.component.html',
  styleUrls: ['./side-nav-icon.component.scss'],
  animations:[
    trigger('label', [
      transition(':enter', [
        style({
          opacity: 0
        }),
        animate('.6s', style({
          opacity: 1
        }))
      ]) 
    ])
  ] 
})
export class SideNavIconComponent extends IconAbstract implements AfterViewInit {
  @ViewChild('iconContainer') iconContainer: ElementRef;
  @Input() navOpen: boolean;

  sources = sources;

  constructor() {
    super()
   }

   ngAfterViewInit(): void {
    this.iconContainer.nativeElement.style.width = `${this.remSize}rem`;
    this.iconContainer.nativeElement.style.height = `${this.remSize}rem`;
  }

}
