import { Component, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements AfterViewInit {
  @ViewChild('logoContainer') container: ElementRef;
  @Input() raining = false;
  @Input() remSize: number;

  ngAfterViewInit(): void {
      this.container.nativeElement.style.width = `${this.remSize}rem`;
      this.container.nativeElement.style.height = `${this.remSize}rem`;
  }

}
