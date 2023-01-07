export interface FeedBackMsgs  {
  [key: string]:  string;
}

export interface ModalConfig {
  title: string;
  icon?: ModalIcon;
  fieldsets: Fieldset[];
  modalButtons: ButtonConfig[];
}

export interface ModalIcon {
  iconName: string;
  iconSize: number;
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
  buttonText: string;
  type: string;
  dataTest: string;
  clickFn: () => any
}