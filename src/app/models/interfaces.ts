export interface FeedBackMsgs {
  [key: string]: string;
}

export interface ModalConfig {
  title: string;
  fieldsets: Fieldset[];
  modalButtons: ButtonConfig[];
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
}

export interface FieldsetInput {
  formControlName: string;
  label: string;
  type: string;
  hidden: boolean;
  placeholder?: string;
  valid?: boolean;
  invalid?: boolean;
  feedBackMsg?: string;
  showFeedback?: boolean;
}

export interface ButtonConfig {
  buttonText: string;
  type: 'primary' | 'neutral' | 'danger';
  dataTest: string;
  clickFn: () => any;
}
