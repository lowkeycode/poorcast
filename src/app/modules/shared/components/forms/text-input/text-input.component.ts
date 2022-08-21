import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: TextInputComponent,
    multi: true
  }]
})
export class TextInputComponent implements ControlValueAccessor {
  @Input() controlName: any;
  @Input() label = '';
  @Input() type = '';
  @Input() valid?: boolean = true;
  @Input() invalid?: boolean = false;
  @Input() showFeedback?: boolean = false;
  @Input() feedBackMsg = ''

  inputValue = '';
  touched = false;
  
  onChange = (input: any) => {};
  onTouched = () => {};

  constructor() {}

  writeValue(value: string): void {
    // console.log(value);
    // console.log(this);
    
    
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
