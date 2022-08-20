import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TextInputComponent),
    multi: true
  }]
})
export class TextInputComponent implements ControlValueAccessor {
  @Input() controlName: any;
  @Input() label = '';
  @Input() type = '';
  @Input() feedBackMsg = ''

  _value = '';
  onChanged = () => {};
  onTouched = () => {};

  constructor() {

   }

  writeValue(val: any): void {
   this._value = val;   
  }

  registerOnChange(fn: any): void {
      this.onChanged = fn;
  }

  registerOnTouched(fn: any): void {
      this.onTouched = fn;
  }

  onChange($event: any) {
    console.log($event);
    
    this.onTouched();
    this.onChange($event.currentTarget.value);
  }
  

}
