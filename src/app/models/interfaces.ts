export interface FeedBackMsgs  {
  [key: string]:  string;
}

export interface ModalConfig {
  title: string;
  iconName?: string;
  iconSize?: number;
  fieldsets: Fieldset[];
  modalButtons: ButtonConfig[];
}

export interface Fieldset {
  name: string;
  inputs: FieldsetInput[]
}

export interface FieldsetInput {
  formControlName: string;
  label: string;
  type: string;
  hidden: boolean;
  valid?: boolean;
  invalid?: boolean;
  feedBackMsg?: string;
  showFeedback?: boolean;
}

export interface ButtonConfig {
  buttonName: string;
  clickFn: () => any
}