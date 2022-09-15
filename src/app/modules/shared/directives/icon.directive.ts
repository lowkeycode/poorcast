import { Directive, OnInit, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appIconSize]'
})
export class IconDirective implements OnInit {
  @Input('appIconSize') remSize = 1;

  @HostBinding('style.width') width: string;
  @HostBinding('style.height') height: string;

  ngOnInit(): void {
    this.width = `${this.remSize}rem`;
    this.height = `${this.remSize}rem`;
  }
}
