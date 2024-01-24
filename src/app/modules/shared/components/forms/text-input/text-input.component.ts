import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: TextInputComponent,
    multi: true
  }],
  animations: [
    trigger('container', [
      transition(':enter', [
        style({
          maxHeight: 0,
          opacity: 0
        }),
        animate('.15s', style({
          maxHeight: '3rem',
          opacity: 1
        }))
      ]),
      transition(':leave', [
        animate('.15s', style({
          maxHeight: 0,
          opacity: 0
        }))
      ])
    ]),
  ]
})
export class TextInputComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() placeholder?: string;
  @Input() type = '';
  @Input() showFeedback?: boolean = false;
  @Input() feedBackMsg = ''

  inputValue = '';
  touched = false;
  
  onChange = (input: any) => {};
  onTouched = () => {};

  constructor() {}

  writeValue(value: string): void {
   this.inputValue = value;   
  }

  registerOnChange(onChange: any): void {
      this.onChange = onChange;
  }

  registerOnTouched(onTouched: any): void {
      this.onTouched = onTouched;
  }

  onInput($event: any) {
    this.markAsTouched();
    this.inputValue = $event.currentTarget.value;
    this.onChange(this.inputValue)
  }
  
  markAsTouched() {
    if(!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }
}
