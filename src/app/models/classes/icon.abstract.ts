import { Directive, Input } from "@angular/core";

@Directive({
  selector: 'pc-icon-abstract'
})
export abstract class IconAbstract {
  @Input() iconName: string
  @Input() remSize: number;
  @Input() alt: string;
  @Input() label = '';
}