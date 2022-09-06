import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IconAbstract } from 'src/app/models/classes/icon.abstract';
import { sources } from 'src/app/models/data';

@Component({
  selector: 'app-solo-icon',
  templateUrl: './solo-icon.component.html',
  styleUrls: ['./solo-icon.component.scss']
})
export class SoloIconComponent extends IconAbstract {
  @ViewChild('iconContainer') iconContainer: ElementRef;

  sources = sources;

  constructor() { 
    super()
  }

  ngAfterViewInit(): void {
    this.iconContainer.nativeElement.style.width = `${this.remSize}rem`;
    this.iconContainer.nativeElement.style.height = `${this.remSize}rem`;
  }

}
