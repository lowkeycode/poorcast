import { AbstractControl, ValidationErrors, Validator } from "@angular/forms";

export interface FeedBackMsgs {
  [key: string]: string;
}

export interface ModalConfig {
  title: string;
  fieldsets: Fieldset[];
  modalButtons: ButtonConfig[];
  contentList: string[];
  icon?: ModalIcon;
}

export interface ModalIcon {
  iconName: string;
  iconSize: number;
}

export interface Fieldset {
  name: string;
  inputs: FieldsetInput[];
  index?: number;
  button?: ButtonConfig
}

export interface FieldsetInput {
  formControlName: string;
  label: string;
  type: string;
  hidden: boolean;
  validators: ((control: AbstractControl<any, any>) => ValidationErrors | null)[]
  placeholder?: string;
  options?: string[];
  valid?: boolean;
  invalid?: boolean;
  feedBackMsg?: string;
  showFeedback?: boolean;
  defaultValue?: string | Date;
}

export type PayloadFunction = (payload: any) => any;

export interface ButtonConfig {
  buttonText: string;
  type: 'primary' | 'neutral' | 'danger';
  dataTest: string;
  submitFn?: PayloadFunction;
  clickFn?: (modal?: any, form?: any) => any;
}
